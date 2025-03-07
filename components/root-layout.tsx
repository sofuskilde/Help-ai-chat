'use client'

import { Toaster } from 'react-hot-toast'
import { fontMono, fontSans } from '@/lib/fonts'
import { cn } from '@/lib/utils'
import { TailwindIndicator } from '@/components/tailwind-indicator'
import { Providers } from '@/components/providers'
import { Header } from '@/components/header'
import { usePathname } from 'next/navigation'
import { Session } from '@supabase/auth-helpers-nextjs'

interface RootLayoutProps {
  children: React.ReactNode
  session: Session | null
}

export function RootLayoutClient({ children, session }: RootLayoutProps) {
  const pathname = usePathname()
  const isAuthPage = pathname === '/sign-in' || pathname === '/sign-up'

  return (
    <>
      <Toaster />
      <Providers attribute="class" defaultTheme="system" enableSystem>
        <div className="flex min-h-screen flex-col">
          {!isAuthPage && <Header session={session} />}
          <main className={cn(
            "flex flex-1 flex-col",
            !isAuthPage && "bg-muted/50"
          )}>{children}</main>
        </div>
        <TailwindIndicator />
      </Providers>
    </>
  )
} 