"use client"

import { SessionProvider } from "next-auth/react"
import { ReactNode } from "react"
import { ConvexProvider, ConvexReactClient } from "convex/react"

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!)

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ConvexProvider client={convex}>
      <SessionProvider>{children}</SessionProvider>
    </ConvexProvider>
  )
}
