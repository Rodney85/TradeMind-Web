import { redirect } from "next/navigation"
import { getServerSession } from "next-auth"

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession()

  if (!session) {
    redirect("/sign-in")
  }

  return <>{children}</>
}
