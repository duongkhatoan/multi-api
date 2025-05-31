import { getConfigs } from "@/utils/configs";
import axios from "axios";

export interface NewsAPIResponse {
  articles: Array<{
    title: string;
    description: string;
    url: string;
    source: {
      name: string;
    };
    publishedAt: string;
    category?: string;
  }>;
}

export interface NewsData {
  title: string;
  source: string;
  url: string;
  description?: string;
  publishedAt: Date;
  category?: string;
}

const config = getConfigs();

export class NewsAPIService {
  private readonly baseUrl = config.newsApiUrl;
  private readonly apiKey = config.newsApiKey;

  async getLatestNews(query: string = "technology"): Promise<NewsData | null> {
    try {
      // If no API key
      if (!this.apiKey) {
        console.warn("NewsAPI key is missing. Skipping news fetch.");
        throw new Error("NewsAPI key is required");
      }

      const response = await axios.get<NewsAPIResponse>(`${this.baseUrl}/everything`, {
        params: {
          q: query,
          sortBy: "publishedAt",
          pageSize: 1,
          language: "en",
          apiKey: this.apiKey,
        },
        timeout: 10000,
      });

      const article = response.data.articles[0];
      if (!article) {
        return null;
      }

      return {
        title: article.title,
        source: article.source.name,
        url: article.url,
        description: article.description,
        publishedAt: new Date(article.publishedAt),
        category: query,
      };
    } catch (error) {
      console.error("NewsAPI Error:", error);
      throw new Error(`Failed to fetch news data: ${error instanceof Error ? error.message : "Unknown error"}`);
    }
  }
}

export const newsAPIService = new NewsAPIService();
