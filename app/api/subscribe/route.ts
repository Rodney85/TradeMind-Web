import { NextRequest, NextResponse } from 'next/server';
import { validateEmail } from '@/utils/email-validation';

// Basic email regex for validation
const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email } = body;

    // Basic validation
    if (!email || typeof email !== 'string') {
      return new NextResponse(
        JSON.stringify({ message: 'Email is required' }),
        { 
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    // Validate email using our comprehensive validation
    const validationResult = validateEmail(email);
    if (!validationResult.isValid) {
      return new NextResponse(
        JSON.stringify({ message: validationResult.message }),
        { 
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    if (!process.env.BEEHIIV_API_KEY || !process.env.BEEHIIV_PUBLICATION_ID) {
      console.error('Missing Beehiiv configuration');
      throw new Error('Server configuration error');
    }

    // Using the correct Beehiiv API v2 endpoint for email subscriptions
    const beehiivUrl = `https://api.beehiiv.com/v2/publications/${process.env.BEEHIIV_PUBLICATION_ID}/subscriptions`;
    const trimmedEmail = email.trim().toLowerCase();

    const requestBody = {
      email: trimmedEmail,
      reactivate_existing: false,
      send_welcome_email: true,
      utm_source: 'website',
      utm_medium: 'waitlist'
    };

    console.log('Sending request to Beehiiv:', { url: beehiivUrl, email: trimmedEmail });

    const beehiivResponse = await fetch(beehiivUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.BEEHIIV_API_KEY}`,
        'Accept': 'application/json'
      },
      body: JSON.stringify(requestBody),
    });
    
    const responseText = await beehiivResponse.text();
    console.log('Beehiiv response:', { status: beehiivResponse.status, body: responseText });
    
    let responseData = null;
    try {
      if (responseText) {
        responseData = JSON.parse(responseText);
      }
    } catch (error) {
      console.error('Failed to parse Beehiiv response:', error);
      throw new Error('Invalid response from subscription service');
    }

    if (!beehiivResponse.ok) {
      console.error('Beehiiv error response:', responseData);
      
      // Check for specific error cases
      if (responseData?.error === 'already_subscribed') {
        return new NextResponse(
          JSON.stringify({ 
            message: 'This email is already on the waitlist',
            error: 'already_subscribed'
          }),
          { 
            status: 400,
            headers: { 'Content-Type': 'application/json' }
          }
        );
      }

      throw new Error(responseData?.message || 'Failed to subscribe');
    }

    // Verify the subscription was actually created
    if (!responseData?.data?.id) {
      console.error('Missing subscription ID in response:', responseData);
      throw new Error('Failed to confirm subscription');
    }

    return new NextResponse(
      JSON.stringify({ 
        message: 'Successfully subscribed',
        data: {
          subscriptionId: responseData.data.id,
          email: trimmedEmail
        }
      }),
      { 
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  } catch (error) {
    console.error('Subscription error:', error);
    return new NextResponse(
      JSON.stringify({ 
        message: error instanceof Error ? error.message : 'Internal server error',
      }),
      { 
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
}
