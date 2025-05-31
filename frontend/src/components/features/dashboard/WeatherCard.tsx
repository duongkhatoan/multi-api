import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { WeatherData } from '@/types';
import { Cloud, Sun, CloudRain, Wind, Droplet } from 'lucide-react';

interface WeatherCardProps {
  data: WeatherData;
}

const getWeatherIcon = (condition: string) => {
  const conditionLower = condition.toLowerCase();
  
  if (conditionLower.includes('sunny') || conditionLower.includes('clear')) {
    return <Sun className="w-8 h-8 text-yellow-500" />;
  }
  if (conditionLower.includes('rain') || conditionLower.includes('drizzle')) {
    return <CloudRain className="w-8 h-8 text-blue-500" />;
  }
  if (conditionLower.includes('cloud')) {
    return <Cloud className="w-8 h-8 text-gray-500" />;
  }
  
  return <Sun className="w-8 h-8 text-yellow-500" />;
};

const getTemperatureColor = (temp: number) => {
  if (temp >= 30) return 'text-red-600';
  if (temp >= 20) return 'text-orange-600';
  if (temp >= 10) return 'text-blue-600';
  return 'text-blue-800';
};

export function WeatherCard({ data }: WeatherCardProps) {
  return (
    <Card className="bg-gradient-to-br from-blue-50 to-sky-50">
      <CardHeader>
        <CardTitle>Weather</CardTitle>
        <CardDescription>Current weather conditions</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              {getWeatherIcon(data.condition)}
              <div>
                <h4 className="text-xl font-bold text-gray-900">{data.city}</h4>            <p className="text-sm text-gray-600">{data.condition}</p>
            </div>
          </div>
          <div className="text-right">
            <p className={`text-3xl font-bold ${getTemperatureColor(data.temperature)}`}>
              {data.temperature}°C
            </p>
          </div>
        </div>
        
        {(data.humidity !== undefined || data.windSpeed !== undefined) && (
          <div className="grid grid-cols-2 gap-4 pt-4 border-t border-blue-100">
            {data.humidity !== undefined && (
              <div className="flex items-center space-x-2">
                <Droplet className="w-4 h-4 text-blue-500" />
                <div>
                  <p className="text-xs text-gray-600">Humidity</p>
                  <p className="font-semibold">{data.humidity}%</p>
                </div>
              </div>
            )}
            {data.windSpeed !== undefined && (
              <div className="flex items-center space-x-2">
                <Wind className="w-4 h-4 text-gray-500" />
                <div>
                  <p className="text-xs text-gray-600">Wind Speed</p>
                  <p className="font-semibold">{data.windSpeed} m/s</p>
                </div>
              </div>
            )}
          </div>
        )}
        </div>
      </CardContent>
    </Card>
  );
}
