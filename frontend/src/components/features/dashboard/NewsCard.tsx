import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { NewsData } from '@/types';
import { formatRelativeTime } from '@/lib/utils';
import { ExternalLink, Calendar, User } from 'lucide-react';

interface NewsCardProps {
  data: NewsData;
}

export function NewsCard({ data }: NewsCardProps) {
  const publishedDate = new Date(data.publishedAt);
  
  return (
    <Card className="bg-gradient-to-br from-green-50 to-emerald-50">
      <CardHeader>
        <CardTitle>Latest News</CardTitle>
        <CardDescription>Recent news updates</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <h4 className="text-lg font-bold text-gray-900 leading-tight mb-2">
              {data.title}
            </h4>
            {data.description && (
              <p className="text-gray-700 text-sm leading-relaxed">
                {data.description}
              </p>
            )}
          </div>
          
          <div className="flex items-center justify-between pt-4 border-t border-green-100">
            <div className="flex items-center space-x-4 text-sm text-gray-600">
              <div className="flex items-center space-x-1">
                <User className="w-4 h-4" />
                <span>{data.source}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Calendar className="w-4 h-4" />
                <span>{formatRelativeTime(publishedDate)}</span>
              </div>
              {data.category && (
                <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                  {data.category}
                </span>
                )}
            </div>
            
            <a
              href={data.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-1 text-green-600 hover:text-green-700 font-medium text-sm transition-colors"
            >
              <span>Read more</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
