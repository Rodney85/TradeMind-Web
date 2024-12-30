"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Icons } from "@/components/ui/icons"
import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { toast } from "sonner"
import { Label } from "@/components/ui/label"
import { passwordSchema } from "@/lib/validations/auth"
import Link from "next/link"

export function ResetPasswordForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const token = searchParams.get("token")
  
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: ""
  })
  const [isLoading, setIsLoading] = useState(false)
  const [showPasswords, setShowPasswords] = useState(false)
  const [passwordError, setPasswordError] = useState("")

  useEffect(() => {
    if (!token) {
      toast.error("Invalid reset link")
      router.push("/forgot-password")
    }
  }, [token, router])

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
    setIsLoading(true)

    if (!validatePassword(formData.password)) {
      setIsLoading(false)
      return
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match")
      setIsLoading(false)
      return
    }

    try {
      const response = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          token,
          password: formData.password 
        })
      })

      if (!response.ok) {
        throw new Error("Failed to reset password")
      }

      toast.success("Password reset successfully!")
      router.push("/sign-in")
    } catch (error) {
      toast.error("Failed to reset password. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="relative">
      <div className="relative rounded-lg border border-blue-500/20 bg-background/95 backdrop-blur-sm shadow-2xl">
        <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-blue-500/10" />
        
        <div className="relative p-8 space-y-6">
          <div className="space-y-2 text-center">
            <h1 className="text-2xl font-bold tracking-tight bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Reset Password
            </h1>
            <p className="text-sm text-muted-foreground">
              Enter your new password below
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="password">New Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPasswords ? "text" : "password"}
                  className="bg-background/50 border-blue-500/20 focus:border-blue-500/30 focus:ring-blue-500/20 pr-10"
                  value={formData.password}
                  onChange={handlePasswordChange}
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowPasswords(!showPasswords)}
                  className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-400 hover:text-gray-500"
                >
                  {showPasswords ? (
                    <Icons.eyeOff className="h-4 w-4" />
                  ) : (
                    <Icons.eye className="h-4 w-4" />
                  )}
                </button>
              </div>
              {passwordError && (
                <p className="text-sm text-red-500">{passwordError}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  type={showPasswords ? "text" : "password"}
                  className="bg-background/50 border-blue-500/20 focus:border-blue-500/30 focus:ring-blue-500/20 pr-10"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                  disabled={isLoading}
                />
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
              Reset Password
            </Button>
          </form>

          <p className="text-center text-sm text-muted-foreground">
            Remember your password?{" "}
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
