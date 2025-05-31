import { getConfigs } from "@/utils/configs";
import axios from "axios";

export interface OpenWeatherResponse {
  main: {
    temp: number;
    humidity: number;
  };
  weather: Array<{
    main: string;
    description: string;
  }>;
  wind: {
    speed: number;
  };
  name: string;
}

export interface WeatherData {
  city: string;
  temperature: number;
  condition: string;
  humidity?: number;
  windSpeed?: number;
}

const config = getConfigs();

export class OpenWeatherService {
  private readonly baseUrl = config.openWeatherApiUrl;
  private readonly apiKey = config.openWeatherApiKey;

  async getWeatherData(city: string = "Hanoi"): Promise<WeatherData | null> {
    try {
      // If no API key, return mock data
      if (!this.apiKey) {
        console.warn("OpenWeather API key is missing. Skipping weather fetch.");
        throw new Error("OpenWeather API key is required");
      }

      const response = await axios.get<OpenWeatherResponse>(`${this.baseUrl}/weather`, {
        params: {
          q: city,
          appid: this.apiKey,
          units: "metric", // Celsius
        },
        timeout: 10000,
      });

      const data = response.data;
      if (!data) {
        return null;
      }

      return {
        city: data.name,
        temperature: Math.round(data.main.temp),
        condition: data.weather[0]?.main || "Unknown",
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
      };
    } catch (error) {
      console.error("OpenWeather API Error:", error);

      throw new Error(`Failed to fetch weather data: ${error instanceof Error ? error.message : "Unknown error"}`);
    }
  }
}

export const openWeatherService = new OpenWeatherService();
