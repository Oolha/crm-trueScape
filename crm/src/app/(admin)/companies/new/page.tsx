'use client';
import CompanyForm from '@/app/components/company-form';

interface PageProps {}

const Page = ({}: PageProps) => {
  return (
    <div className="py-6  px-10">
      <CompanyForm onSubmit={console.log} />
    </div>
  );
};

export default Page;
