import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { CryptoData } from "@/types";
import { formatCurrency, formatLargeNumber } from "@/lib/utils";
import { TrendingUp } from "lucide-react";

interface CryptoCardProps {
  data: CryptoData;
}

export function CryptoCard({ data }: CryptoCardProps) {
  return (
    <Card className="bg-gradient-to-br from-orange-50 to-yellow-50">
      <CardHeader>
        <CardTitle>Cryptocurrency</CardTitle>
        <CardDescription>Real-time crypto market data</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-xl font-bold text-gray-900">{data.name}</h4>
              <p className="text-sm text-gray-600">{data.symbol}</p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-green-600">
                {formatCurrency(data.price)}
              </p>
              <div className="flex items-center text-sm text-gray-600">
                <TrendingUp className="w-4 h-4 mr-1" />
                Market Cap: {formatLargeNumber(data.marketCap)}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
