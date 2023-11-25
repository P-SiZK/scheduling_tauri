'use client';

import { Loading } from '@/components/ui/Loading';
import useWindowMenuListen from '@/hooks/useWindowMenuListen';
import RSPCProvider from '@/lib/rspcProvider';
import { Inter } from 'next/font/google';
import { Suspense } from 'react';

import '@/styles/globals.css';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: React.PropsWithChildren) {
  useWindowMenuListen();

  return (
    <html lang="ja">
      <body className={inter.className}>
        <Suspense fallback={<Loading />}>
          <RSPCProvider>{children}</RSPCProvider>
        </Suspense>
      </body>
    </html>
  );
}
