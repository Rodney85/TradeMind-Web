import React from "react";
import { TextHoverEffect } from "@/components/ui/text-hover-effect";

export function TextHoverEffectDemo() {
  return (
    <div className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-black">
      <div className="relative z-10">
        <TextHoverEffect text="ACET" className="mix-blend-difference" />
      </div>
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 to-neutral-800" />
      </div>
    </div>
  );
}
