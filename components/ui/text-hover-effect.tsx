"use client";
import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export const TextHoverEffect = React.memo(
  ({ text, className }: { text: string; className?: string }) => {
    const letters = Array.from(text);

    return (
      <div className={cn("relative w-fit", className)}>
        <motion.div className="flex items-center justify-center text-center">
          {letters.map((letter, i) => (
            <motion.span
              key={i}
              className="text-8xl font-bold relative inline-block cursor-default"
              whileHover={{
                scale: 1.3,
                transition: {
                  duration: 0.2,
                  ease: "easeInOut",
                },
              }}
              style={{
                color: "transparent",
                WebkitTextStroke: "1.5px #ffffff",
              }}
            >
              {letter}
              <motion.span
                className="absolute inset-0 text-white opacity-0 transition-opacity"
                style={{
                  WebkitTextStroke: "0px",
                }}
                whileHover={{
                  opacity: 1,
                  transition: {
                    duration: 0.2,
                    ease: "easeInOut",
                  },
                }}
              >
                {letter}
              </motion.span>
            </motion.span>
          ))}
        </motion.div>
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent blur-sm" />
          <div className="absolute bottom-0 left-0 right-0 h-1/4 bg-gradient-to-t from-black to-transparent" />
        </div>
      </div>
    );
  }
);

TextHoverEffect.displayName = "TextHoverEffect";
