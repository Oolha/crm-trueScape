'use client';

import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';
import { getCompanies } from '@/lib/api';
import CompanyRow from '@/app/components/company-row';

const headers = [
  'Category',
  'Company',
  'Status',
  'Promotion',
  'Country',
  'Joined date',
];

export default function CompanyTable() {
  const searchParams = useSearchParams();
  const search = searchParams.get('search') || '';
  const categoryId = searchParams.get('categoryId') || '';

  const { data, isLoading } = useQuery({
    queryKey: ['companies', { search, categoryId }],
    queryFn: () => getCompanies({ search, categoryId }),
    staleTime: 10 * 1000,
  });

  if (isLoading) {
    return <div className="py-8 px-10 bg-gray-100">Loading...</div>;
  }

  return (
    <div className="py-8 px-10 bg-gray-100">
      <table className="table-auto w-full border-separate border-spacing-y-2">
        <thead>
          <tr>
            {headers.map((header, i) => (
              <th key={i} className="pb-5 text-sm font-light text-gray-900">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data?.map((company) => (
            <CompanyRow key={company.id} company={company} />
          ))}
          {data?.length === 0 && (
            <tr>
              <td colSpan={6} className="text-center py-4 bg-white">
                No companies found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
