"use client";

import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useMemo } from "react";
import useSWR from "swr";
import { FilterPanel } from "./FilterPanel";
import { CryptoCard } from "./CryptoCard";
import { WeatherCard } from "./WeatherCard";
import { NewsCard } from "./NewsCard";
import { DashboardSkeleton } from "./DashboardSkeleton";
import { ErrorComponent } from "@/components/common/ErrorComponent";
import { EmptyState } from "@/components/common/EmptyState";
import { getAggregatedData } from "@/services/aggregatedData";
import { FilterOptions } from "@/types";
import { RefreshCw, Activity } from "lucide-react";
import { createUrlWithQueryParams } from "@/utils/url";

// Import FilterFormData type từ FilterPanel
type FilterFormData = {
  crypto: string;
  city: string;
  newsQuery: string;
  minPrice?: number | "";
  maxPrice?: number | "";
};

export function Dashboard() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const query = Object.fromEntries(searchParams.entries());

  const currentFilters: FilterOptions = useMemo(
    () => ({
      crypto: query.crypto || "bitcoin",
      city: query.city || "Hanoi",
      newsQuery: query.newsQuery || "technology",
      minPrice: query.minPrice ? parseFloat(query.minPrice) : undefined,
      maxPrice: query.maxPrice ? parseFloat(query.maxPrice) : undefined,
    }),
    [query]
  );

  const {
    data,
    error,
    isValidating,
    isLoading,
    mutate: refetch,
  } = useSWR(
    {
      url: "/api/aggregated-data",
      params: {
        filters: currentFilters,
      },
    },
    getAggregatedData
  );

  const loading = isValidating || isLoading;

  const aggregatedData = data?.data;

  const handleFiltersChange = (formData: FilterFormData) => {
    // Create URL query parameters
    const queryParams: Record<string, string> = {};
    Object.entries(formData).forEach(([key, val]) => {
      if (val !== undefined && val !== null && val !== "") {
        queryParams[key] = val.toString();
      }
    });

    const newURL = createUrlWithQueryParams(queryParams, pathname);
    router.push(newURL);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Activity className="w-8 h-8 text-blue-600" />
              <div>
                <h1 className="text-xl font-bold text-gray-900">
                  Multi-API Dashboard
                </h1>
                <p className="text-sm text-gray-600">
                  Crypto, Weather & News in Real-time
                </p>
              </div>
            </div>

            <button
              onClick={() => {
                refetch();
              }}
              type="button"
              disabled={loading}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <RefreshCw
                className={`w-4 h-4 ${loading ? "animate-spin" : ""}`}
              />
              <span>Refresh</span>
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Filters Panel */}
          <div className="lg:col-span-1">
            <FilterPanel
              filters={currentFilters}
              onFiltersChange={handleFiltersChange}
              isLoading={loading}
            />
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {loading ? (
              <DashboardSkeleton />
            ) : error ? (
              <ErrorComponent
                error={error}
                onRetry={refetch}
                retrying={loading}
              />
            ) : !aggregatedData ? (
              <EmptyState onRefresh={refetch} />
            ) : (
              <div className="space-y-6">
                {/* Show partial data warning if some APIs failed */}
                {(!aggregatedData.crypto ||
                  !aggregatedData.weather ||
                  !aggregatedData.latest_news) && (
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <div className="flex items-center space-x-2">
                      <div className="text-yellow-600">⚠️</div>
                      <div>
                        <h4 className="text-sm font-medium text-yellow-800">
                          Partial Data Available
                        </h4>
                        <p className="text-sm text-yellow-700">
                          Some data sources are currently unavailable. Showing
                          available information.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Data Cards */}
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                  {aggregatedData.crypto && (
                    <CryptoCard data={aggregatedData.crypto} />
                  )}
                  {aggregatedData.weather && (
                    <WeatherCard data={aggregatedData.weather} />
                  )}
                </div>

                {aggregatedData.latest_news && (
                  <NewsCard data={aggregatedData.latest_news} />
                )}

                {/* Footer Info */}
                <div className="bg-white rounded-lg border border-gray-200 p-4">
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <div className="flex items-center space-x-4">
                      <span>
                        Last updated: {new Date().toLocaleTimeString()}
                      </span>
                      <span>•</span>
                      <span>Rate limit: 5 requests/minute</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span>Connected</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
