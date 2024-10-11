import type { Metadata } from 'next';
import './globals.css';
import { manrope } from '@/utils';
import { ClerkProvider } from '@clerk/nextjs';
import { ThemeProvider } from '@/components/common/ThemeProvider';
import { Toaster } from 'sonner';

export const metadata: Metadata = {
  title: 'E-Learning System',
  description: 'Nền tảng học trực tuyến hàng đầu Việt Nam',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang='en' suppressHydrationWarning>
        <body className={manrope.className}>
          <ThemeProvider
            attribute='class'
            defaultTheme='system'
            enableSystem
            disableTransitionOnChange
          >
            {children}
            <Toaster richColors />
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
