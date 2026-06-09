import React from "react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

interface GlassCardProps {
  children: React.ReactNode;
  theme?: "dark" | "light";
  gradientBorder?: boolean;
  className?: string;
  id?: string;
}

export default function GlassCard({
  children,
  theme = "dark",
  gradientBorder = false,
  className,
  id,
}: GlassCardProps) {
  return (
    <div
      id={id}
      className={twMerge(
        clsx(
          "rounded-2xl transition-all duration-300",
          {
            // Dark card styling
            "bg-bg-mid/95 backdrop-blur-md border border-bg-card-border shadow-xl shadow-black/45":
              theme === "dark" && !gradientBorder,
            // Premium gradient border on dark card
            "bg-bg-mid/95 backdrop-blur-md shadow-xl shadow-black/45 gradient-border-card":
              theme === "dark" && gradientBorder,
            // Light card styling
            "bg-bg-white border border-[#E2E8F0] shadow-md shadow-black/[0.04] text-text-dark":
              theme === "light",
          }
        ),
        className
      )}
    >
      {/* 
        For gradient border cards, we place the content in a relative wrapper 
        so it sits above the absolute mask border.
      */}
      <div className={clsx("w-full h-full", { "relative z-1": theme === "dark" })}>
        {children}
      </div>
    </div>
  );
}
