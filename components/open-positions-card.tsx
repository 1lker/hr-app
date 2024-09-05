import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { departmentData } from '@/lib/dummyData';

const OpenPositionsCard: React.FC = () => {
  const totalOpenPositions = departmentData.reduce(
    (sum, dept) => sum + dept.value,
    0
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>Açık Pozisyonlar</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-2 text-2xl font-bold">{totalOpenPositions}</div>
        <div className="text-sm">
          {departmentData.map((dept, index) => (
            <div key={index} className="mt-1 flex items-center justify-between">
              <span>{dept.name}:</span>
              <span className="font-medium">{dept.value}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default OpenPositionsCard;
