import { RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ErrorComponentProps {
  error: Error | string;
  onRetry: () => void;
  retrying?: boolean;
}

export function ErrorComponent({
  error,
  onRetry,
  retrying = false,
}: ErrorComponentProps) {
  // Extract meaningful error message
  const errorMessage =
    typeof error === "string"
      ? error
      : error?.message || "An unexpected error occurred";

  // Determine error type and styling
  const isNetworkError = errorMessage.toLowerCase().includes("network");
  const isServerError = errorMessage.toLowerCase().includes("server error");
  const isRateLimit =
    errorMessage.toLowerCase().includes("rate limit") ||
    errorMessage.toLowerCase().includes("too many");

  const getErrorIcon = () => {
    if (isNetworkError) return "🌐";
    if (isRateLimit) return "⏱️";
    if (isServerError) return "🔧";
    return "⚠️";
  };

  const getErrorTitle = () => {
    if (isNetworkError) return "Connection Error";
    if (isRateLimit) return "Rate Limit Exceeded";
    if (isServerError) return "Server Error";
    return "Failed to Load Data";
  };

  const getErrorSuggestion = () => {
    if (isNetworkError)
      return "Please check your internet connection and try again.";
    if (isRateLimit) return "Please wait a moment before trying again.";
    if (isServerError)
      return "The server is experiencing issues. Please try again later.";
    return "Something went wrong. Please try refreshing the page.";
  };
  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <Card className="w-full max-w-md shadow-lg border-red-200">
        <CardHeader className="text-center pb-3">
          <div className="flex justify-center mb-2">
            <div className="text-4xl">{getErrorIcon()}</div>
          </div>
          <CardTitle className="text-xl font-semibold text-red-800">
            {getErrorTitle()}
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <div className="space-y-2">
            <p className="text-neutral-600 leading-relaxed font-medium">
              {errorMessage}
            </p>
            <p className="text-neutral-500 text-sm">{getErrorSuggestion()}</p>
          </div>
          <Button
            onClick={onRetry}
            disabled={retrying}
            className="w-full"
            variant="default"
          >
            {retrying ? (
              <>
                <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                Retrying...
              </>
            ) : (
              <>
                <RefreshCw className="mr-2 h-4 w-4" />
                Try Again
              </>
            )}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
