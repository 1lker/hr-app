import React from 'react';
import PageContainer from '@/components/layout/page-container';
import ContractManagement from '@/app/dashboard/contract/ContractManagement';

export default function ContractPage() {
  return (
    <div className="min-h-screen">
      <div className="h-screen overflow-auto">
        <ContractManagement />
        <div className="h-20"></div>
      </div>
    </div>
  );
}

/**
 * in this page we will display the contract management system
 * from the candidate list we can see the their details and via selecting the candidate we can see the contract details or we can create a new contract for them via the contract management system and in this system we will generate a pdf via their personal & job credentials if there is a contract already created for the candidate we can see the contract details and we can edit the contract details and we can download the contract as pdf
 * in addition to this we can see the contract status and we can change the contract status and we can see the contract history (contract status: sended, approved, rejected, signed, completed)
 * in addition to al via selecting from the user list the hr can send their already designed or created contracts to them to their emails.
 */
