import { signIn } from "next-auth/react"

export function useAuth() {
  const login = async ({ email, password }: { email: string; password: string }) => {
    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      })

      if (result?.error) {
        return { success: false, message: "Invalid email or password" }
      }

      return { success: true }
    } catch (error) {
      console.error("Login error:", error)
      return { success: false, message: "An error occurred during login" }
    }
  }

  const register = async ({ 
    email, 
    password,
    name,
    confirmPassword 
  }: { 
    email: string
    password: string
    name: string
    confirmPassword: string
  }) => {
    try {
      if (password !== confirmPassword) {
        return { success: false, message: "Passwords do not match" }
      }

      const data = { email, password, name, confirmPassword }
      console.log('Sending registration data:', data)

      // Register via your existing API route
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      const result = await response.json()
      console.log('Registration response:', { status: response.status, result })

      if (!response.ok) {
        return { success: false, message: result.message || "Registration failed" }
      }

      // Auto login after registration
      const loginResult = await login({ email, password })
      if (!loginResult.success) {
        return { success: false, message: "Registration successful but login failed" }
      }

      return { success: true, message: "Account created successfully!" }
    } catch (error) {
      console.error('Registration error:', error)
      return { success: false, message: "An error occurred during registration" }
    }
  }

  return {
    login,
    register,
    isLoading: false
  }
}
