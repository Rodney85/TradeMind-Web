"use client"

import { useSession } from "next-auth/react"
import { Icons } from "@/components/ui/icons"
import { Button } from "@/components/ui/button"
import { signOut } from "next-auth/react"
import { useRouter } from "next/navigation"

export default function DashboardPage() {
  const { data: session } = useSession()
  const router = useRouter()

  const handleSignOut = async () => {
    await signOut({ redirect: false })
    router.push("/sign-in")
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background/95 to-background/90">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Welcome to TradeMind
          </h1>
          <Button 
            variant="outline" 
            onClick={handleSignOut}
            className="bg-background/50 border-blue-500/20 hover:bg-blue-500/10 transition-colors"
          >
            <Icons.logout className="mr-2 h-4 w-4" />
            Sign Out
          </Button>
        </div>

        {/* Welcome Card */}
        <div className="relative rounded-lg border border-blue-500/20 bg-background/95 backdrop-blur-sm shadow-2xl p-6 mb-8">
          <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-blue-500/10" />
          <div className="relative">
            <h2 className="text-xl font-semibold mb-2">
              Hello, {session?.user?.name || "Trader"}! 👋
            </h2>
            <p className="text-muted-foreground">
              Welcome to your TradeMind dashboard. Here you can manage your trading strategies,
              view market analysis, and track your performance.
            </p>
          </div>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Coming Soon Cards */}
          {[
            {
              title: "Market Analysis",
              description: "Advanced market analysis tools and indicators coming soon.",
              icon: <Icons.chartLine className="h-6 w-6" />,
            },
            {
              title: "Trading Strategies",
              description: "Create and backtest your trading strategies.",
              icon: <Icons.strategy className="h-6 w-6" />,
            },
            {
              title: "Performance Tracking",
              description: "Track your trading performance and analytics.",
              icon: <Icons.lineChart className="h-6 w-6" />,
            },
          ].map((feature, index) => (
            <div
              key={index}
              className="relative rounded-lg border border-blue-500/20 bg-background/95 backdrop-blur-sm shadow-lg p-6 hover:shadow-xl transition-shadow"
            >
              <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-blue-500/5" />
              <div className="relative">
                <div className="flex items-center gap-3 mb-3">
                  {feature.icon}
                  <h3 className="font-semibold">{feature.title}</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  {feature.description}
                </p>
                <div className="mt-4">
                  <Button
                    variant="outline"
                    className="w-full bg-background/50 border-blue-500/20 hover:bg-blue-500/10 transition-colors"
                    disabled
                  >
                    Coming Soon
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
