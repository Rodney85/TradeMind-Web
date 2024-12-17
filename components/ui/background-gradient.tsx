"use client";
import React from "react";
import { motion } from "framer-motion";

export function BackgroundGradient() {
  return (
    <div className="absolute inset-0 w-full h-full">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="absolute inset-0 bg-gradient-to-b from-black via-purple-900/20 to-black"
      />
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-repeat [mask-image:linear-gradient(to_bottom,white,transparent)]" />
    </div>
  );
}
