import Toolbar from '@/app/components/toolbar';
import SearchInput from '@/app/components/search-input';
import AddCompanyButton from '@/app/components/add-company-button';
import { Suspense } from 'react';

export default function Page({}) {
  return (
    <Toolbar action={<AddCompanyButton />}>
      <Suspense fallback={<div>Loading...</div>}>
        <SearchInput />
      </Suspense>
    </Toolbar>
  );
}
