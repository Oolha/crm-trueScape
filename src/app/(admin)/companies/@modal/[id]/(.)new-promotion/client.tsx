'use client';

import { useRouter } from 'next/navigation';
import PromotionFormModal from '@/app/components/promotion-form-modal';

interface PromotionModalClientProps {
  companyId: string;
}

export default function PromotionModalClient({
  companyId,
}: PromotionModalClientProps) {
  const router = useRouter();

  return (
    <PromotionFormModal
      companyId={companyId}
      show={true}
      onClose={() => router.back()}
    />
  );
}
