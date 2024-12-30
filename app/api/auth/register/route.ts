import { NextResponse } from "next/server"
import { registerSchema } from "@/lib/validations/auth"
import { hash } from "bcryptjs"
import { ZodError } from "zod"

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
      // Get the first error message from the Zod error
      const formattedErrors = validatedFields.error.format()
      let errorMessage = "Invalid fields"
      
      // Check each field for errors
      for (const [field, error] of Object.entries(formattedErrors)) {
        if (field !== '_errors' && error?._errors?.length > 0) {
          errorMessage = error._errors[0]
          break
        }
      }
      
      return NextResponse.json(
        { message: errorMessage },
        { status: 400 }
      )
    }

    const { email, password, name } = validatedFields.data
    
    // Hash the password
    const hashedPassword = await hash(password, 12)
    
    // Here we'll add the Convex mutation to create the user
    // For now, we'll just return a success response
    console.log('Registration successful for:', email)
    
    return NextResponse.json(
      { message: "Account created successfully! Redirecting to dashboard..." },
      { status: 201 }
    )
  } catch (error) {
    console.error("Registration error:", error)
    return NextResponse.json(
      { message: "Something went wrong. Please try again." },
      { status: 500 }
    )
  }
}
