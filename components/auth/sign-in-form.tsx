import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { Icons } from "@/components/ui/icons"

export function SignInForm() {
  return (
    <div className="relative z-20">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-lg" />
      
      {/* Main container */}
      <div className="bg-card/50 backdrop-blur-xl rounded-lg border border-blue-500/10 shadow-xl p-8 relative space-y-6">
        {/* Header */}
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight text-blue-400">
            Welcome back
          </h1>
          <p className="text-sm text-muted-foreground">
            Enter your email and password to sign in to your account
          </p>
        </div>

        <div className="grid gap-4">
          {/* Social login buttons */}
          <div className="grid grid-cols-2 gap-6">
            <Button 
              variant="outline" 
              className="bg-background/50 border-blue-500/20 hover:bg-background/80 hover:border-blue-500/30 transition-colors"
            >
              <Icons.google className="mr-2 h-4 w-4" />
              Google
            </Button>
            <Button 
              variant="outline" 
              className="bg-background/50 border-blue-500/20 hover:bg-background/80 hover:border-blue-500/30 transition-colors"
            >
              <Icons.apple className="mr-2 h-4 w-4" />
              Apple
            </Button>
          </div>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-muted-foreground/20" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card/50 px-2 text-muted-foreground">
                Or continue with email
              </span>
            </div>
          </div>

          {/* Sign in form */}
          <form className="space-y-4">
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="text-sm text-muted-foreground/80 ml-1"
              >
                Email
              </label>
              <Input
                id="email"
                name="email-sign-in"
                type="email"
                placeholder="example@email.com"
                autoCapitalize="none"
                autoComplete="new-email"
                autoCorrect="off"
                defaultValue=""
                className="bg-background/50 border-blue-500/20 focus:border-blue-500/30 transition-colors"
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="text-sm text-muted-foreground/80 ml-1"
                >
                  Password
                </label>
                <Link
                  href="/forgot-password"
                  className="text-xs text-blue-400 hover:text-blue-300 transition-colors"
                >
                  Forgot password?
                </Link>
              </div>
              <Input
                id="password"
                name="password-sign-in"
                type="password"
                autoComplete="new-password"
                className="bg-background/50 border-blue-500/20 focus:border-blue-500/30 transition-colors"
              />
            </div>
            <Button className="w-full relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400/80 to-purple-400/80 group-hover:from-blue-400 group-hover:to-purple-400 transition-all duration-300" />
              <span className="relative text-white/90 group-hover:text-white">Sign In</span>
            </Button>
          </form>
        </div>

        {/* Footer */}
        <div className="text-center text-sm text-muted-foreground">
          Don't have an account?{" "}
          <Link
            href="/sign-up"
            className="text-blue-400 hover:text-blue-300 transition-colors"
          >
            Sign up
          </Link>
        </div>
      </div>
    </div>
  )
}
