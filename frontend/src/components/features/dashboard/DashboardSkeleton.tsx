import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function CryptoSkeleton() {
  return (
    <Card className="bg-gradient-to-br from-orange-50 to-yellow-50">
      <CardHeader>
        <CardTitle>
          <Skeleton className="h-6 w-32" />
        </CardTitle>
        <CardDescription>
          <Skeleton className="h-4 w-48" />
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <Skeleton className="h-6 w-20" /> {/* crypto name */}
              <Skeleton className="h-4 w-12" /> {/* symbol */}
            </div>
            <div className="text-right space-y-2">
              <Skeleton className="h-8 w-24" /> {/* price */}
              <Skeleton className="h-4 w-32" /> {/* market cap */}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function WeatherSkeleton() {
  return (
    <Card className="bg-gradient-to-br from-blue-50 to-sky-50">
      <CardHeader>
        <CardTitle>
          <Skeleton className="h-6 w-20" />
        </CardTitle>
        <CardDescription>
          <Skeleton className="h-4 w-44" />
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Skeleton className="h-8 w-8 rounded-full" /> {/* weather icon */}
              <div className="space-y-2">
                <Skeleton className="h-6 w-16" /> {/* city name */}
                <Skeleton className="h-4 w-20" /> {/* condition */}
              </div>
            </div>
            <div className="text-right">
              <Skeleton className="h-9 w-16" /> {/* temperature */}
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4 pt-2 border-t border-blue-100">
            <div className="space-y-1">
              <Skeleton className="h-3 w-16" />
              <Skeleton className="h-4 w-12" />
            </div>
            <div className="space-y-1">
              <Skeleton className="h-3 w-20" />
              <Skeleton className="h-4 w-16" />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function NewsSkeleton() {
  return (
    <Card className="bg-gradient-to-br from-green-50 to-emerald-50">
      <CardHeader>
        <CardTitle>
          <Skeleton className="h-6 w-28" />
        </CardTitle>
        <CardDescription>
          <Skeleton className="h-4 w-36" />
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <Skeleton className="h-5 w-full mb-2" /> {/* title line 1 */}
            <Skeleton className="h-5 w-3/4 mb-2" /> {/* title line 2 */}
            
            <div className="space-y-2 mt-4">
              <Skeleton className="h-4 w-full" /> {/* description line 1 */}
              <Skeleton className="h-4 w-full" /> {/* description line 2 */}
              <Skeleton className="h-4 w-2/3" /> {/* description line 3 */}
            </div>
          </div>
          
          <div className="flex items-center justify-between pt-4 border-t border-green-100">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1">
                <Skeleton className="h-4 w-4" /> {/* user icon */}
                <Skeleton className="h-3 w-16" /> {/* source */}
              </div>
              <div className="flex items-center space-x-1">
                <Skeleton className="h-4 w-4" /> {/* calendar icon */}
                <Skeleton className="h-3 w-20" /> {/* date */}
              </div>
              <Skeleton className="h-6 w-16 rounded-full" /> {/* category badge */}
            </div>
            
            <Skeleton className="h-8 w-20 rounded" /> {/* read more button */}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function DashboardSkeleton() {
  return (
    <div className="space-y-6">
      {/* Data Cards */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <CryptoSkeleton />
        <WeatherSkeleton />
      </div>
      
      <NewsSkeleton />

      {/* Footer Info Skeleton */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="flex items-center justify-between text-sm text-gray-600">
          <div className="flex items-center space-x-4">
            <Skeleton className="h-4 w-32" />
            <span>•</span>
            <Skeleton className="h-4 w-28" />
          </div>
          <div className="flex items-center space-x-2">
            <Skeleton className="w-2 h-2 rounded-full" />
            <Skeleton className="h-4 w-16" />
          </div>
        </div>
      </div>
    </div>
  );
}
