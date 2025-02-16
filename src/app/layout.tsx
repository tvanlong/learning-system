import './globals.scss'

import { ClerkProvider } from '@clerk/nextjs'
import type { Metadata } from 'next'
import NextTopLoader from 'nextjs-toploader'
import { Toaster } from 'sonner'

import { ThemeProvider } from '@/components/common/theme-provider'
import { manrope } from '@/utils'

export const metadata: Metadata = {
  title: 'E-Learning System',
  description: 'Nền tảng học trực tuyến hàng đầu Việt Nam'
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ClerkProvider>
      <html lang='en' suppressHydrationWarning>
        <body className={manrope.className}>
          <ThemeProvider attribute='class' defaultTheme='system' enableSystem disableTransitionOnChange>
            <NextTopLoader color='#8873EF' />
            {children}
            <Toaster richColors position='top-right' />
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}
