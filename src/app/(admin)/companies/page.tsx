import CompanyTable from '@/app/components/company-table';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { getCompanies } from '@/lib/api';
import getQueryClient from '@/lib/utils/getQueryClient';
import { Suspense } from 'react';

export default async function Page({}) {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery({
    queryKey: ['companies'],
    queryFn: () => getCompanies({ cache: 'no-store' }),
    staleTime: 10 * 1000,
  });
  const dehydratedState = dehydrate(queryClient);
  return (
    <HydrationBoundary state={dehydratedState}>
      <Suspense
        fallback={
          <div className="py-8 px-10 bg-gray-100">
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
              <span className="ml-2">Loading companies...</span>
            </div>
          </div>
        }
      >
        <CompanyTable />
      </Suspense>
    </HydrationBoundary>
  );
}
