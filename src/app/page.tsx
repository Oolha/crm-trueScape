'use client';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="relative flex flex-col items-center justify-center h-screen text-center bg-gradient animate-gradient text-white">
      <h1 className="text-5xl font-bold drop-shadow-lg">
        Welcome to CRM for Vendors
      </h1>
      <p className="text-lg mt-4 opacity-90">
        Manage vendors, promotions, and sales effortlessly.
      </p>
      <div className="mt-6 flex space-x-6">
        <Link
          href="/companies"
          className="px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 transition-transform transform hover:scale-105 shadow-lg"
        >
          Go to Companies
        </Link>
        <Link
          href="/dashboard"
          className="px-6 py-3 rounded-lg bg-green-500 hover:bg-green-600 transition-transform transform hover:scale-105 shadow-lg"
        >
          Go to Dashboard
        </Link>
      </div>
    </div>
  );
}
