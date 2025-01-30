'use client';

import { useRouter } from 'next/navigation';
import PromotionFormModal from '@/app/components/promotion-form-modal';

interface PromotionFormModalWrapperProps {
  companyId: string;
}

export default function PromotionFormModalWrapper({
  companyId,
}: PromotionFormModalWrapperProps) {
  const router = useRouter();

  return (
    <PromotionFormModal
      companyId={companyId}
      show={true}
      onClose={() => router.back()}
    />
  );
}
