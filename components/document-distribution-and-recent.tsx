import React from 'react';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { documentTypeData, recentDocuments } from '@/lib/dummyData';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const DocumentDistributionAndRecent: React.FC = () => {
  return (
    <Card className="h-[500px] w-full">
      <CardHeader>
        <CardTitle>Doküman Dağılımı ve Son Eklenenler</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4 h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={documentTypeData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {documentTypeData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div>
          <h3 className="mb-2 text-lg font-semibold">Son Eklenen Dokümanlar</h3>
          <ul className="space-y-2">
            {recentDocuments.map((doc, index) => (
              <li key={index} className="flex items-center justify-between">
                <span>{doc.name}</span>
                <span className="text-sm text-gray-500">{doc.date}</span>
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default DocumentDistributionAndRecent;
