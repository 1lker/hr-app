import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowUpIcon, ArrowDownIcon } from '@radix-ui/react-icons';

interface TotalApplicationsCardProps {
  total: number;
  dailyChange: number;
}

const TotalApplicationsCard: React.FC<TotalApplicationsCardProps> = ({
  total,
  dailyChange
}) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Toplam Başvurular</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{total}</div>
        <p className="text-xs text-muted-foreground">
          {dailyChange > 0 ? (
            <span className="flex items-center text-green-600">
              <ArrowUpIcon className="mr-1" />
              {dailyChange} artış
            </span>
          ) : (
            <span className="flex items-center text-red-600">
              <ArrowDownIcon className="mr-1" />
              {Math.abs(dailyChange)} azalış
            </span>
          )}
          <span className="ml-1">günlük</span>
        </p>
      </CardContent>
    </Card>
  );
};

export default TotalApplicationsCard;
