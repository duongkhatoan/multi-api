import { axiosInstance } from "@/lib/axios";

// Define the aggregated data type
export interface AggregatedData {
  crypto: {
    name: string;
    symbol: string;
    price: number;
    marketCap: number;
  };
  weather: {
    city: string;
    temperature: number;
    condition: string;
    humidity?: number;
    windSpeed?: number;
  };
  latest_news: {
    title: string;
    source: string;
    url: string;
    description?: string;
    publishedAt: string;
    category?: string;
  };
}

// Simple function to get aggregated data
export const getAggregatedData = async ({
  params,
}: {
  params: Record<string, unknown>;
}) => {
  try {
    const response = await axiosInstance.get(`/aggregated-data`, {
      params,
    });

    return response.data;
  } catch (error: any) {
    if (error.response && error.response.data) {
      throw error.response.data;
    }

    throw error;
  }
};
