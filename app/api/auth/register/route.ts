import { NextResponse } from "next/server"
import { registerSchema } from "@/lib/validations/auth"
import { hash } from "bcryptjs"
import { ConvexHttpClient } from "convex/browser"
import { api } from "@/convex/_generated/api"

// Create Convex client only if URL is available
const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL
if (!convexUrl) {
  throw new Error("NEXT_PUBLIC_CONVEX_URL is not set")
}
const convex = new ConvexHttpClient(convexUrl)

export async function POST(req: Request) {
  try {
    const body = await req.json()
    console.log('Received registration request:', body)
    
    const validatedFields = registerSchema.safeParse(body)
    console.log('Validation result:', {
      success: validatedFields.success,
      errors: !validatedFields.success ? validatedFields.error.format() : null
    })
    
    if (!validatedFields.success) {
      // Get the first error message
      const errorData = validatedFields.error.format()
      let errorMessage = "Invalid fields"
      
      // Look for field-specific errors
      for (const [field, value] of Object.entries(errorData)) {
        if (field === '_errors') continue
        if (typeof value === 'object' && '_errors' in value && value._errors.length > 0) {
          errorMessage = value._errors[0]
          break
        }
      }
      
      return NextResponse.json(
        { message: errorMessage },
        { status: 400 }
      )
    }

    const { email, password, name } = validatedFields.data
    
    try {
      // Hash the password
      const hashedPassword = await hash(password, 12)
      
      // Store user in Convex
      await convex.mutation(api.users.createUser, {
        email,
        name,
        hashedPassword,
        authProvider: 'credentials'
      })
      
      return NextResponse.json(
        { message: "Account created successfully! Redirecting to dashboard..." },
        { status: 201 }
      )
    } catch (error: any) {
      console.error("Error creating user:", error)
      
      // Check if it's a duplicate email error
      if (error.message.includes("Account already exists")) {
        return NextResponse.json(
          { 
            message: "An account with this email already exists. Please sign in instead.",
            type: "EXISTING_ACCOUNT"
          },
          { status: 400 }
        )
      }
      
      // For other errors, return a generic error message
      return NextResponse.json(
        { message: "Failed to create account. Please try again." },
        { status: 500 }
      )
    }
  } catch (error) {
    console.error("Registration error:", error)
    return NextResponse.json(
      { message: "Something went wrong. Please try again." },
      { status: 500 }
    )
  }
}
