import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { ConvexHttpClient } from "convex/browser"
import { api } from "@/convex/_generated/api"
import { verifyPassword } from "@/lib/auth"

declare module "next-auth" {
  interface Session {
    user: {
      id: string
      email: string
      name: string
    }
  }
  interface User {
    id: string
    email: string
    name: string
  }
}

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!)

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Missing credentials")
        }

        try {
          // Get user from Convex
          const user = await convex.query(api.users.getUserByEmail, { 
            email: credentials.email 
          })

          if (!user) {
            throw new Error("No user found")
          }

          // Verify password
          const isValid = await verifyPassword(credentials.password, user.hashedPassword)

          if (!isValid) {
            throw new Error("Invalid password")
          }

          return {
            id: user._id,
            email: user.email,
            name: user.name
          }
        } catch (error) {
          console.error("Auth error:", error)
          throw error
        }
      }
    })
  ],
  pages: {
    signIn: "/sign-in"
  },
  session: {
    strategy: "jwt"
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string
      }
      return session
    }
  },
  secret: process.env.NEXTAUTH_SECRET
})

export { handler as GET, handler as POST }
