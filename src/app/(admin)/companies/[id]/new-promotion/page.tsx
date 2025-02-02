import type { Metadata } from 'next';
import PromotionForm from '@/app/components/promotion-form';

export type GenerateMetadata = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export const metadata: Metadata = {
  title: 'New Promotion - CRM TrueScape',
};

export default function Page({
  params,
}: {
  params: { id: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  return (
    <div className="py-6 px-10">
      <PromotionForm companyId={params.id} />
    </div>
  );
}
