import { NextResponse } from "next/server"
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function GET() {
  try {
    if (!process.env.RESEND_API_KEY) {
      throw new Error('RESEND_API_KEY is not set')
    }

    console.log('Starting test email send...')
    console.log('API Key exists:', !!process.env.RESEND_API_KEY)
    
    // Send test email
    const { data, error } = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: 'rodneymutwiri20@gmail.com',
      subject: 'TradeMind Test Email - Please Check Spam',
      html: `
        <div style="padding: 20px; background: #f9f9f9;">
          <h1 style="color: #333;">TradeMind Test Email</h1>
          <p>This is a test email sent at: ${new Date().toISOString()}</p>
          <p>If you're seeing this, the email delivery is working!</p>
          <p>Please check your spam folder if this landed there.</p>
          <br/>
          <p>Email sent to: rodneymutwiri20@gmail.com</p>
        </div>
      `
    })

    console.log('Email send response:', { data, error })

    if (error) {
      throw new Error(`Failed to send test email: ${error.message}`)
    }

    return NextResponse.json({ 
      success: true, 
      data,
      timestamp: new Date().toISOString(),
      message: "Email sent, please check spam folder"
    })
  } catch (error: any) {
    console.error('Test email error:', {
      message: error.message,
      name: error.name,
      stack: error.stack,
      details: error
    })
    
    return NextResponse.json({ 
      success: false, 
      error: error.message,
      timestamp: new Date().toISOString(),
      details: {
        name: error.name,
        code: error.code
      }
    }, { status: 500 })
  }
}
