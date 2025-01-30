import PromotionForm from '@/app/components/promotion-form';

export interface PageProps {
  params: { id: string };
}
export default async function Page({ params }: PageProps) {
  return (
    <div className="py-6 px-10">
      <PromotionForm companyId={params.id} />
    </div>
  );
}
