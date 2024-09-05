'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
  Area,
  AreaChart
} from 'recharts';
import {
  Users,
  Clock,
  CheckCircle,
  XCircle,
  UserPlus,
  Calendar,
  CalendarIcon
} from 'lucide-react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover';
import { format } from 'date-fns';
import { DateRange, DayPicker } from 'react-day-picker';
import { cn } from '@/lib/utils';
import PageContainer from '@/components/layout/page-container';
import { motion } from 'framer-motion';
import { Send, Flag, Save, Plus } from 'lucide-react';

type CandidateData = {
  id: string;
  name: string;
  email: string;
  jobTitle: string;
  department: string;
  status: 'Pending' | 'Approved' | 'Rejected';
  applicationDate: string;
};

type DepartmentData = {
  name: string;
  value: number;
};

type StatusData = {
  name: string;
  Approved: number;
  Rejected: number;
  Pending: number;
  NewEntry: number;
};

// DatePickerWithRange component
const DatePickerWithRange = ({
  className
}: React.HTMLAttributes<HTMLDivElement>) => {
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: new Date(),
    to: new Date()
  });

  return (
    <div className={cn('grid gap-2', className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={'outline'}
            className={cn(
              'w-[300px] justify-start text-left font-normal',
              !date && 'text-muted-foreground'
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, 'LLL dd, y')} -{' '}
                  {format(date.to, 'LLL dd, y')}
                </>
              ) : (
                format(date.from, 'LLL dd, y')
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <DayPicker
            mode="range"
            selected={date}
            onSelect={setDate}
            initialFocus
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};

// Mock data
const departmentData: DepartmentData[] = [
  { name: 'Engineering', value: 40 },
  { name: 'Marketing', value: 30 },
  { name: 'Sales', value: 20 },
  { name: 'HR', value: 10 }
];

const statusData: StatusData[] = [
  { name: 'Mon', Approved: 4, Rejected: 2, Pending: 10, NewEntry: 5 },
  { name: 'Tue', Approved: 3, Rejected: 1, Pending: 12, NewEntry: 6 },
  { name: 'Wed', Approved: 5, Rejected: 2, Pending: 8, NewEntry: 4 },
  { name: 'Thu', Approved: 2, Rejected: 3, Pending: 15, NewEntry: 7 },
  { name: 'Fri', Approved: 6, Rejected: 1, Pending: 9, NewEntry: 3 },
  { name: 'Sat', Approved: 1, Rejected: 1, Pending: 5, NewEntry: 2 },
  { name: 'Sun', Approved: 2, Rejected: 0, Pending: 3, NewEntry: 1 }
];

const trendData = [
  { name: 'Week 1', Applications: 50, Interviews: 30, Offers: 10 },
  { name: 'Week 2', Applications: 60, Interviews: 40, Offers: 15 },
  { name: 'Week 3', Applications: 70, Interviews: 45, Offers: 20 },
  { name: 'Week 4', Applications: 80, Interviews: 50, Offers: 25 }
];

const candidates: CandidateData[] = [
  {
    id: '1',
    name: 'Olivia Martin',
    email: 'olivia.martin@example.com',
    jobTitle: 'Software Engineer',
    department: 'Engineering',
    status: 'Pending',
    applicationDate: '2024-09-01'
  },
  {
    id: '2',
    name: 'Jackson Lee',
    email: 'jackson.lee@example.com',
    jobTitle: 'Product Manager',
    department: 'Marketing',
    status: 'Approved',
    applicationDate: '2024-09-02'
  },
  {
    id: '3',
    name: 'Isabella Nguyen',
    email: 'isabella.nguyen@example.com',
    jobTitle: 'Data Analyst',
    department: 'Engineering',
    status: 'Rejected',
    applicationDate: '2024-09-03'
  }
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const boschColors = {
  lightBlue: '#1DA3CC',
  green: '#2F9F5A',
  red: '#AE1C22',
  darkBlue: '#1F4087',
  purple: '#843376',
  mediumBlue: '#1F6EAD',
  lightGreen: '#94BC5C',
  violet: '#513C8C',
  darkViolet: '#312C6C',
  darkGreen: '#197E38',
  gray: '#F5F5F5',
  darkGray: '#333333',
  white: '#FFFFFF',
  yellow: '#FFD700'
};

type SummaryCardProps = {
  title: string;
  value: number;
  change: number;
  icon: React.ReactNode;
  color: string;
};

const SummaryCard: React.FC<SummaryCardProps> = ({
  title,
  value,
  change,
  icon,
  color
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
  >
    <Card
      className="overflow-hidden shadow-lg"
      style={{ backgroundColor: boschColors.white }}
    >
      <CardHeader
        className="flex items-center justify-between space-y-0 pb-2"
        style={{ backgroundColor: color }}
      >
        <motion.div
          initial={{ rotate: -30, opacity: 0 }}
          animate={{ rotate: 0, opacity: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 500 }}
          className="rounded-full p-2"
          style={{ backgroundColor: boschColors.white }}
        >
          {React.cloneElement(icon as React.ReactElement, {
            className: 'h-6 w-6',
            style: { color: color }
          })}
        </motion.div>
        <CardTitle
          className="whitespace-pre-wrap break-words pt-4 text-lg font-bold"
          style={{ color: boschColors.white }}
        >
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="mb-2 text-3xl font-bold"
          style={{ color: color }}
        >
          {value}
        </motion.div>
        <motion.p
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="text-sm font-semibold"
          style={{ color: change > 0 ? boschColors.green : boschColors.red }}
        >
          {change > 0 ? '▲' : '▼'} {Math.abs(change)}% vs last month
        </motion.p>
      </CardContent>
    </Card>
  </motion.div>
);

const FilterSection: React.FC<{ onFilterChange: (filters: any) => void }> = ({
  onFilterChange
}) => {
  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>Filters</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-wrap gap-4">
        <DatePickerWithRange className="w-[300px]" />
        <Select
          onValueChange={(value) => onFilterChange({ department: value })}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Department" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Departments</SelectItem>
            <SelectItem value="engineering">Engineering</SelectItem>
            <SelectItem value="marketing">Marketing</SelectItem>
            <SelectItem value="sales">Sales</SelectItem>
            <SelectItem value="hr">HR</SelectItem>
          </SelectContent>
        </Select>
        <Select onValueChange={(value) => onFilterChange({ jobRole: value })}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Job Role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Roles</SelectItem>
            <SelectItem value="engineer">Software Engineer</SelectItem>
            <SelectItem value="manager">Product Manager</SelectItem>
            <SelectItem value="analyst">Data Analyst</SelectItem>
          </SelectContent>
        </Select>
      </CardContent>
    </Card>
  );
};

const CandidateList: React.FC<{ candidates: CandidateData[] }> = ({
  candidates
}) => {
  return (
    <div className="space-y-4">
      {candidates.map((candidate) => (
        <Card key={candidate.id}>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">{candidate.name}</p>
                <p className="text-sm text-gray-600">{candidate.email}</p>
                <p className="text-sm text-gray-600">
                  {candidate.jobTitle} - {candidate.department}
                </p>
              </div>
              <div className="text-right">
                <p
                  className={`text-sm font-medium ${
                    candidate.status === 'Approved'
                      ? 'text-green-600'
                      : candidate.status === 'Rejected'
                      ? 'text-red-600'
                      : 'text-yellow-600'
                  }`}
                >
                  {candidate.status}
                </p>
                <p className="text-sm text-gray-600">
                  {candidate.applicationDate}
                </p>
              </div>
            </div>
            <textarea
              className="mt-2 w-full rounded border p-2"
              placeholder="Add notes..."
            ></textarea>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

const ActionButton: React.FC<{
  color: string;
  hoverColor: string;
  icon: React.ReactNode;
  text: string;
}> = ({ color, hoverColor, icon, text }) => (
  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
    <Button
      className="flex w-full items-center justify-center space-x-2 rounded-lg px-4 py-3 font-semibold text-white shadow-md transition-all duration-300"
      style={{
        backgroundColor: color,
        border: `2px solid ${color}`
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = hoverColor;
        e.currentTarget.style.borderColor = color;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = color;
        e.currentTarget.style.borderColor = color;
      }}
    >
      {icon}
      <span>{text}</span>
    </Button>
  </motion.div>
);

const ActionButtons: React.FC = () => {
  return (
    <div className="space-y-4">
      <ActionButton
        color={boschColors.lightBlue}
        hoverColor={boschColors.darkBlue}
        icon={<Send className="h-5 w-5" />}
        text="Send Reminder to All"
      />
      <ActionButton
        color={boschColors.yellow}
        hoverColor={boschColors.darkGreen}
        icon={<Flag className="h-5 w-5" />}
        text="Export All"
      />
      <ActionButton
        color={boschColors.purple}
        hoverColor={boschColors.violet}
        icon={<Save className="h-5 w-5" />}
        text="Save All to Bosch"
      />
      <ActionButton
        color={boschColors.darkGray}
        hoverColor={boschColors.red}
        icon={<Plus className="h-5 w-5" />}
        text="Additional Action"
      />
    </div>
  );
};

// Main Dashboard Component
const RecruitmentDashboard: React.FC = () => {
  const [filters, setFilters] = useState({});

  const handleFilterChange = (newFilters: any) => {
    setFilters({ ...filters, ...newFilters });
    console.log('Filters updated:', { ...filters, ...newFilters });
  };

  return (
    <PageContainer>
      <div className="h-screen space-y-6 overflow-auto p-8">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8 text-center text-4xl font-bold"
          style={{ color: boschColors.darkBlue }}
        >
          Recruitment Dashboard
        </motion.h1>

        <FilterSection onFilterChange={handleFilterChange} />

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-5 ">
          <SummaryCard
            title="Total Applications"
            value={150}
            change={10}
            icon={<Users />}
            color={boschColors.lightBlue}
          />
          <SummaryCard
            title="Pending Reviews"
            value={125}
            change={-5}
            icon={<Clock />}
            color={boschColors.purple}
          />
          <SummaryCard
            title="Approved Candidates"
            value={15}
            change={20}
            icon={<CheckCircle />}
            color={boschColors.green}
          />
          <SummaryCard
            title="Rejected Candidates"
            value={5}
            change={-10}
            icon={<XCircle />}
            color={boschColors.red}
          />
          <SummaryCard
            title="New Entries"
            value={5}
            change={15}
            icon={<UserPlus />}
            color={boschColors.darkBlue}
          />
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Candidate Department Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={departmentData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) =>
                      `${name} ${(percent * 100).toFixed(0)}%`
                    }
                  >
                    {departmentData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Weekly Application Status</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={statusData}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="Approved" stackId="a" fill="#4CAF50" />
                  <Bar dataKey="Rejected" stackId="a" fill="#F44336" />
                  <Bar dataKey="Pending" stackId="a" fill="#FFC107" />
                  <Bar dataKey="NewEntry" stackId="a" fill="#2196F3" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Recruitment Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={trendData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Area
                  type="monotone"
                  dataKey="Applications"
                  stackId="1"
                  stroke="#8884d8"
                  fill="#8884d8"
                />
                <Area
                  type="monotone"
                  dataKey="Interviews"
                  stackId="1"
                  stroke="#82ca9d"
                  fill="#82ca9d"
                />
                <Area
                  type="monotone"
                  dataKey="Offers"
                  stackId="1"
                  stroke="#ffc658"
                  fill="#ffc658"
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <CandidateList candidates={candidates} />
          </div>
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <ActionButtons />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </PageContainer>
  );
};

export default RecruitmentDashboard;
