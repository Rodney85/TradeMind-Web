import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

export default withAuth(
  function middleware(req) {
    // Get the pathname
    const path = req.nextUrl.pathname

    // Public paths that don't require authentication
    const isPublicPath = path === "/" || 
                        path === "/sign-in" || 
                        path === "/sign-up" || 
                        path.startsWith("/api/auth")

    // Check if user is authenticated
    const isAuthenticated = !!req.nextauth.token

    // Allow public paths for everyone
    if (isPublicPath) {
      return NextResponse.next()
    }

    // Redirect unauthenticated users to login
    if (!isAuthenticated) {
      return NextResponse.redirect(new URL("/sign-in", req.url))
    }

    return NextResponse.next()
  },
  {
    callbacks: {
      authorized({ token }) {
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
