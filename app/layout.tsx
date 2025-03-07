import { Metadata } from 'next'
import { RootLayoutClient } from '@/components/root-layout'
import { fontMono, fontSans } from '@/lib/fonts'
import { cn } from '@/lib/utils'
import '@/app/globals.css'
import { auth } from '@/auth'
import { cookies } from 'next/headers'

export const metadata: Metadata = {
  title: {
    default: 'AI Chat Assistant',
    template: `%s - AI Chat Assistant`
  },
  description: 'An AI-powered chatbot built with Next.js.',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' }
  ],
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png'
  }
}

interface RootLayoutProps {
  children: React.ReactNode
}

export default async function RootLayout({ children }: RootLayoutProps) {
  const cookieStore = cookies()
  const session = await auth({ cookieStore })

  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body className={cn('font-sans antialiased', fontSans.variable, fontMono.variable)}>
        <RootLayoutClient session={session}>{children}</RootLayoutClient>
      </body>
    </html>
  )
}
