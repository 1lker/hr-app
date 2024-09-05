'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { Toast } from '@/components/ui/toast';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip';
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import {
  User,
  FileText,
  Send,
  Download,
  Edit,
  Eye,
  Plus,
  CheckCircle,
  XCircle,
  Clock,
  RefreshCw,
  Filter,
  MoreVertical,
  Trash2,
  Search,
  AlertCircle
} from 'lucide-react';
import { format } from 'date-fns';
import PageContainer from '@/components/layout/page-container';
import { DateRange, SelectRangeEventHandler } from 'react-day-picker';
import { Pagination } from '@tanstack/react-table';

// Types
type Candidate = {
  id: string;
  name: string;
  email: string;
  jobTitle: string;
  department: string;
  startDate: string;
  status: 'active' | 'pending' | 'terminated';
};

type Contract = {
  id: string;
  candidateId: string;
  status: 'draft' | 'sent' | 'approved' | 'rejected' | 'signed' | 'completed';
  createdAt: string;
  updatedAt: string;
  type: 'full-time' | 'part-time' | 'contract' | 'internship';
  duration?: string;
};

// Dummy Data Generation
const departments = [
  'Engineering',
  'Product',
  'Design',
  'Data Science',
  'Marketing',
  'Sales',
  'HR',
  'Finance'
];
const jobTitles: { [key: string]: string[] } = {
  Engineering: [
    'Software Engineer',
    'DevOps Engineer',
    'QA Engineer',
    'Frontend Developer',
    'Backend Developer'
  ],
  Product: ['Product Manager', 'Product Owner', 'Business Analyst'],
  Design: ['UI Designer', 'UX Designer', 'Graphic Designer'],
  'Data Science': [
    'Data Scientist',
    'Data Analyst',
    'Machine Learning Engineer'
  ],
  Marketing: ['Marketing Specialist', 'Content Writer', 'SEO Specialist'],
  Sales: ['Sales Representative', 'Account Manager', 'Business Development'],
  HR: ['HR Specialist', 'Recruiter', 'HR Manager'],
  Finance: ['Financial Analyst', 'Accountant', 'Finance Manager']
};

// Dummy data generation functions
const generateRandomDate = (start: Date, end: Date) => {
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  )
    .toISOString()
    .split('T')[0];
};

const generateCandidates = (count: number, seed: number): Candidate[] => {
  const random = (max: number) => {
    seed = (seed * 1103515245 + 12345) & 0x7fffffff;
    return seed % max;
  };

  return Array.from({ length: count }, (_, i) => {
    const department = departments[random(departments.length)];
    const jobTitle =
      jobTitles[department][random(jobTitles[department].length)];
    return {
      id: `C${i + 1}`,
      name: `Candidate ${i + 1}`,
      email: `candidate${i + 1}@example.com`,
      jobTitle,
      department,
      startDate: generateRandomDate(new Date(2023, 0, 1), new Date()),
      status: ['active', 'pending', 'terminated'][random(3)] as
        | 'active'
        | 'pending'
        | 'terminated'
    };
  });
};

const generateContracts = (
  candidates: Candidate[],
  seed: number
): Contract[] => {
  const random = (max: number) => {
    seed = (seed * 1103515245 + 12345) & 0x7fffffff;
    return seed % max;
  };

  return candidates.map((candidate, i) => {
    const createdAt = generateRandomDate(new Date(2023, 0, 1), new Date());
    return {
      id: `CT${i + 1}`,
      candidateId: candidate.id,
      status: ['draft', 'sent', 'approved', 'rejected', 'signed', 'completed'][
        random(6)
      ] as Contract['status'],
      createdAt,
      updatedAt: generateRandomDate(new Date(createdAt), new Date()),
      type: ['full-time', 'part-time', 'contract', 'internship'][
        random(4)
      ] as Contract['type'],
      duration: random(2) > 0 ? `${random(12) + 1} months` : undefined
    };
  });
};

// Utility function for status colors
const getStatusColor = (status: string) => {
  const colors: { [key: string]: string } = {
    active: 'bg-green-100 text-green-800',
    pending: 'bg-yellow-100 text-yellow-800',
    terminated: 'bg-red-100 text-red-800',
    draft: 'bg-gray-100 text-gray-800',
    sent: 'bg-blue-100 text-blue-800',
    approved: 'bg-indigo-100 text-indigo-800',
    rejected: 'bg-pink-100 text-pink-800',
    signed: 'bg-purple-100 text-purple-800',
    completed: 'bg-teal-100 text-teal-800'
  };
  return colors[status] || 'bg-gray-100 text-gray-800';
};

// Components
const FilterBar: React.FC<{
  onFilterChange: (filters: any) => void;
  onResetFilters: () => void;
}> = ({ onFilterChange, onResetFilters }) => {
  const [department, setDepartment] = useState('');
  const [status, setStatus] = useState('');
  const [dateRange, setDateRange] = useState<DateRange | undefined>();

  const handleFilter = () => {
    onFilterChange({ department, status, dateRange });
  };

  const handleReset = () => {
    setDepartment('');
    setStatus('');
    setDateRange(undefined);
    onResetFilters();
  };

  return (
    <Card className="mb-6">
      <CardContent className="flex flex-wrap items-end gap-4 pt-6">
        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="department">Department</Label>
          <Select value={department} onValueChange={setDepartment}>
            <SelectTrigger id="department">
              <SelectValue placeholder="Select Department" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Departments</SelectItem>
              {departments.map((dept) => (
                <SelectItem key={dept} value={dept}>
                  {dept}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="status">Status</Label>
          <Select value={status} onValueChange={setStatus}>
            <SelectTrigger id="status">
              <SelectValue placeholder="Select Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Statuses</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="terminated">Terminated</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex flex-col space-y-1.5">
          <Label>Date Range</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline">
                {dateRange?.from ? (
                  dateRange.to ? (
                    <>
                      {format(dateRange.from, 'LLL dd, y')} -{' '}
                      {format(dateRange.to, 'LLL dd, y')}
                    </>
                  ) : (
                    format(dateRange.from, 'LLL dd, y')
                  )
                ) : (
                  <span>Pick a date</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                initialFocus
                mode="range"
                defaultMonth={dateRange?.from}
                selected={dateRange}
                onSelect={setDateRange}
                numberOfMonths={2}
              />
            </PopoverContent>
          </Popover>
        </div>
        <Button onClick={handleFilter}>Apply Filters</Button>
        <Button variant="outline" onClick={handleReset}>
          Reset Filters
        </Button>
      </CardContent>
    </Card>
  );
};

const CandidateList: React.FC<{
  candidates: Candidate[];
  onSelectCandidate: (candidate: Candidate) => void;
  selectedCandidates: string[];
  onSelectMultiple: (id: string) => void;
}> = ({
  candidates,
  onSelectCandidate,
  selectedCandidates,
  onSelectMultiple
}) => (
  <Card>
    <CardHeader>
      <CardTitle>Candidate List</CardTitle>
    </CardHeader>
    <CardContent>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[50px]">
              <Checkbox
                checked={selectedCandidates.length === candidates.length}
                onCheckedChange={(checked) => {
                  if (checked) {
                    onSelectMultiple('all');
                  } else {
                    onSelectMultiple('none');
                  }
                }}
              />
            </TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Job Title</TableHead>
            <TableHead>Department</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Start Date</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {candidates.map((candidate) => (
            <TableRow key={candidate.id}>
              <TableCell>
                <Checkbox
                  checked={selectedCandidates.includes(candidate.id)}
                  onCheckedChange={() => onSelectMultiple(candidate.id)}
                />
              </TableCell>
              <TableCell>{candidate.name}</TableCell>
              <TableCell>{candidate.jobTitle}</TableCell>
              <TableCell>{candidate.department}</TableCell>
              <TableCell>
                <span
                  className={`rounded-full px-2 py-1 text-xs font-semibold ${getStatusColor(
                    candidate.status
                  )}`}
                >
                  {candidate.status}
                </span>
              </TableCell>
              <TableCell>{candidate.startDate}</TableCell>
              <TableCell>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onSelectCandidate(candidate)}
                >
                  View Details
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </CardContent>
  </Card>
);

const ContractDetails: React.FC<{
  candidate: Candidate;
  contract?: Contract;
}> = ({ candidate, contract }) => {
  const [status, setStatus] = useState(contract?.status || 'draft');

  const handleStatusChange = (newStatus: string) => {
    setStatus(newStatus as Contract['status']);
    // Here you would typically update the contract status in your backend
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Contract Details</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <Label>Candidate Name</Label>
            <Input value={candidate.name} readOnly />
          </div>
          <div>
            <Label>Job Title</Label>
            <Input value={candidate.jobTitle} readOnly />
          </div>
          <div>
            <Label>Department</Label>
            <Input value={candidate.department} readOnly />
          </div>
          <div>
            <Label>Contract Type</Label>
            <Select defaultValue={contract?.type || 'full-time'}>
              <SelectTrigger>
                <SelectValue placeholder="Select contract type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="full-time">Full Time</SelectItem>
                <SelectItem value="part-time">Part Time</SelectItem>
                <SelectItem value="contract">Contract</SelectItem>
                <SelectItem value="internship">Internship</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Contract Status</Label>
            <Select onValueChange={handleStatusChange} defaultValue={status}>
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="sent">Sent</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
                <SelectItem value="signed">Signed</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col space-y-2">
            <Button>
              <FileText className="mr-2 h-4 w-4" /> Generate PDF
            </Button>
            <Button>
              <Send className="mr-2 h-4 w-4" /> Send to Email
            </Button>
            <Button>
              <Download className="mr-2 h-4 w-4" /> Download
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const BulkActions: React.FC<{
  selectedCount: number;
  onBulkAction: (action: string) => void;
}> = ({ selectedCount, onBulkAction }) => (
  <Card className="mb-6">
    <CardContent className="flex items-center justify-between pt-6">
      <span>{selectedCount} candidates selected</span>
      <div className="space-x-2">
        <Button
          disabled={selectedCount === 0}
          onClick={() => onBulkAction('send')}
        >
          <Send className="mr-2 h-4 w-4" /> Send Contracts
        </Button>
        <Button
          disabled={selectedCount === 0}
          onClick={() => onBulkAction('generate')}
        >
          <FileText className="mr-2 h-4 w-4" /> Generate PDFs
        </Button>
        <Button
          variant="destructive"
          disabled={selectedCount === 0}
          onClick={() => onBulkAction('delete')}
        >
          <Trash2 className="mr-2 h-4 w-4" /> Delete Selected
        </Button>
      </div>
    </CardContent>
  </Card>
);

const ContractManagement: React.FC = () => {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [contracts, setContracts] = useState<Contract[]>([]);
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(
    null
  );
  const [filters, setFilters] = useState({});
  const [selectedCandidates, setSelectedCandidates] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    const seed = Math.floor(Math.random() * 1000000);
    const generatedCandidates = generateCandidates(1000, seed);
    const generatedContracts = generateContracts(generatedCandidates, seed);
    setCandidates(generatedCandidates);
    setContracts(generatedContracts);
  }, []);

  const handleSelectCandidate = (candidate: Candidate) => {
    setSelectedCandidate(candidate);
  };

  const handleFilterChange = (newFilters: any) => {
    setFilters(newFilters);
    setCurrentPage(1); // Reset to first page when filters change
  };

  const handleResetFilters = () => {
    setFilters({});
    setSearchTerm('');
    setCurrentPage(1);
  };

  const handleSelectMultiple = (id: string) => {
    if (id === 'all') {
      setSelectedCandidates(filteredCandidates.map((c) => c.id));
    } else if (id === 'none') {
      setSelectedCandidates([]);
    } else {
      setSelectedCandidates((prev) =>
        prev.includes(id) ? prev.filter((cid) => cid !== id) : [...prev, id]
      );
    }
  };

  const handleBulkAction = (action: string) => {
    // Implement bulk actions here
    console.log(`Bulk action: ${action} on candidates:`, selectedCandidates);
    // Reset selection after action
    setSelectedCandidates([]);
  };

  const filteredCandidates = useMemo(() => {
    return candidates.filter((candidate) => {
      const { department, status, dateRange } = filters as any;
      const matchesDepartment =
        !department || candidate.department === department;
      const matchesStatus = !status || candidate.status === status;
      const matchesDateRange =
        (!dateRange?.from || new Date(candidate.startDate) >= dateRange.from) &&
        (!dateRange?.to || new Date(candidate.startDate) <= dateRange.to);
      const matchesSearch =
        candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        candidate.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        candidate.jobTitle.toLowerCase().includes(searchTerm.toLowerCase());

      return (
        matchesDepartment && matchesStatus && matchesDateRange && matchesSearch
      );
    });
  }, [candidates, filters, searchTerm]);

  const paginatedCandidates = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredCandidates.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredCandidates, currentPage]);

  const totalPages = Math.ceil(filteredCandidates.length / itemsPerPage);

  return (
    <PageContainer>
      <div className="min-h-screen">
        <main className="container mx-auto mb-20 py-10">
          <motion.h1
            className="mb-6 text-3xl font-bold"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Contract Management System
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <FilterBar
              onFilterChange={handleFilterChange}
              onResetFilters={handleResetFilters}
            />
          </motion.div>

          <BulkActions
            selectedCount={selectedCandidates.length}
            onBulkAction={handleBulkAction}
          />

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <div className="md:col-span-2">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Card className="mb-6">
                  <CardContent className="pt-6">
                    <div className="mb-4 flex items-center space-x-2">
                      <Search className="text-gray-400" />
                      <Input
                        placeholder="Search candidates..."
                        value={searchTerm}
                        onChange={(e) => {
                          setSearchTerm(e.target.value);
                          setCurrentPage(1); // Reset to first page on search
                        }}
                      />
                    </div>
                    {candidates.length === 0 ? (
                      <div className="py-10 text-center">
                        <AlertCircle className="mx-auto h-10 w-10 text-gray-400" />
                        <h3 className="mt-2 text-sm font-medium text-gray-900">
                          Loading data...
                        </h3>
                        <p className="mt-1 text-sm text-gray-500">
                          Please wait while we fetch the candidate information.
                        </p>
                      </div>
                    ) : filteredCandidates.length === 0 ? (
                      <div className="py-10 text-center">
                        <AlertCircle className="mx-auto h-10 w-10 text-gray-400" />
                        <h3 className="mt-2 text-sm font-medium text-gray-900">
                          No results found
                        </h3>
                        <p className="mt-1 text-sm text-gray-500">
                          No candidates match your search criteria. Try
                          adjusting your filters or search term.
                        </p>
                      </div>
                    ) : (
                      <>
                        <CandidateList
                          candidates={paginatedCandidates}
                          onSelectCandidate={handleSelectCandidate}
                          selectedCandidates={selectedCandidates}
                          onSelectMultiple={handleSelectMultiple}
                        />
                        <div className="mt-4 flex items-center justify-between">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() =>
                              setCurrentPage((prev) => Math.max(prev - 1, 1))
                            }
                            disabled={currentPage === 1}
                          >
                            Previous
                          </Button>
                          <span>
                            Page {currentPage} of {totalPages}(
                            {filteredCandidates.length} total results)
                          </span>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() =>
                              setCurrentPage((prev) =>
                                Math.min(prev + 1, totalPages)
                              )
                            }
                            disabled={currentPage === totalPages}
                          >
                            Next
                          </Button>
                        </div>
                      </>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            </div>
            <div>
              <AnimatePresence>
                {selectedCandidate && (
                  <motion.div
                    key={selectedCandidate.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.5 }}
                  >
                    <ContractDetails
                      candidate={selectedCandidate}
                      contract={contracts.find(
                        (c) => c.candidateId === selectedCandidate.id
                      )}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Contract History</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Contract ID</TableHead>
                    <TableHead>Candidate</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Created At</TableHead>
                    <TableHead>Updated At</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {contracts.slice(0, 10).map((contract) => {
                    const candidate = candidates.find(
                      (c) => c.id === contract.candidateId
                    );
                    return (
                      <TableRow key={contract.id}>
                        <TableCell>{contract.id}</TableCell>
                        <TableCell>{candidate?.name || 'Unknown'}</TableCell>
                        <TableCell>{contract.type}</TableCell>
                        <TableCell>
                          <span
                            className={`rounded-full px-2 py-1 text-xs font-semibold ${getStatusColor(
                              contract.status
                            )}`}
                          >
                            {contract.status}
                          </span>
                        </TableCell>
                        <TableCell>{contract.createdAt}</TableCell>
                        <TableCell>{contract.updatedAt}</TableCell>
                        <TableCell>
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <Eye className="h-4 w-4" />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>View Contract</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <Edit className="h-4 w-4" />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Edit Contract</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <Send className="h-4 w-4" />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Send Contract</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                <Button>
                  <Plus className="mr-2 h-4 w-4" /> New Contract
                </Button>
                <Button>
                  <FileText className="mr-2 h-4 w-4" /> Contract Templates
                </Button>
                <Button>
                  <RefreshCw className="mr-2 h-4 w-4" /> Renewal Reminders
                </Button>
                <Button>
                  <User className="mr-2 h-4 w-4" /> Onboarding Checklist
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="mb-12 mt-6">
            <CardHeader>
              <CardTitle>Contract Analytics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                <div className="text-center">
                  <h3 className="text-lg font-semibold">Total Contracts</h3>
                  <p className="text-3xl font-bold">{contracts.length}</p>
                </div>
                <div className="text-center">
                  <h3 className="text-lg font-semibold">Pending Approvals</h3>
                  <p className="text-3xl font-bold">
                    {contracts.filter((c) => c.status === 'sent').length}
                  </p>
                </div>
                <div className="text-center">
                  <h3 className="text-lg font-semibold">
                    Completed This Month
                  </h3>
                  <p className="text-3xl font-bold">
                    {
                      contracts.filter(
                        (c) =>
                          c.status === 'completed' &&
                          new Date(c.updatedAt) >
                            new Date(new Date().setDate(1))
                      ).length
                    }
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </PageContainer>
  );
};

export default ContractManagement;
