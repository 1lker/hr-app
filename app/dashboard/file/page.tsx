// pages/documents.tsx
import React from 'react';
import { DocumentManagementSystem } from '@/app/dashboard/file/comp2';
import PageContainer from '@/components/layout/page-container';

export default function DocumentsPage() {
  return (
    <PageContainer>
      <div className="min-h-screen">
        <main className="container mx-auto py-10">
          <h1 className="mb-10 text-center text-4xl font-bold text-gray-800 dark:text-gray-100">
            Document Management System
          </h1>
          <div className="h-screen overflow-auto">
            <DocumentManagementSystem />
          </div>
        </main>
      </div>
    </PageContainer>
  );
}
