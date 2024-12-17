"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Github, Twitter, Brain } from "lucide-react";
import { motion } from "framer-motion";
import { WaitlistForm } from "./waitlist-form";

export function Footer() {
  return (
    <footer className="relative border-t border-white/10 bg-black">
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:60px_60px]" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/50 to-black/0" />
      
      <div className="relative container mx-auto px-4 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* Brand and Description */}
          <div className="md:col-span-4 space-y-3">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-2"
            >
              <Brain className="h-5 w-5 text-white" />
              <h3 className="text-lg font-semibold text-white">TradeMind</h3>
            </motion.div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-sm text-white/60"
            >
              More Than a Tool. A Psychological Trading Breakthrough.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex items-center gap-2 pt-2"
            >
              <Button variant="outline" size="icon" className="bg-white/5 border-white/10 hover:bg-white/10" asChild>
                <Link href="https://twitter.com" target="_blank">
                  <Twitter className="h-4 w-4 text-white/60" />
                  <span className="sr-only">Twitter</span>
                </Link>
              </Button>
              <Button variant="outline" size="icon" className="bg-white/5 border-white/10 hover:bg-white/10" asChild>
                <Link href="https://github.com" target="_blank">
                  <Github className="h-4 w-4 text-white/60" />
                  <span className="sr-only">GitHub</span>
                </Link>
              </Button>
            </motion.div>
          </div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="md:col-span-3 space-y-4"
          >
            <h3 className="text-sm font-medium text-white/80">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link href="#features" className="text-sm text-white/60 hover:text-white transition-colors">
                  Features
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-sm text-white/60 hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-sm text-white/60 hover:text-white transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </motion.div>

          {/* Waitlist Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="md:col-span-5 space-y-6"
          >
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white">Be Among the First to Transform Your Trading Mind</h3>
              <p className="text-sm text-white/60">
                Join the Growing Community. 1,000+ Traders Already Waiting. Something big is coming. Are you ready?
              </p>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg blur opacity-30"></div>
              <div className="relative bg-black/40 border border-white/10 rounded-lg p-4">
                <WaitlistForm />
                <div className="flex items-center justify-center gap-x-8 text-xs text-white/40 mt-4">
                  <span> Spots filling up fast</span>
                  <span><span className="text-blue-400 font-medium">2,000+</span> traders joined</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-8 border-t border-white/10">
          <p className="text-sm text-white/60 text-center">
            &copy; {new Date().getFullYear()} TradeMind. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
