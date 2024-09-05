'use client';

// app/dashboard/candidate/page.tsx
import { Breadcrumbs } from '@/components/breadcrumbs';
import PageContainer from '@/components/layout/page-container';
import { columns } from '@/components/tables/candidate-tables/columns';
import { CandidateTable } from '@/components/tables/candidate-tables/candidate-table';
import { buttonVariants } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { Plus } from 'lucide-react';
import Link from 'next/link';
import { dummyCandidates } from '@/lib/dummy-data';

const breadcrumbItems = [
  { title: 'Dashboard', link: '/dashboard' },
  { title: 'Candidate', link: '/dashboard/candidate' }
];

type ParamsProps = {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
};

export default function CandidatePage({ searchParams }: ParamsProps) {
  const page = Number(searchParams.page) || 1;
  const pageLimit = Number(searchParams.limit) || 10;
  const search = searchParams.search as string | undefined;

  // In a real application, you would fetch data from an API here
  // For now, we'll use the dummy data and perform client-side filtering and pagination
  let filteredCandidates = dummyCandidates;
  if (search) {
    filteredCandidates = dummyCandidates.filter(
      (candidate) =>
        candidate.firstName.toLowerCase().includes(search.toLowerCase()) ||
        candidate.lastName.toLowerCase().includes(search.toLowerCase()) ||
        candidate.email.toLowerCase().includes(search.toLowerCase())
    );
  }

  const totalCandidates = filteredCandidates.length;
  const pageCount = Math.ceil(totalCandidates / pageLimit);

  const paginatedCandidates = filteredCandidates.slice(
    (page - 1) * pageLimit,
    page * pageLimit
  );

  return (
    <PageContainer>
      <div className="space-y-4">
        <Breadcrumbs items={breadcrumbItems} />

        <div className="flex items-start justify-between">
          <Heading
            title={`Candidates (${totalCandidates})`}
            description="Manage candidate applications and information."
          />

          <Link
            href={'/dashboard/candidate/new'}
            className={cn(buttonVariants({ variant: 'default' }))}
          >
            <Plus className="mr-2 h-4 w-4" /> Add New
          </Link>
        </div>
        <Separator />

        <CandidateTable
          searchKey="lastName"
          pageNo={page}
          columns={columns}
          totalCandidates={totalCandidates}
          data={paginatedCandidates}
          pageCount={pageCount}
        />
      </div>
    </PageContainer>
  );
}
