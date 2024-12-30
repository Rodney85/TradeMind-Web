"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { Icons } from "@/components/ui/icons"
import { useAuth } from "@/hooks/useAuth"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { Label } from "@/components/ui/label"

export function SignInForm() {
  const { login, isLoading } = useAuth()
  const router = useRouter()
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  })
  const [showPassword, setShowPassword] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const result = await login(formData)
    
    if (result.success) {
      toast.success("Logged in successfully")
      router.push("/dashboard")
    } else {
      toast.error(result.message)
    }
  }

  return (
    <div className="relative">
      {/* Card container with gradient border */}
      <div className="relative rounded-lg border border-blue-500/20 bg-background/95 backdrop-blur-sm shadow-2xl">
        <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-blue-500/10" />
        
        <div className="relative p-8 space-y-6">
          {/* Header */}
          <div className="space-y-2 text-center">
            <h1 className="text-2xl font-bold tracking-tight bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Welcome back
            </h1>
            <p className="text-sm text-muted-foreground">
              Enter your email and password to sign in to your account
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Social login buttons */}
            <div className="grid grid-cols-2 gap-4">
              <Button 
                type="button"
                variant="outline" 
                className="bg-background/50 border-blue-500/20 hover:bg-blue-500/10 transition-colors"
                disabled={isLoading}
              >
                <Icons.google className="mr-2 h-4 w-4" />
                Google
              </Button>
              <Button 
                type="button"
                variant="outline" 
                className="bg-background/50 border-blue-500/20 hover:bg-blue-500/10 transition-colors"
                disabled={isLoading}
              >
                <Icons.apple className="mr-2 h-4 w-4" />
                Apple
              </Button>
            </div>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-blue-500/20" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background/95 px-2 text-muted-foreground">
                  Or continue with email
                </span>
              </div>
            </div>

            {/* Form fields */}
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  placeholder="name@example.com"
                  type="email"
                  autoCapitalize="none"
                  autoComplete="email"
                  autoCorrect="off"
                  className="bg-background/50 border-blue-500/20 focus:border-blue-500/30 focus:ring-blue-500/20"
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  disabled={isLoading}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    placeholder="Enter your password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    className="bg-background/50 border-blue-500/20 focus:border-blue-500/30 focus:ring-blue-500/20 pr-10"
                    value={formData.password}
                    onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showPassword ? (
                      <Icons.eyeOff className="h-4 w-4" />
                    ) : (
                      <Icons.eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>
            </div>

            <Button 
              type="submit" 
              className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white shadow-lg"
              disabled={isLoading}
            >
              {isLoading && (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              )}
              Sign In
            </Button>
          </form>

          {/* Footer */}
          <p className="text-center text-sm text-muted-foreground">
            Don&apos;t have an account?{" "}
            <Link 
              href="/sign-up" 
              className="font-medium text-blue-400 hover:text-blue-300 hover:underline transition-colors"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
