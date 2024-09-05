import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

const data = [
  { position: 'Software Engineer', applications: 150 },
  { position: 'Product Manager', applications: 80 },
  { position: 'Data Analyst', applications: 100 },
  { position: 'UX Designer', applications: 70 },
  { position: 'Sales Rep', applications: 90 }
];

export function JobApplicationsChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>İş Pozisyonlarına Göre Başvurular</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="position" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="applications" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
