import { NextAuthOptions } from "next-auth"
import NextAuth from "next-auth/next"
import CredentialsProvider from "next-auth/providers/credentials"
import { loginSchema } from "@/lib/validations/auth"
import type { User } from "next-auth"
import { compare } from "bcryptjs"

interface CustomUser extends User {
  id: string
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials): Promise<CustomUser | null> {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        try {
          // Validate the credentials
          const validatedFields = loginSchema.safeParse({
            email: credentials.email,
            password: credentials.password,
          })

          if (!validatedFields.success) {
            return null
          }

          // For now, we'll accept any valid credentials
          // Later we'll add proper user verification
          return {
            id: "1",
            email: credentials.email,
            name: "User"
          }
        } catch (error) {
          console.error("Auth error:", error)
          return null
        }
      }
    })
  ],
  pages: {
    signIn: "/sign-in",
    error: "/sign-in"
  },
  session: {
    strategy: "jwt"
  },
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.id = user.id
      }
      return token
    },
    session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string
      }
      return session
    }
  },
  secret: process.env.NEXTAUTH_SECRET
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
