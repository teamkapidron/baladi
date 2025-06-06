import '@/styles/globals.css';
import { Toaster } from '@repo/ui/components/base/sonner';
import ReactQueryProvider from '@/providers/react-query-provider';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Baladi Admin',
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body className="font-albert-sans">
        <ReactQueryProvider>
          <main>{children}</main>
          <Toaster richColors />
        </ReactQueryProvider>
      </body>
    </html>
  );
}
