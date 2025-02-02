import type { Metadata } from 'next';
import PromotionForm from '@/app/components/promotion-form';

type PageParams = { id: string };

export interface GenerateMetadata {
  params: PageParams;
}

export const metadata: Metadata = {
  title: 'New Promotion - CRM TrueScape',
};

export default function Page({ params }: { params: PageParams }) {
  return (
    <div className="py-6 px-10">
      <PromotionForm companyId={params.id} />
    </div>
  );
}
