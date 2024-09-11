// app/hr/document-management/page.tsx
'use client';

import React, { useState } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import * as TabsPrimitive from '@radix-ui/react-tabs';
import * as SelectPrimitive from '@radix-ui/react-select';
import { Check, ChevronDown, X } from 'lucide-react';
import {
  IconFile,
  IconCheck,
  IconX,
  IconClock,
  IconMail,
  IconAlertTriangle,
  IconUser,
  IconDownload,
  IconTrash,
  IconEye
} from '@tabler/icons-react';
import PageContainer from '@/components/layout/page-container';
// Utility function for class names

// Badge Component
const badgeVariants = cva(
  'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/80',
        secondary:
          'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        destructive:
          'bg-destructive text-destructive-foreground hover:bg-destructive/80',
        outline: 'text-foreground',
        success: 'bg-green text-white hover:bg-black',
        warning: 'bg-yellow-500 text-white hover:bg-yellow-600'
      }
    },
    defaultVariants: {
      variant: 'default'
    }
  }
);

interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

// Button Component
const Button = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, ...props }, ref) => {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
        'bg-primary text-primary-foreground hover:bg-primary/90',
        'h-10 px-4 py-2',
        className
      )}
      ref={ref}
      {...props}
    />
  );
});
Button.displayName = 'Button';

// Card Components
const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      'rounded-lg border bg-card text-card-foreground shadow-sm',
      className
    )}
    {...props}
  />
));
Card.displayName = 'Card';

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex flex-col space-y-1.5 p-6', className)}
    {...props}
  />
));
CardHeader.displayName = 'CardHeader';

const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      'text-2xl font-semibold leading-none tracking-tight',
      className
    )}
    {...props}
  />
));
CardTitle.displayName = 'CardTitle';

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('p-6 pt-0', className)} {...props} />
));
CardContent.displayName = 'CardContent';

// Table Components
const Table = React.forwardRef<
  HTMLTableElement,
  React.HTMLAttributes<HTMLTableElement>
>(({ className, ...props }, ref) => (
  <div className="w-full overflow-auto">
    <table
      ref={ref}
      className={cn('w-full caption-bottom text-sm', className)}
      {...props}
    />
  </div>
));
Table.displayName = 'Table';

const TableHeader = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <thead ref={ref} className={cn('[&_tr]:border-b', className)} {...props} />
));
TableHeader.displayName = 'TableHeader';

const TableBody = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tbody
    ref={ref}
    className={cn('[&_tr:last-child]:border-0', className)}
    {...props}
  />
));
TableBody.displayName = 'TableBody';

const TableRow = React.forwardRef<
  HTMLTableRowElement,
  React.HTMLAttributes<HTMLTableRowElement>
>(({ className, ...props }, ref) => (
  <tr
    ref={ref}
    className={cn(
      'border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted',
      className
    )}
    {...props}
  />
));
TableRow.displayName = 'TableRow';

const TableHead = React.forwardRef<
  HTMLTableCellElement,
  React.ThHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <th
    ref={ref}
    className={cn(
      'h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0',
      className
    )}
    {...props}
  />
));
TableHead.displayName = 'TableHead';

const TableCell = React.forwardRef<
  HTMLTableCellElement,
  React.TdHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <td
    ref={ref}
    className={cn('p-4 align-middle [&:has([role=checkbox])]:pr-0', className)}
    {...props}
  />
));
TableCell.displayName = 'TableCell';

// Select Components
const Select = SelectPrimitive.Root;
const SelectGroup = SelectPrimitive.Group;
const SelectValue = SelectPrimitive.Value;

const SelectTrigger = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Trigger
    ref={ref}
    className={cn(
      'flex h-10 w-full items-center justify-between rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
      className
    )}
    {...props}
  >
    {children}
    <ChevronDown className="h-4 w-4 opacity-50" />
  </SelectPrimitive.Trigger>
));
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName;

const SelectContent = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content>
>(({ className, children, position = 'popper', ...props }, ref) => (
  <SelectPrimitive.Portal>
    <SelectPrimitive.Content
      ref={ref}
      className={cn(
        'relative z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md animate-in fade-in-80',
        position === 'popper' && 'translate-y-1',
        className
      )}
      position={position}
      {...props}
    >
      <SelectPrimitive.Viewport
        className={cn(
          'p-1',
          position === 'popper' &&
            'h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]'
        )}
      >
        {children}
      </SelectPrimitive.Viewport>
    </SelectPrimitive.Content>
  </SelectPrimitive.Portal>
));
SelectContent.displayName = SelectPrimitive.Content.displayName;

const SelectItem = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Item
    ref={ref}
    className={cn(
      'relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
      className
    )}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <SelectPrimitive.ItemIndicator>
        <Check className="h-4 w-4" />
      </SelectPrimitive.ItemIndicator>
    </span>
    <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
  </SelectPrimitive.Item>
));
SelectItem.displayName = SelectPrimitive.Item.displayName;

// Modal Component
const Modal = ({
  isOpen,
  onClose,
  children
}: {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="max-h-[90vh] w-full max-w-2xl overflow-auto rounded-lg bg-white p-6">
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X size={24} />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

// Types
interface Document {
  id: number;
  name: string;
  status: 'approved' | 'rejected' | 'pending';
  uploadDate: string;
  fileUrl: string;
}

interface Candidate {
  id: string;
  name: string;
  position: string;
  overallStatus: 'Complete' | 'Incomplete' | 'Rejected';
  documents: Document[];
}

// Generate 10 more dummy data
const candidatesData: Candidate[] = [
  {
    id: '1',
    name: 'John Doe',
    position: 'Software Developer',
    overallStatus: 'Incomplete',
    documents: [
      {
        id: 101,
        name: 'Resume',
        status: 'approved',
        uploadDate: '2024-03-01',
        fileUrl: '/path/to/john_resume.pdf'
      },
      {
        id: 102,
        name: 'Cover Letter',
        status: 'pending',
        uploadDate: '2024-03-02',
        fileUrl: '/path/to/john_cover_letter.pdf'
      },
      {
        id: 103,
        name: 'Diploma',
        status: 'pending',
        uploadDate: '2024-03-03',
        fileUrl: '/path/to/john_diploma.pdf'
      }
    ]
  },
  {
    id: '2',
    name: 'Jane Smith',
    position: 'UX Designer',
    overallStatus: 'Complete',
    documents: [
      {
        id: 201,
        name: 'Portfolio',
        status: 'approved',
        uploadDate: '2024-03-04',
        fileUrl: '/path/to/jane_portfolio.pdf'
      },
      {
        id: 202,
        name: 'References',
        status: 'approved',
        uploadDate: '2024-03-05',
        fileUrl: '/path/to/jane_references.pdf'
      },
      {
        id: 203,
        name: 'Certifications',
        status: 'approved',
        uploadDate: '2024-03-06',
        fileUrl: '/path/to/jane_certifications.pdf'
      }
    ]
  },
  {
    id: '3',
    name: 'Alice Johnson',
    position: 'Data Analyst',
    overallStatus: 'Incomplete',
    documents: [
      {
        id: 301,
        name: 'Resume',
        status: 'approved',
        uploadDate: '2024-03-07',
        fileUrl: '/path/to/alice_resume.pdf'
      },
      {
        id: 302,
        name: 'Cover Letter',
        status: 'rejected',
        uploadDate: '2024-03-08',
        fileUrl: '/path/to/alice_cover_letter.pdf'
      },
      {
        id: 303,
        name: 'Project Samples',
        status: 'pending',
        uploadDate: '2024-03-09',
        fileUrl: '/path/to/alice_project_samples.pdf'
      }
    ]
  },
  {
    id: '4',
    name: 'Bob Williams',
    position: 'Marketing Manager',
    overallStatus: 'Rejected',
    documents: [
      {
        id: 401,
        name: 'Resume',
        status: 'approved',
        uploadDate: '2024-03-10',
        fileUrl: '/path/to/bob_resume.pdf'
      },
      {
        id: 402,
        name: 'Cover Letter',
        status: 'rejected',
        uploadDate: '2024-03-11',
        fileUrl: '/path/to/bob_cover_letter.pdf'
      },
      {
        id: 403,
        name: 'Marketing Campaign Examples',
        status: 'rejected',
        uploadDate: '2024-03-12',
        fileUrl: '/path/to/bob_campaign_examples.pdf'
      }
    ]
  },
  {
    id: '5',
    name: 'Emma Davis',
    position: 'HR Specialist',
    overallStatus: 'Complete',
    documents: [
      {
        id: 501,
        name: 'Resume',
        status: 'approved',
        uploadDate: '2024-03-13',
        fileUrl: '/path/to/emma_resume.pdf'
      },
      {
        id: 502,
        name: 'Cover Letter',
        status: 'approved',
        uploadDate: '2024-03-14',
        fileUrl: '/path/to/emma_cover_letter.pdf'
      },
      {
        id: 503,
        name: 'HR Certifications',
        status: 'approved',
        uploadDate: '2024-03-15',
        fileUrl: '/path/to/emma_certifications.pdf'
      }
    ]
  },
  {
    id: '6',
    name: 'Michael Brown',
    position: 'Financial Analyst',
    overallStatus: 'Incomplete',
    documents: [
      {
        id: 601,
        name: 'Resume',
        status: 'approved',
        uploadDate: '2024-03-16',
        fileUrl: '/path/to/michael_resume.pdf'
      },
      {
        id: 602,
        name: 'Cover Letter',
        status: 'approved',
        uploadDate: '2024-03-17',
        fileUrl: '/path/to/michael_cover_letter.pdf'
      },
      {
        id: 603,
        name: 'Financial Models',
        status: 'pending',
        uploadDate: '2024-03-18',
        fileUrl: '/path/to/michael_financial_models.xlsx'
      }
    ]
  },
  {
    id: '7',
    name: 'Sophia Lee',
    position: 'Product Manager',
    overallStatus: 'Complete',
    documents: [
      {
        id: 701,
        name: 'Resume',
        status: 'approved',
        uploadDate: '2024-03-19',
        fileUrl: '/path/to/sophia_resume.pdf'
      },
      {
        id: 702,
        name: 'Cover Letter',
        status: 'approved',
        uploadDate: '2024-03-20',
        fileUrl: '/path/to/sophia_cover_letter.pdf'
      },
      {
        id: 703,
        name: 'Product Roadmap Sample',
        status: 'approved',
        uploadDate: '2024-03-21',
        fileUrl: '/path/to/sophia_product_roadmap.pdf'
      }
    ]
  },
  {
    id: '8',
    name: 'David Wilson',
    position: 'Sales Representative',
    overallStatus: 'Incomplete',
    documents: [
      {
        id: 801,
        name: 'Resume',
        status: 'approved',
        uploadDate: '2024-03-22',
        fileUrl: '/path/to/david_resume.pdf'
      },
      {
        id: 802,
        name: 'Cover Letter',
        status: 'pending',
        uploadDate: '2024-03-23',
        fileUrl: '/path/to/david_cover_letter.pdf'
      },
      {
        id: 803,
        name: 'Sales Performance Records',
        status: 'pending',
        uploadDate: '2024-03-24',
        fileUrl: '/path/to/david_sales_records.pdf'
      }
    ]
  },
  {
    id: '9',
    name: 'Olivia Martinez',
    position: 'Legal Counsel',
    overallStatus: 'Complete',
    documents: [
      {
        id: 901,
        name: 'Resume',
        status: 'approved',
        uploadDate: '2024-03-25',
        fileUrl: '/path/to/olivia_resume.pdf'
      },
      {
        id: 902,
        name: 'Cover Letter',
        status: 'approved',
        uploadDate: '2024-03-26',
        fileUrl: '/path/to/olivia_cover_letter.pdf'
      },
      {
        id: 903,
        name: 'Bar Certification',
        status: 'approved',
        uploadDate: '2024-03-27',
        fileUrl: '/path/to/olivia_bar_certification.pdf'
      }
    ]
  },
  {
    id: '10',
    name: 'Ethan Taylor',
    position: 'Systems Administrator',
    overallStatus: 'Incomplete',
    documents: [
      {
        id: 1001,
        name: 'Resume',
        status: 'approved',
        uploadDate: '2024-03-28',
        fileUrl: '/path/to/ethan_resume.pdf'
      },
      {
        id: 1002,
        name: 'Cover Letter',
        status: 'rejected',
        uploadDate: '2024-03-29',
        fileUrl: '/path/to/ethan_cover_letter.pdf'
      },
      {
        id: 1003,
        name: 'Technical Certifications',
        status: 'pending',
        uploadDate: '2024-03-30',
        fileUrl: '/path/to/ethan_certifications.pdf'
      }
    ]
  }
];

// Main Component
export default function HRDocumentManagement() {
  const [candidates, setCandidates] = useState<Candidate[]>(candidatesData);
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(
    null
  );
  const [previewDocument, setPreviewDocument] = useState<Document | null>(null);

  const updateDocumentStatus = (
    candidateId: string,
    docId: number,
    newStatus: 'approved' | 'rejected' | 'pending'
  ) => {
    setCandidates((prevCandidates) =>
      prevCandidates.map((candidate) =>
        candidate.id === candidateId
          ? {
              ...candidate,
              documents: candidate.documents.map((doc) =>
                doc.id === docId ? { ...doc, status: newStatus } : doc
              ),
              overallStatus: candidate.documents.every(
                (doc) => doc.status === 'approved'
              )
                ? 'Complete'
                : 'Incomplete'
            }
          : candidate
      )
    );
  };

  const handleBulkApprove = (candidateId: string) => {
    setCandidates((prevCandidates) =>
      prevCandidates.map((candidate) =>
        candidate.id === candidateId
          ? {
              ...candidate,
              documents: candidate.documents.map((doc) => ({
                ...doc,
                status: 'approved'
              })),
              overallStatus: 'Complete'
            }
          : candidate
      )
    );
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Complete':
        return 'success';
      case 'Incomplete':
        return 'warning';
      case 'Rejected':
        return 'destructive';
      default:
        return 'default';
    }
  };

  const getStatusIcon = (status: 'approved' | 'rejected' | 'pending') => {
    switch (status) {
      case 'approved':
        return <IconCheck className="text-green-500" />;
      case 'rejected':
        return <IconX className="text-red-500" />;
      case 'pending':
        return <IconClock className="text-yellow-500" />;
    }
  };

  const handlePreviewDocument = (document: Document) => {
    setPreviewDocument(document);
  };

  const handleDownloadDocument = (document: Document) => {
    // In a real application, this would trigger a download
    console.log(`Downloading document: ${document.name}`);
    // You might use something like this in a real scenario:
    // window.open(document.fileUrl, '_blank');
  };

  const handleDeleteDocument = (candidateId: string, docId: number) => {
    setCandidates((prevCandidates) =>
      prevCandidates.map((candidate) =>
        candidate.id === candidateId
          ? {
              ...candidate,
              documents: candidate.documents.filter((doc) => doc.id !== docId)
            }
          : candidate
      )
    );
  };

  return (
    <PageContainer scrollable={true}>
      <div className="bg-gray-100 min-h-screen p-4 sm:p-6 lg:p-8">
        <h1 className="mb-6 text-3xl font-bold">HR Document Management</h1>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Candidates Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Position</TableHead>
                    <TableHead>Document Status</TableHead>
                    <TableHead>Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {candidates.map((candidate) => (
                    <TableRow
                      key={candidate.id}
                      className="hover:bg-gray-100 cursor-pointer"
                      onClick={() => setSelectedCandidate(candidate)}
                    >
                      <TableCell>{candidate.name}</TableCell>
                      <TableCell>{candidate.position}</TableCell>
                      <TableCell>
                        <Badge
                          variant={getStatusColor(candidate.overallStatus)}
                        >
                          {candidate.overallStatus}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedCandidate(candidate);
                          }}
                        >
                          View Documents
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {selectedCandidate && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-2xl font-bold">
                <IconUser className="mr-2" />
                {selectedCandidate.name} - Document Management
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-4 flex flex-col items-start justify-between space-y-4 sm:flex-row sm:items-center sm:space-y-0">
                <div>
                  <p className="text-gray-600">{selectedCandidate.position}</p>
                  <Badge
                    variant={getStatusColor(selectedCandidate.overallStatus)}
                    className="mt-2"
                  >
                    {selectedCandidate.overallStatus}
                  </Badge>
                </div>
                <div className="space-y-2 sm:space-x-2 sm:space-y-0">
                  <Button
                    onClick={() => handleBulkApprove(selectedCandidate.id)}
                    className="bg-green-500 hover:bg-green-600 w-full text-white sm:w-auto"
                  >
                    Approve All & Proceed to Contract
                  </Button>
                  <Button
                    onClick={() => {
                      /* Implement missing documents reminder logic */
                    }}
                    className="w-full bg-yellow-500 text-white hover:bg-yellow-600 sm:w-auto"
                  >
                    <IconAlertTriangle className="mr-2" />
                    Send Missing Documents Reminder
                  </Button>
                </div>
              </div>

              <div className="mb-6">
                <p className="text-gray-500 mb-1 text-sm">
                  Document Completion Progress
                </p>
                <div className="bg-gray-200 dark:bg-gray-700 h-2.5 w-full rounded-full">
                  <div
                    className="h-2.5 rounded-full bg-blue-600"
                    style={{
                      width: `${
                        (selectedCandidate.documents.filter(
                          (doc) => doc.status === 'approved'
                        ).length /
                          selectedCandidate.documents.length) *
                        100
                      }%`
                    }}
                  ></div>
                </div>
              </div>

              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Document</TableHead>
                      <TableHead>Upload Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {selectedCandidate.documents.map((doc) => (
                      <TableRow key={doc.id}>
                        <TableCell className="font-medium">
                          <div className="flex items-center">
                            <IconFile className="mr-2" />
                            {doc.name}
                          </div>
                        </TableCell>
                        <TableCell>{doc.uploadDate}</TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              doc.status === 'approved'
                                ? 'success'
                                : doc.status === 'rejected'
                                ? 'destructive'
                                : 'warning'
                            }
                            className="flex items-center"
                          >
                            {getStatusIcon(doc.status)}
                            <span className="ml-1 capitalize">
                              {doc.status}
                            </span>
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button
                              onClick={() => handlePreviewDocument(doc)}
                              className="bg-blue-500 hover:bg-blue-600"
                            >
                              <IconEye size={18} />
                            </Button>
                            <Button
                              onClick={() => handleDownloadDocument(doc)}
                              className="bg-green-500 hover:bg-green-600"
                            >
                              <IconDownload size={18} />
                            </Button>
                            <Button
                              onClick={() =>
                                handleDeleteDocument(
                                  selectedCandidate.id,
                                  doc.id
                                )
                              }
                              className="bg-red-500 hover:bg-red-600"
                            >
                              <IconTrash size={18} />
                            </Button>
                            <Select
                              onValueChange={(value) =>
                                updateDocumentStatus(
                                  selectedCandidate.id,
                                  doc.id,
                                  value as 'approved' | 'rejected' | 'pending'
                                )
                              }
                            >
                              <SelectTrigger className="w-[120px]">
                                <SelectValue placeholder="Status" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="approved">
                                  Approve
                                </SelectItem>
                                <SelectItem value="rejected">Reject</SelectItem>
                                <SelectItem value="pending">Pending</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Document Preview Modal */}
        <Modal
          isOpen={!!previewDocument}
          onClose={() => setPreviewDocument(null)}
        >
          {previewDocument && (
            <div>
              <h2 className="mb-4 text-2xl font-bold">
                {previewDocument.name}
              </h2>
              <div className="bg-gray-100 rounded p-4">
                {/* In a real application, you would render the actual document content here */}
                {/* This could be an embedded PDF viewer, image, or formatted text */}
                <p>Document preview for {previewDocument.name}</p>
                <p>Status: {previewDocument.status}</p>
                <p>Upload Date: {previewDocument.uploadDate}</p>
              </div>
            </div>
          )}
        </Modal>
      </div>
    </PageContainer>
  );
}
