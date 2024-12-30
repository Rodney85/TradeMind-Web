import { NextResponse } from "next/server"
import { ConvexHttpClient } from "convex/browser"
import { api } from "@/convex/_generated/api"
import { hashPassword } from "@/lib/auth"

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!)

export async function POST(req: Request) {
  try {
    const { token, password } = await req.json()

    // Validate token
    const validation = await convex.query(api.resetTokens.validateResetToken, { token })
    
    if (!validation.valid) {
      return NextResponse.json(
        { message: validation.message },
        { status: 400 }
      )
    }

    // Hash new password
    const hashedPassword = await hashPassword(password)

    // Mark token as used and update password
    const userId = await convex.mutation(api.resetTokens.useResetToken, { token })
    
    // Update user's password
    await convex.mutation(api.users.updatePassword, { 
      userId,
      hashedPassword 
    })

    return NextResponse.json(
      { message: "Password reset successfully" },
      { status: 200 }
    )
  } catch (error) {
    console.error("Reset password error:", error)
    return NextResponse.json(
      { message: "Failed to reset password" },
      { status: 500 }
    )
  }
}
