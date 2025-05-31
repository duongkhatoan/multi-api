import { Database, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface EmptyStateProps {
  onRefresh: () => void;
  refreshing?: boolean;
}

export function EmptyState({ onRefresh, refreshing = false }: EmptyStateProps) {
  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <Card className="w-full max-w-md shadow-lg border-neutral-200">
        <CardHeader className="text-center pb-3">
          <div className="flex justify-center mb-2">
            <Database className="h-12 w-12 text-neutral-400" />
          </div>
          <CardTitle className="text-xl font-semibold text-neutral-700">
            No Data Available
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <p className="text-neutral-500 leading-relaxed">
            We couldn&apos;t find any data to display. This might be due to service unavailability or temporary issues.
          </p>
          <Button 
            onClick={onRefresh} 
            disabled={refreshing}
            className="w-full"
            variant="outline"
          >
            {refreshing ? (
              <>
                <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                Refreshing...
              </>
            ) : (
              <>
                <RefreshCw className="mr-2 h-4 w-4" />
                Refresh Data
              </>
            )}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
