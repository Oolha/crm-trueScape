import { use } from 'react';
import PromotionModalClient from './client';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function Page({ params }: PageProps) {
  const { id } = use(params);

  return <PromotionModalClient companyId={id} />;
}
