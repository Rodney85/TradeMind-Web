import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

export default withAuth(
  function middleware(req) {
    return NextResponse.next()
  },
  {
    callbacks: {
      authorized: ({ req, token }) => {
        const pathname = req.nextUrl.pathname
        
        // Allow access to auth-related pages without a token
        if (pathname.startsWith('/sign-in') || 
            pathname.startsWith('/sign-up') || 
            pathname.startsWith('/forgot-password') ||
            pathname.startsWith('/reset-password')) {
          return true
        }
        
        // Require token for all other pages
        return !!token
      },
    },
  }
)

// Specify which routes to protect
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api/auth (auth API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - / (home page)
     * - /sign-in (login page)
     * - /sign-up (register page)
     */
    "/((?!api/auth|_next/static|_next/image|favicon.ico|sign-in|sign-up|$).*)",
  ],
}
