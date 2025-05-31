// import { coinGeckoService, type CryptoData } from "./coinGeckoService";
// import { openWeatherService, type WeatherData } from "./openWeatherService";
// import { newsAPIService, type NewsData } from "./newsAPIService";
import { CryptoData, NewsData, WeatherData } from "@prisma/client";
import { coinGeckoService } from "./coinGeckoService";
import { openWeatherService } from "./openWeatherService";
import { newsAPIService } from "./newsAPIService";
import { PrismaInstance } from "@/types";

export interface AggregatedDataParams {
  crypto?: string;
  city?: string;
  newsQuery?: string;
  // Price range filtering for crypto
  minPrice?: number;
  maxPrice?: number;
  cryptoLimit?: number;
}

export interface AggregatedDataResponse {
  crypto: CryptoData | null; // Can be single or array
  weather: WeatherData | null;
  latest_news: NewsData | null;
}

export interface CryptoFilterParams {
  minPrice?: number;
  maxPrice?: number;
  limit?: number;
}

export class AggregationService {
  async getAggregatedData(params: AggregatedDataParams = {}, prisma: PrismaInstance) {
    const { crypto = "bitcoin", city = "Hanoi", newsQuery = "technology", minPrice, maxPrice, cryptoLimit } = params;

    try {
      // Determine if we need to filter crypto by price range
      const shouldFilterCrypto = minPrice !== undefined || maxPrice !== undefined || cryptoLimit !== undefined;

      // Fetch data from all services concurrently
      const [cryptoData, weatherData, newsData] = await Promise.allSettled([
        shouldFilterCrypto
          ? coinGeckoService.getCryptoDataByPriceRange(minPrice, maxPrice, cryptoLimit)
          : coinGeckoService.getCryptoData(crypto),
        openWeatherService.getWeatherData(city),
        newsAPIService.getLatestNews(newsQuery),
      ]);

      // Process results
      const result = {
        crypto: this.handleResult(cryptoData, "crypto"),
        weather: this.handleResult(weatherData, "weather"),
        latest_news: this.handleResult(newsData, "news"),
      };

      if (!result.crypto && !result.weather && !result.latest_news) {
        throw new Error("No data available from any service");
      }

      await prisma.aggregatedData.create({
        data: {
          crypto: result.crypto,
          weather: result.weather,
          news: result.latest_news,
        },
      });

      return result;
    } catch (error) {
      console.error("Error in aggregation service:", error);
      throw new Error(`Aggregation failed: ${error instanceof Error ? error.message : "Unknown error"}`);
    }
  }

  private handleResult<T>(result: PromiseSettledResult<T | null>, type: string): T | null {
    if (result.status === "fulfilled") {
      return result.value;
    } else {
      console.error(`${type} API failed:`, result.reason);
      throw new Error(`${type} data unavailable`);
    }
  }
}

// Export singleton instance
export const aggregationService = new AggregationService();
