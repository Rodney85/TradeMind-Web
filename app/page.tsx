import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Navbar } from "@/components/navbar";
import { WaitlistForm } from "@/components/waitlist-form";
import { FeaturesSection } from "@/components/features-section";
import { Footer } from "@/components/footer";
import { Brain, LineChart, TrendingUp, BarChart3, Target, ArrowRight } from "lucide-react";
import { HeroSection } from "@/components/hero-section";
import { AboutSection } from "@/components/about-section";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <FeaturesSection />
      <Footer />
    </main>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <Card className="p-6 border-0 bg-white/5">
      <div className="h-12 w-12 rounded-full bg-blue-500/10 flex items-center justify-center mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-white/70">{description}</p>
    </Card>
  );
}