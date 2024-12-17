import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Toaster } from '@/components/ui/sonner';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'TradeMind - Master Your Trading Psychology',
  description: 'Transform your trading performance with AI-powered insights and systematic journaling.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} dark bg-background text-foreground`}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}