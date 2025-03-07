'use client'

import * as React from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

import { cn } from '@/lib/utils'
import { Button, type ButtonProps } from '@/components/ui/button'
import { IconGitHub, IconSpinner } from '@/components/ui/icons'

interface LoginButtonProps extends ButtonProps {
  showGithubIcon?: boolean
  text?: string
  provider?: 'github' | 'google'
}

export function LoginButton({
  text,
  showGithubIcon = true,
  className,
  provider = 'github',
  ...props
}: LoginButtonProps) {
  const [isLoading, setIsLoading] = React.useState(false)
  const supabase = createClientComponentClient()

  const handleSignIn = async () => {
    setIsLoading(true)
    await supabase.auth.signInWithOAuth({
      provider,
      options: { redirectTo: `${location.origin}/api/auth/callback` }
    })
  }

  if ((provider === 'github' && process.env.NEXT_PUBLIC_AUTH_GITHUB !== 'true') ||
      (provider === 'google' && process.env.NEXT_PUBLIC_AUTH_GOOGLE !== 'true')) {
    return null
  }

  return (
    <Button
      variant="outline"
      onClick={handleSignIn}
      disabled={isLoading}
      className={cn('w-full', className)}
      {...props}
    >
      {isLoading ? (
        <IconSpinner className="mr-2 animate-spin" />
      ) : showGithubIcon && provider === 'github' ? (
        <IconGitHub className="mr-2" />
      ) : null}
      {text || `Sign in with ${provider.charAt(0).toUpperCase() + provider.slice(1)}`}
    </Button>
  )
}
