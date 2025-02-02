import { Metadata } from 'next';
import PromotionForm from '@/app/components/promotion-form';

interface PageProps {
  params: {
    id: string;
  };
}

export const metadata: Metadata = {
  title: 'New Promotion - CRM TrueScape',
};

export default function Page({ params }: PageProps) {
  return (
    <div className="py-6 px-10">
      <PromotionForm companyId={params.id} />
    </div>
  );
}
