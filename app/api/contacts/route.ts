import { NextResponse } from 'next/server'

export async function GET() {
  try {
    // Return an empty array since we're not using MongoDB
    return NextResponse.json([])
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
