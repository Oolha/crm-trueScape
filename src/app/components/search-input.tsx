'use client';
import { useState, useTransition } from 'react';
import Image from 'next/image';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';

export default function SearchInput() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const [search, setSearch] = useState(searchParams.get('search') || '');

  const debouncedSearch = useDebouncedCallback((value: string) => {
    const params = new URLSearchParams(searchParams);
    if (value) {
      params.set('search', value);
    } else {
      params.delete('search');
    }

    startTransition(() => {
      router.push(`${pathname}?${params.toString()}`);
    });
  }, 300);

  const handleSearch = () => {
    debouncedSearch(search);
  };
  return (
    <div className="relative w-96">
      <input
        type="text"
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          debouncedSearch(e.target.value);
        }}
        onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
        placeholder="Search companies..."
        className="text-sm flex-1 py-3 pl-3 pr-11 w-full h-11 rounded border border-gray-300 bg-gray-50"
      />
      <button
        type="button"
        className="absolute top-0 right-0 p-3"
        onClick={handleSearch}
        disabled={isPending}
      >
        <Image
          width={20}
          height={20}
          src="/icons/magnifying-glass.svg"
          alt="search icon"
        />
      </button>
      {isPending && (
        <div className="absolute right-12 top-3">
          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-gray-900" />
        </div>
      )}
    </div>
  );
}
