import '@/styles/globals.css';
import { Toaster } from '@repo/ui/components/sonner';
import type { Metadata } from 'next';
import ReactQueryProvider from '@/providers/react-query-provider';

export const metadata: Metadata = {
  title: 'Baladi',
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body>
        <ReactQueryProvider>
          <main>{children}</main>
          <Toaster />
        </ReactQueryProvider>
      </body>
    </html>
  );
}
