"use client";
import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function AboutSection() {
  return (
    <section id="about" className="relative w-full bg-black py-12 sm:py-16 -mt-24 sm:-mt-32">
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:60px_60px]" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/50 to-black/0" />
      
      <div className="relative mx-auto max-w-6xl px-6 lg:px-8">
        <Card className="bg-black/60 border-zinc-800 overflow-hidden">
          <div className="relative px-6 py-12 sm:px-12 sm:py-16">
            <div className="absolute inset-0 bg-gradient-to-b from-blue-500/10 to-transparent opacity-30" />
            
            <div className="relative space-y-8 sm:space-y-12">
              <div className="space-y-6 text-center max-w-3xl mx-auto">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <Badge 
                    variant="secondary" 
                    className="bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 transition-colors border-blue-500/20"
                  >
                    Our Mission
                  </Badge>
                </motion.div>
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="text-4xl font-bold tracking-tight text-white sm:text-5xl bg-clip-text text-transparent bg-gradient-to-b from-white to-white/80"
                >
                  Imagine trading without emotional turbulence.
                </motion.h2>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="grid gap-12 md:grid-cols-2 items-start"
              >
                <div className="space-y-6">
                  <p className="text-lg leading-8 text-gray-300">
                    What if your biggest competitor is not the market, but your own psychology?
                  </p>
                  <p className="text-lg leading-8 text-gray-400">
                    <span className="text-blue-400 font-semibold">95% of traders lose money</span> - not because of strategy, but because of mind.
                  </p>
                  <p className="text-lg leading-8 text-gray-300">
                    TradeMind is an AI-powered companion that understands your trading psychology better than you do, providing you with the insights and tools to overcome emotional biases and achieve consistent profitability.
                  </p>
                </div>

                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg blur opacity-30 group-hover:opacity-40 transition-opacity"></div>
                  <Card className="relative bg-black/40 border-zinc-800/50">
                    <CardContent className="p-8 space-y-6">
                      <h3 className="text-xl font-semibold text-white">Key Benefits</h3>
                      <ul className="space-y-4">
                        <li className="flex items-center text-gray-300">
                          <div className="w-2 h-2 rounded-full bg-blue-500 mr-3" />
                          Improve Trading Psychology
                        </li>
                        <li className="flex items-center text-gray-300">
                          <div className="w-2 h-2 rounded-full bg-blue-500 mr-3" />
                          Increase Profitability
                        </li>
                        <li className="flex items-center text-gray-300">
                          <div className="w-2 h-2 rounded-full bg-blue-500 mr-3" />
                          Gain Competitive Edge
                        </li>
                        <li className="flex items-center text-gray-300">
                          <div className="w-2 h-2 rounded-full bg-blue-500 mr-3" />
                          Accelerate Learning
                        </li>
                        <li className="flex items-center text-gray-300">
                          <div className="w-2 h-2 rounded-full bg-blue-500 mr-3" />
                          Stay Motivated
                        </li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </motion.div>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}
