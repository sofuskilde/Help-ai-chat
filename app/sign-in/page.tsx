import { auth } from '@/auth'
import { LoginButton } from '@/components/login-button'
import { LoginForm } from '@/components/login-form'
import { Separator } from '@/components/ui/separator'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export default async function SignInPage() {
  const cookieStore = cookies()
  const session = await auth({ cookieStore })
  // redirect to home if user is already logged in
  if (session?.user) {
    redirect('/')
  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="w-full max-w-sm space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-semibold tracking-tight">Welcome back</h1>
          <p className="text-sm text-muted-foreground">Sign in to your account</p>
        </div>
        
        <LoginForm action="sign-in" />
        <Separator className="my-4" />
        <div className="flex flex-col gap-2 items-center">
          <LoginButton provider="google" text="Continue with Google" showGithubIcon={false} className="w-full" />
          <LoginButton provider="github" text="Continue with GitHub" className="w-full" />
        </div>
      </div>
    </div>
  )
}
