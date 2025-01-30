import PromotionFormModalWrapper from './client';

export interface PageProps {
  params: { id: string };
}

export default function Page({ params }: PageProps) {
  return <PromotionFormModalWrapper companyId={params.id} />;
}
