'use client';

import React, { useState, useEffect } from 'react';
import { DocumentCard } from '@/app/dashboard/file/component';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';

interface Document {
  D_id: number;
  DocumentName: string;
  Type: string;
  Status: string;
  UploadDate: string;
}

export const DocumentManagementSystem: React.FC = () => {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('');

  useEffect(() => {
    // Simulating API call
    const mockDocuments: Document[] = [
      {
        D_id: 1301,
        DocumentName: 'CV',
        Type: 'pdf',
        Status: 'Uploaded',
        UploadDate: '09:00 AM'
      },
      {
        D_id: 1302,
        DocumentName: 'Cover Letter',
        Type: 'docx',
        Status: 'Blank',
        UploadDate: '-'
      },
      {
        D_id: 1303,
        DocumentName: 'Transcript',
        Type: 'jpeg',
        Status: 'Approved',
        UploadDate: '10:15 AM'
      },
      {
        D_id: 1304,
        DocumentName: 'Portfolio',
        Type: 'pptx',
        Status: 'Rejected',
        UploadDate: '09:00 AM'
      },
      {
        D_id: 1305,
        DocumentName: 'Reference Letter',
        Type: 'pdf',
        Status: 'Blank',
        UploadDate: '09:00 AM'
      },
      {
        D_id: 1306,
        DocumentName: 'Öğrenci Belgesi',
        Type: 'pdf',
        Status: 'Uploaded',
        UploadDate: '09:00 AM'
      }
    ];
    setDocuments(mockDocuments);
  }, []);

  const filteredDocuments = documents.filter(
    (doc) =>
      doc.DocumentName.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (filterType === '' || doc.Type === filterType)
  );

  return (
    <div className="mt-8">
      <div className="flex flex-col gap-4 sm:flex-row">
        <Input
          placeholder="Search documents..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-grow"
        />
        <Select onValueChange={setFilterType} value={filterType}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Filter by type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">All Types</SelectItem>
            <SelectItem value="pdf">PDF</SelectItem>
            <SelectItem value="docx">DOCX</SelectItem>
            <SelectItem value="jpeg">JPEG</SelectItem>
            <SelectItem value="pptx">PPTX</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="mb-52 mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredDocuments.map((doc) => (
          <DocumentCard key={doc.D_id} document={doc} />
        ))}
      </div>
    </div>
  );
};
