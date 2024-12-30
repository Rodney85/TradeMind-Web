import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { Icons } from "@/components/ui/icons"

export function SignUpForm() {
  return (
    <div className="relative z-20">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-lg" />
      <div className="bg-card/50 backdrop-blur-xl rounded-lg border border-blue-500/10 shadow-xl p-8 relative space-y-6">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight text-blue-400">
            Create an account
          </h1>
          <p className="text-sm text-muted-foreground">
            Enter your details below to create your account
          </p>
        </div>

        <div className="grid gap-4">
          <div className="grid grid-cols-2 gap-6">
            <Button variant="outline" className="bg-background/50 border-blue-500/20">
              <Icons.google className="mr-2 h-4 w-4" />
              Google
            </Button>
            <Button variant="outline" className="bg-background/50 border-blue-500/20">
              <Icons.apple className="mr-2 h-4 w-4" />
              Apple
            </Button>
          </div>

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

          <form className="space-y-4">
            <div className="space-y-2">
              <label
                htmlFor="name"
                className="text-sm text-muted-foreground/80 ml-1"
              >
                Full Name
              </label>
              <Input
                id="name"
                type="text"
                autoCapitalize="words"
                autoComplete="name"
                autoCorrect="off"
                className="bg-background/50 border-blue-500/20 focus:border-blue-500/30 transition-colors"
              />
            </div>
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="text-sm text-muted-foreground/80 ml-1"
              >
                Email
              </label>
              <Input
                id="email"
                name="email-sign-up"
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
              <label
                htmlFor="password"
                className="text-sm text-muted-foreground/80 ml-1"
              >
                Password
              </label>
              <Input
                id="password"
                type="password"
                autoComplete="new-password"
                className="bg-background/50 border-blue-500/20 focus:border-blue-500/30 transition-colors"
              />
            </div>
            <div className="space-y-2">
              <label
                htmlFor="confirm-password"
                className="text-sm text-muted-foreground/80 ml-1"
              >
                Confirm Password
              </label>
              <Input
                id="confirm-password"
                type="password"
                autoComplete="new-password"
                className="bg-background/50 border-blue-500/20 focus:border-blue-500/30 transition-colors"
              />
            </div>
            <Button className="w-full relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400/80 to-purple-400/80 group-hover:from-blue-400 group-hover:to-purple-400 transition-all duration-300" />
              <span className="relative text-white/90 group-hover:text-white">Create Account</span>
            </Button>
          </form>
        </div>

        <div className="text-center text-sm">
          <span className="text-muted-foreground">Already have an account? </span>
          <Link
            href="/sign-in"
            className="text-blue-400 hover:text-blue-300 transition-colors"
          >
            Sign in
          </Link>
        </div>
      </div>
    </div>
  )
}
