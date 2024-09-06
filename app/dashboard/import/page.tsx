import React from 'react';
import ImportManagement from '@/app/dashboard/import/ImportManagement';
export default function ContractPage() {
  return (
    <div className="min-h-screen">
      <div className="h-screen overflow-auto">
        <ImportManagement />
        <div className="h-20"></div>
      </div>
    </div>
  );
}
