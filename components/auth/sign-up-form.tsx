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
import { passwordSchema } from "@/lib/validations/auth"

export function SignUpForm() {
  const { register, isLoading } = useAuth()
  const router = useRouter()
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    name: ""
  })
  const [showPasswords, setShowPasswords] = useState(false)
  const [passwordError, setPasswordError] = useState("")

  const validatePassword = (password: string) => {
    const result = passwordSchema.shape.password.safeParse(password)
    if (!result.success) {
      setPasswordError(result.error.errors[0].message)
      return false
    }
    setPasswordError("")
    return true
  }

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value
    setFormData(prev => ({ ...prev, password: newPassword }))
    validatePassword(newPassword)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Submitting with password:', formData.password)
    
    if (!validatePassword(formData.password)) {
      console.log('Password validation failed')
      return
    }
    
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match")
      return
    }
    
    const result = await register({
      email: formData.email,
      password: formData.password,
      name: formData.name,
      confirmPassword: formData.confirmPassword
    })
    
    if (result.success) {
      toast.success("Account created successfully!")
      setTimeout(() => {
        router.push("/dashboard")
      }, 1500)
    } else if (result.type === "EXISTING_ACCOUNT") {
      toast.error(result.message, {
        action: {
          label: "Sign In",
          onClick: () => router.push("/sign-in")
        }
      })
    } else {
      toast.error(result.message || "Something went wrong. Please try again.")
    }
  }

  return (
    <div className="relative">
      <div className="relative rounded-lg border border-blue-500/20 bg-background/95 backdrop-blur-sm shadow-2xl">
        <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-blue-500/10" />
        
        <div className="relative p-8 space-y-6">
          <div className="space-y-2 text-center">
            <h1 className="text-2xl font-bold tracking-tight bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Create an account
            </h1>
            <p className="text-sm text-muted-foreground">
              Enter your details to create your account
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
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

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  placeholder="Enter your name"
                  type="text"
                  autoCapitalize="words"
                  autoComplete="name"
                  className="bg-background/50 border-blue-500/20 focus:border-blue-500/30 focus:ring-blue-500/20"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  disabled={isLoading}
                />
              </div>

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
                    placeholder="Create a password"
                    type={showPasswords ? "text" : "password"}
                    autoComplete="new-password"
                    className="bg-background/50 border-blue-500/20 focus:border-blue-500/30 focus:ring-blue-500/20 pr-10"
                    value={formData.password}
                    onChange={handlePasswordChange}
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPasswords(!showPasswords)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showPasswords ? (
                      <Icons.eyeOff className="h-4 w-4" />
                    ) : (
                      <Icons.eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
                {passwordError && (
                  <p className="text-sm text-red-500 mt-1">{passwordError}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    placeholder="Confirm your password"
                    type={showPasswords ? "text" : "password"}
                    autoComplete="new-password"
                    className="bg-background/50 border-blue-500/20 focus:border-blue-500/30 focus:ring-blue-500/20 pr-10"
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                    disabled={isLoading}
                  />
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
              Create Account
            </Button>
          </form>

          <p className="text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link 
              href="/sign-in" 
              className="font-medium text-blue-400 hover:text-blue-300 hover:underline transition-colors"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
