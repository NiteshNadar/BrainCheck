"use client";

import React, { useEffect } from "react";
import { AlertCircle, RotateCcw } from "lucide-react";
import BraincheckLogo from "../components/shared/BraincheckLogo";
import GlassCard from "../components/shared/GlassCard";
import GradientButton from "../components/shared/GradientButton";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorBoundary({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Route error boundary caught:", error);
  }, [error]);

  return (
    <div className="min-h-screen bg-bg-base relative flex flex-col items-center justify-center p-4 md:p-6 overflow-hidden">
      {/* Background Decorative Glow Orbs */}
      <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] rounded-full bg-purple/10 filter blur-[120px] pointer-events-none z-0" />
      <div className="absolute bottom-1/4 right-1/4 w-[450px] h-[450px] rounded-full bg-red-500/5 filter blur-[100px] pointer-events-none z-0" />

      {/* Main Content Container */}
      <div className="w-full max-w-[460px] z-10 flex flex-col items-center">
        {/* Brand Logo */}
        <div className="mb-8 flex flex-col items-center gap-2">
          <BraincheckLogo size={40} />
          <span className="font-sans font-bold text-xl text-text-primary tracking-tight">
            Brain<span className="text-teal">check</span>
          </span>
        </div>

        {/* Error Glass Card */}
        <GlassCard gradientBorder={true} className="p-8 md:p-10 w-full text-center flex flex-col items-center">
          {/* Icon Badge */}
          <div className="w-12 h-12 rounded-xl bg-red-500/10 flex items-center justify-center text-red-400 mb-6 border border-red-500/20">
            <AlertCircle size={24} />
          </div>

          {/* Heading */}
          <h2 className="font-serif font-semibold text-lg md:text-xl text-text-primary mb-3">
            Something Went Wrong
          </h2>

          {/* Subtext */}
          <p className="text-text-muted text-sm leading-relaxed mb-8">
            An unexpected error occurred while loading this section. Please try reloading or head back to home.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 w-full">
            <GradientButton
              variant="secondary"
              onClick={() => reset()}
              className="flex-1 py-3 flex items-center justify-center gap-2 border border-purple/35 text-purple-light hover:bg-purple/10"
            >
              <RotateCcw size={16} />
              Try Again
            </GradientButton>
            <GradientButton
              variant="primary"
              onClick={() => (window.location.href = "/")}
              className="flex-1 py-3"
            >
              Go Home
            </GradientButton>
          </div>
        </GlassCard>

        {/* Small Footer Text */}
        <span className="text-[11px] text-text-muted/60 mt-8 text-center leading-normal max-w-[35ch]">
          "Braincheck is a self-awareness tool. Not a medical service."
        </span>
      </div>
    </div>
  );
}
