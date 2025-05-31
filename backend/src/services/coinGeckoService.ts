import { getConfigs } from "@/utils/configs";
import axios from "axios";

export interface CoinGeckoResponse {
  id: string;
  symbol: string;
  name: string;
  current_price: number;
  market_cap: number;
}

export interface CryptoData {
  name: string;
  symbol: string;
  price: number;
  marketCap: number;
}

const config = getConfigs();

export class CoinGeckoService {
  private readonly baseUrl = config.coinGeckoApiUrl;
  private readonly apiKey = config.coinGeckoApiKey;

  async getCryptoData(coinId: string = "bitcoin"): Promise<CryptoData | null> {
    try {
      if (!this.apiKey) {
        console.error("CoinGecko API key not found");
        throw new Error("CoinGecko API key is required");
      }

      const response = await axios.get<CoinGeckoResponse[]>(`${this.baseUrl}/coins/markets`, {
        params: {
          vs_currency: "usd",
          ids: coinId,
          order: "market_cap_desc",
          per_page: 1,
          page: 1,
          sparkline: false,
          locale: "en",
          x_cg_demo_api_key: this.apiKey,
        },
        timeout: 10000,
      });

      if (response.data && response.data.length > 0) {
        const coin = response.data[0];
        return {
          // Normalize
          name: coin.name,
          symbol: coin.symbol.toUpperCase(),
          price: coin.current_price,
          marketCap: coin.market_cap,
        };
      }
      return null;
    } catch (error) {
      console.error("CoinGecko API Error:", error);
      throw new Error(`Failed to fetch crypto data: ${error instanceof Error ? error.message : "Unknown error"}`);
    }
  }

  /**
   * Get multiple cryptocurrencies with optional price range filtering
   * @param minPrice - Minimum price filter (optional)
   * @param maxPrice - Maximum price filter (optional)
   * @param limit - Number of cryptocurrencies to fetch (default: 10)
   */
  async getCryptoDataByPriceRange(
    minPrice?: number,
    maxPrice?: number,
    limit: number = 10
  ): Promise<CryptoData | null> {
    try {
      const response = await axios.get<CoinGeckoResponse[]>(`${this.baseUrl}/coins/markets`, {
        params: {
          vs_currency: "usd",
          order: "market_cap_desc",
          per_page: Math.min(limit * 2, 100), // Fetch more to account for filtering
          page: 1,
          sparkline: false,
          locale: "en",
          x_cg_demo_api_key: this.apiKey,
        },
        timeout: 10000,
      });

      let cryptoList: CryptoData[] = response.data.map((coin) => ({
        name: coin.name,
        symbol: coin.symbol.toUpperCase(),
        price: coin.current_price,
        marketCap: coin.market_cap,
      }));

      // will find any cryptocurrency that matches the price range
      if (cryptoList.length === 0) {
        return null;
      }

      const result = cryptoList.find(
        (crypto) =>
          (minPrice === undefined || crypto.price >= minPrice) && (maxPrice === undefined || crypto.price <= maxPrice)
      );
      
      return result || null;

      // // Apply price range filtering
      // if (minPrice !== undefined) {
      //   cryptoList = cryptoList.filter((crypto) => crypto.price >= minPrice);
      // }
      // if (maxPrice !== undefined) {
      //   cryptoList = cryptoList.filter((crypto) => crypto.price <= maxPrice);
      // }

      // // Limit results
      // return cryptoList.slice(0, limit);
    } catch (error) {
      console.error("CoinGecko API Error:", error);
      throw new Error(`Failed to fetch crypto data: ${error instanceof Error ? error.message : "Unknown error"}`);
    }
  }
}

export const coinGeckoService = new CoinGeckoService();
