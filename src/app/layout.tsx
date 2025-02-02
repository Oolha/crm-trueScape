import './globals.css';
import { Plus_Jakarta_Sans } from 'next/font/google';
import Providers from '@/app/components/providers';
import { Metadata } from 'next';
import { Toaster } from 'react-hot-toast';

const font = Plus_Jakarta_Sans({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'CRM TrueScape',
  other: {
    'grammarly-disable-editor': 'true',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/images/favicon.png"
        />
      </head>
      <body className={font.className} suppressHydrationWarning>
        <Providers>{children}</Providers>
        <Toaster 
          position="top-right"
          toastOptions={{
            duration: 3000,
            style: {
              background: '#363636',
              color: '#fff',
            },
            success: {
              style: {
                background: '#10B981',
              },
            },
            error: {
              style: {
                background: '#EF4444',
              },
            },
          }}
        />
      </body>
    </html>
  );
}
