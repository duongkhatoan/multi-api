// API Response Types
export type CryptoData = {
  name: string;
  symbol: string;
  price: number;
  marketCap: number;
}

export type WeatherData = {
  city: string;
  temperature: number;
  condition: string;
  humidity?: number;
  windSpeed?: number;
}

export type NewsData = {
  title: string;
  source: string;
  url: string;
  description?: string;
  publishedAt: Date;
  category?: string;
}

export type AggregatedDataResponse = {
  crypto: CryptoData;
  weather: WeatherData;
  latest_news: NewsData;
}

export type APIResponse = {
  success: boolean;
  data: AggregatedDataResponse;
  timestamp: string;
  error?: string;
}

export type FilterOptions = {
  crypto?: string;
  city?: string;
  newsQuery?: string;
  minPrice?: number;
  maxPrice?: number;
}
