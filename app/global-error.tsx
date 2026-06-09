"use client";

import React, { useEffect } from "react";
import { AlertTriangle, RotateCcw } from "lucide-react";
import "./globals.css";

interface GlobalErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function GlobalError({ error, reset }: GlobalErrorProps) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Global error caught:", error);
  }, [error]);

  return (
    <html lang="en">
      <body className="bg-bg-base text-text-primary antialiased min-h-screen relative flex items-center justify-center p-4 md:p-6 font-sans">
        {/* Global Noise Overlay */}
        <div className="noise-overlay" />

        {/* Background Decorative Glow Orbs */}
        <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] rounded-full bg-purple/10 filter blur-[120px] pointer-events-none z-0" />
        <div className="absolute bottom-1/4 right-1/4 w-[450px] h-[450px] rounded-full bg-teal/8 filter blur-[100px] pointer-events-none z-0" />

        {/* Main Content Container */}
        <div className="w-full max-w-[460px] z-10 flex flex-col items-center">
          {/* Brand Logo */}
          <div className="mb-8 flex flex-col items-center gap-2">
            <span className="font-sans font-bold text-2xl text-text-primary tracking-tight">
              Brain<span className="text-teal">check</span>
            </span>
          </div>

          {/* Error Card */}
          <div className="p-8 md:p-10 w-full text-center flex flex-col items-center bg-white/[0.04] border border-white/[0.08] rounded-[1.25rem] backdrop-blur-[12px] shadow-[0_4px_24px_rgba(0,0,0,0.3)]">
            {/* Icon Badge */}
            <div className="w-12 h-12 rounded-xl bg-amber/10 flex items-center justify-center text-amber mb-6 border border-amber/20">
              <AlertTriangle size={24} />
            </div>

            {/* Heading */}
            <h2 className="font-serif font-semibold text-lg md:text-xl text-text-primary mb-3">
              Application Error
            </h2>

            {/* Subtext */}
            <p className="text-text-muted text-sm leading-relaxed mb-8">
              A critical system error occurred. We have logged this event and are looking into it.
            </p>

            {/* Retry Button */}
            <button
              onClick={() => reset()}
              className="w-full py-3.5 px-6 font-semibold rounded-xl text-white bg-gradient-brand hover:opacity-90 transform hover:-translate-y-0.5 transition-all duration-150 flex items-center justify-center gap-2 cursor-pointer shadow-md"
            >
              <RotateCcw size={18} />
              Recover Application
            </button>
          </div>

          {/* Small Footer Text */}
          <span className="text-[11px] text-text-muted/60 mt-8 text-center leading-normal max-w-[35ch]">
            "Braincheck is a self-awareness tool. Not a medical service."
          </span>
        </div>
      </body>
    </html>
  );
}
