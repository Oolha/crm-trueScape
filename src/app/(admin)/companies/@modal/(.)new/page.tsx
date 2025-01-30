'use client';

import CompanyFormModal from '@/app/components/company-form-modal';
import { useRouter } from 'next/navigation';

export default function Page({}) {
  const router = useRouter();

  return <CompanyFormModal show={true} onClose={() => router.back()} />;
}
