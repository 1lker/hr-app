'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import {
  Upload,
  FileText,
  Edit,
  Trash2,
  Send,
  Download,
  RefreshCw,
  CheckCircle,
  XCircle,
  AlertCircle,
  Save
} from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import PageContainer from '@/components/layout/page-container';
import * as XLSX from 'xlsx';
import { faker } from '@faker-js/faker';

// Updated Employee type based on the new schema

type Employee = {
  personelNumber: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  position: string;
  department: string;
  salary: number;
  startDate: string;
  pate: string;
  director: string;
  address: string;
  status: 'Valid' | 'Error';
  errorDetails?: string;
};

type EmailTemplate = {
  id: string;
  name: string;
  subject: string;
  body: string;
};

const departments = ['Engineering', 'Product', 'Sales', 'HR', 'Marketing'];
const positions: { [key: string]: string[] } = {
  Engineering: ['Software Engineer', 'DevOps Engineer', 'QA Engineer'],
  Product: ['Product Manager', 'Product Designer', 'UX/UI Designer'],
  Sales: ['Sales Representative', 'Account Manager', 'Sales Lead'],
  HR: ['HR Manager', 'Recruiter', 'HR Coordinator'],
  Marketing: ['Marketing Manager', 'Content Strategist', 'SEO Specialist']
};
const directors = [
  'Jane Smith',
  'John Doe',
  'Anna White',
  'Tom Black',
  'Sara Green'
];

// Helper function to get a random element from an array
function getRandomElement<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

// Generate a random employee record
function generateRandomEmployee(personelNumber: number): Employee {
  const department = getRandomElement(departments);
  const position = getRandomElement(positions[department]);
  const salary = faker.number.int({ min: 50000, max: 120000 });
  const status = faker.helpers.arrayElement(['Valid', 'Error']);
  const errorDetails = status === 'Error' ? faker.lorem.sentence() : undefined;

  return {
    personelNumber: personelNumber.toString().padStart(3, '0'),
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    email: faker.internet.email(),
    phone: faker.phone.number({ style: 'international' }),
    position,
    department,
    salary,
    startDate: faker.date.past({ years: 5 }).toISOString().split('T')[0], // Date in past 5 years
    pate: faker.lorem.word(),
    director: getRandomElement(directors),
    address:
      faker.location.streetAddress() +
      ', ' +
      faker.location.city() +
      ', ' +
      faker.location.state() +
      ' ' +
      faker.location.zipCode(),
    status,
    errorDetails
  };
}

// Generate 1000 random employees
function generateMockData(count: number): Employee[] {
  const employees: Employee[] = [];
  for (let i = 1; i <= count; i++) {
    employees.push(generateRandomEmployee(i));
  }
  return employees;
}

// Generate 1000 employees
const mockEmployees = generateMockData(1000);

// Output mock data to the console (or use it as needed in your application)
console.log(mockEmployees);

const mockImportHistory = [
  {
    id: 1,
    date: '2023-09-01',
    status: 'Completed',
    totalRecords: 100,
    successfulRecords: 98,
    failedRecords: 2
  },
  {
    id: 2,
    date: '2023-08-15',
    status: 'Failed',
    totalRecords: 50,
    successfulRecords: 0,
    failedRecords: 50
  },
  {
    id: 3,
    date: '2023-08-01',
    status: 'Completed',
    totalRecords: 200,
    successfulRecords: 200,
    failedRecords: 0
  },
  {
    id: 4,
    date: '2023-07-15',
    status: 'Completed',
    totalRecords: 75,
    successfulRecords: 75,
    failedRecords: 0
  },
  {
    id: 5,
    date: '2023-07-01',
    status: 'Completed',
    totalRecords: 150,
    successfulRecords: 150,
    failedRecords: 0
  },
  {
    id: 6,
    date: '2023-06-15',
    status: 'Completed',
    totalRecords: 100,
    successfulRecords: 100,
    failedRecords: 0
  },
  {
    id: 7,
    date: '2023-06-01',
    status: 'Completed',
    totalRecords: 50,
    successfulRecords: 50,
    failedRecords: 0
  },
  {
    id: 8,
    date: '2023-05-15',
    status: 'Completed',
    totalRecords: 25,
    successfulRecords: 25,
    failedRecords: 0
  },
  {
    id: 9,
    date: '2023-05-01',
    status: 'Completed',
    totalRecords: 10,
    successfulRecords: 10,
    failedRecords: 0
  },
  {
    id: 10,
    date: '2023-04-15',
    status: 'Completed',
    totalRecords: 5,
    successfulRecords: 5,
    failedRecords: 0
  }
];

// Mock data
const mockEmailTemplates: EmailTemplate[] = [
  {
    id: '1',
    name: 'Welcome Template',
    subject: 'Welcome to Our Company',
    body: 'Dear {firstName}, welcome to our company...'
  },
  {
    id: '2',
    name: 'Contract Template',
    subject: 'Your Employment Contract',
    body: 'Dear {firstName}, please find attached your employment contract...'
  }
];

const ImportManagement: React.FC = () => {
  const [importedData, setImportedData] = useState<Employee[]>([]);
  const [savedData, setSavedData] = useState<Employee[]>([]);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [importProgress, setImportProgress] = useState(0);
  const [showImportDialog, setShowImportDialog] = useState(false);
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [showContractDialog, setShowContractDialog] = useState(false);
  const [showEmailDialog, setShowEmailDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(
    null
  );
  const [selectedEmailTemplate, setSelectedEmailTemplate] =
    useState<EmailTemplate | null>(null);

  useEffect(() => {
    // Check if there's unsaved imported data when component unmounts
    return () => {
      if (importedData.length > 0 && savedData.length === 0) {
        if (
          confirm(
            'You have unsaved imported data. Do you want to save before leaving?'
          )
        ) {
          handleSaveData();
        }
      }
    };
  }, [importedData, savedData]);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      console.log('File selected:', file.name);
    }
  };

  const handleImport = () => {
    if (!selectedFile) return;

    setShowImportDialog(true);
    setImportProgress(0);

    const reader = new FileReader();
    reader.onload = (e) => {
      const data = new Uint8Array(e.target?.result as ArrayBuffer);
      const workbook = XLSX.read(data, { type: 'array' });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet) as Employee[];

      // Simulate progress
      let progress = 0;
      const interval = setInterval(() => {
        progress += 10;
        setImportProgress(progress);
        if (progress >= 100) {
          clearInterval(interval);
          setImportedData(
            jsonData.map((employee) => ({
              ...employee,
              status: validateEmployee(employee) ? 'Valid' : 'Error'
            }))
          );
          setShowImportDialog(false);
          setShowSaveDialog(true);
        }
      }, 200);
    };
    reader.readAsArrayBuffer(selectedFile);
  };

  const handleSaveData = () => {
    setSavedData(importedData);
    setImportedData([]);
    toast({
      title: 'Data Saved',
      description: 'The imported data has been successfully saved.'
    });
  };

  const handleGenerateContract = () => {
    if (savedData.length === 0) {
      toast({
        title: 'No Data',
        description: 'Please import and save data before generating contracts.',
        variant: 'destructive'
      });
      return;
    }
    setShowContractDialog(true);
  };

  const handleSendEmails = () => {
    if (savedData.length === 0) {
      toast({
        title: 'No Data',
        description: 'Please import and save data before sending emails.',
        variant: 'destructive'
      });
      return;
    }
    setShowEmailDialog(true);
  };

  const handleConfirmSendEmails = () => {
    if (!selectedEmailTemplate) {
      toast({
        title: 'No Template Selected',
        description: 'Please select an email template before sending.',
        variant: 'destructive'
      });
      return;
    }
    // Here you would implement the actual email sending logic
    toast({
      title: 'Emails Sent',
      description: `Emails sent to ${savedData.length} employees using the "${selectedEmailTemplate.name}" template.`
    });
    setShowEmailDialog(false);
  };

  const handleEditEmployee = (employee: Employee) => {
    setSelectedEmployee(employee);
    setShowEditDialog(true);
  };

  const handleUpdateEmployee = (updatedEmployee: Employee) => {
    setSavedData(
      savedData.map((emp) =>
        emp.personelNumber === updatedEmployee.personelNumber
          ? updatedEmployee
          : emp
      )
    );
    setShowEditDialog(false);
    toast({
      title: 'Employee Updated',
      description: `${updatedEmployee.firstName} ${updatedEmployee.lastName}'s information has been updated.`
    });
  };

  const handleDeleteEmployee = (personelNumber: string) => {
    if (confirm("Are you sure you want to delete this employee's data?")) {
      setSavedData(
        savedData.filter((emp) => emp.personelNumber !== personelNumber)
      );
      toast({
        title: 'Employee Deleted',
        description: "The employee's data has been removed."
      });
    }
  };

  const validateEmployee = (employee: Employee): boolean => {
    const errors: string[] = [];

    if (!employee.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(employee.email)) {
      errors.push('Invalid email address');
    }
    if (!employee.phone || !/^\+?[\d\s-]{10,}$/.test(employee.phone)) {
      errors.push('Invalid phone number');
    }
    if (!employee.salary || employee.salary <= 0) {
      errors.push('Invalid salary');
    }
    if (!employee.startDate || isNaN(Date.parse(employee.startDate))) {
      errors.push('Invalid start date');
    }

    if (errors.length > 0) {
      employee.errorDetails = errors.join(', ');
      return false;
    }
    return true;
  };

  const handleExportTemplate = () => {
    const template: Partial<Employee> = {
      personelNumber: '',
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      position: '',
      department: '',
      salary: 0,
      startDate: '',
      pate: '',
      director: '',
      address: ''
    };

    const ws = XLSX.utils.json_to_sheet([template]);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Employees');

    // Add data validation for email and date fields
    ws['!dataValidation'] = {
      D2: {
        type: 'textLength',
        operator: 'between',
        formula1: '5',
        formula2: '255',
        allowBlank: false
      },
      H2: {
        type: 'date',
        operator: 'between',
        formula1: '2000-01-01',
        formula2: '2099-12-31',
        allowBlank: false
      }
    };

    XLSX.writeFile(wb, 'employee_import_template.xlsx');
  };

  return (
    <PageContainer scrollable={true}>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="mb-6 text-3xl font-bold">
          Employee Import Management System
        </h1>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Import Employee Data</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-4 flex items-center space-x-4">
              <Input
                type="file"
                onChange={handleFileUpload}
                accept=".xlsx, .xls, .csv"
              />
              <Button onClick={handleImport} disabled={!selectedFile}>
                <Upload className="mr-2 h-4 w-4" /> Import
              </Button>
              <Button variant="outline" onClick={handleExportTemplate}>
                <Download className="mr-2 h-4 w-4" /> Export Template
              </Button>
            </div>
          </CardContent>
        </Card>

        {importedData.length > 0 && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Imported Data (Not Saved)</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Personel Number</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Position</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {importedData.map((employee) => (
                    <TableRow key={employee.personelNumber}>
                      <TableCell>{employee.personelNumber}</TableCell>
                      <TableCell>{`${employee.firstName} ${employee.lastName}`}</TableCell>
                      <TableCell>{employee.email}</TableCell>
                      <TableCell>{employee.position}</TableCell>
                      <TableCell>{employee.department}</TableCell>
                      <TableCell>
                        <span
                          className={`rounded-full px-2 py-1 text-xs font-semibold ${
                            employee.status === 'Valid'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-red-100 text-red-800'
                          }`}
                        >
                          {employee.status}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <div className="mt-4 flex justify-end">
                <Button onClick={() => setShowSaveDialog(true)}>
                  <Save className="mr-2 h-4 w-4" /> Save Imported Data
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {savedData.length > 0 && (
          <Card className="mb-12">
            <CardHeader>
              <CardTitle>Saved Employee Data</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Personel Number</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Position</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {savedData.map((employee) => (
                    <TableRow key={employee.personelNumber}>
                      <TableCell>{employee.personelNumber}</TableCell>
                      <TableCell>{`${employee.firstName} ${employee.lastName}`}</TableCell>
                      <TableCell>{employee.email}</TableCell>
                      <TableCell>{employee.position}</TableCell>
                      <TableCell>{employee.department}</TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleEditEmployee(employee)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() =>
                              handleDeleteEmployee(employee.personelNumber)
                            }
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <div className="mt-4 flex justify-end space-x-4">
                <Button onClick={handleGenerateContract}>
                  <FileText className="mr-2 h-4 w-4" /> Generate Contracts
                </Button>
                <Button onClick={handleSendEmails}>
                  <Send className="mr-2 h-4 w-4" /> Send Emails
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Dialogs */}
        <Dialog open={showImportDialog} onOpenChange={setShowImportDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Importing Data</DialogTitle>
            </DialogHeader>
            <Progress value={importProgress} className="w-full" />
            <DialogDescription>
              Importing {selectedFile?.name}... {importProgress}% complete
            </DialogDescription>
          </DialogContent>
        </Dialog>

        <Dialog open={showSaveDialog} onOpenChange={setShowSaveDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Save Imported Data</DialogTitle>
            </DialogHeader>
            <DialogDescription>
              Are you sure you want to save the imported data? This action
              cannot be undone.
            </DialogDescription>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setShowSaveDialog(false)}
              >
                Cancel
              </Button>
              <Button onClick={handleSaveData}>Save Data</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <Dialog open={showContractDialog} onOpenChange={setShowContractDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Generate Contracts</DialogTitle>
            </DialogHeader>
            <DialogDescription>
              Are you sure you want to generate contracts for all saved
              employees?
            </DialogDescription>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setShowContractDialog(false)}
              >
                Cancel
              </Button>
              <Button
                onClick={() => {
                  // Implement contract generation logic here
                  toast({
                    title: 'Contracts Generated',
                    description: `Contracts generated for ${savedData.length} employees.`
                  });
                  setShowContractDialog(false);
                }}
              >
                Generate Contracts
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <Dialog open={showEmailDialog} onOpenChange={setShowEmailDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Send Emails</DialogTitle>
            </DialogHeader>
            <div className="py-4">
              <Label htmlFor="emailTemplate">Select Email Template</Label>
              <Select
                onValueChange={(value) =>
                  setSelectedEmailTemplate(
                    mockEmailTemplates.find((t) => t.id === value) || null
                  )
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Choose a template" />
                </SelectTrigger>
                <SelectContent>
                  {mockEmailTemplates.map((template) => (
                    <SelectItem key={template.id} value={template.id}>
                      {template.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setShowEmailDialog(false)}
              >
                Cancel
              </Button>
              <Button onClick={handleConfirmSendEmails}>Send Emails</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Employee</DialogTitle>
            </DialogHeader>
            {selectedEmployee && (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleUpdateEmployee(selectedEmployee);
                }}
              >
                <div className="grid gap-4 py-4">
                  {Object.entries(selectedEmployee).map(([key, value]) => {
                    if (key !== 'status' && key !== 'errorDetails') {
                      return (
                        <div
                          key={key}
                          className="grid grid-cols-4 items-center gap-4"
                        >
                          <Label htmlFor={key} className="text-right">
                            {key}
                          </Label>
                          <Input
                            id={key}
                            value={value}
                            onChange={(e) =>
                              setSelectedEmployee({
                                ...selectedEmployee,
                                [key]: e.target.value
                              })
                            }
                            className="col-span-3"
                          />
                        </div>
                      );
                    }
                    return null;
                  })}
                </div>
                <DialogFooter>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setShowEditDialog(false)}
                  >
                    Cancel
                  </Button>
                  <Button type="submit">Save Changes</Button>
                </DialogFooter>
              </form>
            )}
          </DialogContent>
        </Dialog>

        <Dialog open={importedData.some((e) => e.status === 'Error')}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Import Errors</DialogTitle>
            </DialogHeader>
            <div className="max-h-[300px] overflow-y-auto">
              {importedData
                .filter((e) => e.status === 'Error')
                .map((employee) => (
                  <Alert key={employee.personelNumber} variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>
                      Error in record for {employee.firstName}{' '}
                      {employee.lastName}
                    </AlertTitle>
                    <AlertDescription>{employee.errorDetails}</AlertDescription>
                  </Alert>
                ))}
            </div>
            <DialogFooter>
              <Button
                onClick={() => {
                  setImportedData(
                    importedData.filter((e) => e.status !== 'Error')
                  );
                  toast({
                    title: 'Error Records Removed',
                    description:
                      'Records with errors have been removed from the import list.'
                  });
                }}
              >
                Remove Error Records
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </motion.div>
    </PageContainer>
  );
};

export default ImportManagement;

// in this page we will display the import management system such as the import of the data from the excel sheet which the template can be exported from here to because we will take account that excel format to accepting the candidate data and showing the data in the table format and we can see the data and we can edit the data and we can delete the data and we can add the data and we can import the data to system
// in addition to this we can see the import history and we can see the import status and we can see the import details and we can download the import details as pdf
// after import newly importing system checking the data and if there is any error in the data it will show the error and we can edit the data and we can import the data again
// and if the data valid it will show the data in the table format and we can see the data and we can edit the data and we can delete the data and we can add the data and we can import the data to system
// and after it we can create contract via the contract management system and we can generate the pdf via the contract management system
// and from here after saving can send the contract to the candidate via their email and can choose email template from the email template management system and can send the contract to the candidate.
// and we can see the contract status and we can change the contract status and we can see the contract history (contract status: sended, approved, rejected, signed, completed)
