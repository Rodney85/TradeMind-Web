"use client";
import React from "react";
import { BackgroundBeams } from "./ui/background-beams";
import { WaitlistForm } from "./waitlist-form";
import { motion } from "framer-motion";

export function HeroSection() {
  return (
    <div id="hero" className="relative min-h-screen w-full bg-black flex flex-col items-center justify-center antialiased px-4 sm:px-6 py-10 sm:py-16">
      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-10 sm:space-y-14"
        >
          {/* Main Headline */}
          <div className="space-y-5 sm:space-y-7">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="relative text-center"
            >
              <span className="block text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-2 sm:mb-3 leading-[1.1] tracking-tight">
                Master Your Mind,
              </span>
              <span className="block text-3xl sm:text-4xl md:text-5xl lg:text-[5.5rem] font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 leading-[1.4] tracking-tight pb-2">
                Transform Your Trading
              </span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-lg sm:text-xl md:text-2xl text-white/70 max-w-[600px] mx-auto text-center font-light tracking-wide whitespace-nowrap"
            >
              AI-Powered Insights. Your Unfair Advantage.
            </motion.p>
          </div>

          {/* Waitlist Form */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="w-full pt-4 sm:pt-6"
          >
            <WaitlistForm />
          </motion.div>
        </motion.div>
      </div>

      <BackgroundBeams />
    </div>
  );
}