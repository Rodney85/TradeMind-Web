import { NextResponse } from "next/server"
import { ConvexHttpClient } from "convex/browser"
import { api } from "@/convex/_generated/api"
import { Resend } from 'resend'

if (!process.env.RESEND_API_KEY) {
  throw new Error('RESEND_API_KEY is not set')
}

if (!process.env.NEXTAUTH_URL) {
  throw new Error('NEXTAUTH_URL is not set')
}

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!)
const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: Request) {
  try {
    console.log('Starting password reset process...')
    console.log('Environment check:', {
      hasResendKey: !!process.env.RESEND_API_KEY,
      nextAuthUrl: process.env.NEXTAUTH_URL,
      convexUrl: !!process.env.NEXT_PUBLIC_CONVEX_URL
    })

    const { email } = await req.json()
    console.log('Received reset request for email:', email)

    // Find user
    console.log('Looking up user in Convex...')
    const user = await convex.query(api.users.getUserByEmail, { email })
    console.log('User lookup result:', { found: !!user })
    
    if (!user) {
      console.log('No user found with this email')
      return NextResponse.json(
        { message: "If an account exists, you will receive a password reset email." },
        { status: 200 }
      )
    }

    try {
      // Generate reset token
      console.log('Generating reset token...')
      const token = await convex.mutation(api.resetTokens.createResetToken, {
        userId: user._id
      })
      console.log('Token generated successfully:', !!token)

      const resetLink = `${process.env.NEXTAUTH_URL}/reset-password?token=${token}`
      console.log('Reset link generated:', resetLink)

      // Send email
      console.log('Attempting to send reset email...')
      const { data: emailResult, error: emailError } = await resend.emails.send({
        from: 'onboarding@resend.dev',
        to: email,
        subject: 'Reset Your TradeMind Password',
        html: `
          <div style="padding: 20px; background: #f9f9f9;">
            <h1 style="color: #333;">Reset Your TradeMind Password</h1>
            <p>You requested to reset your password. Click the link below to proceed:</p>
            <a href="${resetLink}" style="display: inline-block; padding: 10px 20px; background: #4F46E5; color: white; text-decoration: none; border-radius: 5px; margin: 20px 0;">
              Reset Password
            </a>
            <p>This link will expire in 1 hour.</p>
            <p>If you didn't request this, please ignore this email.</p>
            <br/>
            <p style="color: #666; font-size: 12px;">Sent to: ${email}</p>
          </div>
        `
      })

      console.log('Email send result:', { emailResult, emailError })

      if (emailError) {
        throw new Error(`Failed to send email: ${emailError.message}`)
      }

      return NextResponse.json(
        { 
          message: "If an account exists, you will receive a password reset email.",
          data: emailResult 
        },
        { status: 200 }
      )
    } catch (error: any) {
      console.error('Error in reset process:', {
        message: error.message,
        name: error.name,
        stack: error.stack,
        details: error
      })
      throw error
    }
  } catch (error: any) {
    console.error("Password reset error:", {
      message: error.message,
      name: error.name,
      code: error.code,
      stack: error.stack
    })
    return NextResponse.json(
      { 
        message: "Something went wrong. Please try again.",
        error: error.message,
        code: error.code
      },
      { status: 500 }
    )
  }
}
