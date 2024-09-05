import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { employeePerformance } from '@/lib/dummyData';

const TopPerformersTable: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Yüksek Performans Gösterenler</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>İsim</TableHead>
              <TableHead>Performans Skoru</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {employeePerformance.map((employee, index) => (
              <TableRow key={index}>
                <TableCell>{employee.name}</TableCell>
                <TableCell>{employee.score}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default TopPerformersTable;
