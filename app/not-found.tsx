import React from "react";
import Link from "next/link";
import { Compass } from "lucide-react";
import BraincheckLogo from "../components/shared/BraincheckLogo";
import GlassCard from "../components/shared/GlassCard";
import GradientButton from "../components/shared/GradientButton";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-bg-base relative flex flex-col items-center justify-center p-4 md:p-6 overflow-hidden">
      {/* Background Decorative Glow Orbs */}
      <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] rounded-full bg-purple/10 filter blur-[120px] pointer-events-none z-0" />
      <div className="absolute bottom-1/4 right-1/4 w-[450px] h-[450px] rounded-full bg-teal/8 filter blur-[100px] pointer-events-none z-0" />

      {/* Main Content Container */}
      <div className="w-full max-w-[460px] z-10 flex flex-col items-center">
        {/* Brand Logo */}
        <div className="mb-8 flex flex-col items-center gap-2">
          <BraincheckLogo size={40} />
          <span className="font-sans font-bold text-xl text-text-primary tracking-tight">
            Brain<span className="text-teal">check</span>
          </span>
        </div>

        {/* 404 Glass Card */}
        <GlassCard gradientBorder={true} className="p-8 md:p-10 w-full text-center flex flex-col items-center">
          {/* Icon Badge */}
          <div className="w-12 h-12 rounded-xl bg-teal/10 flex items-center justify-center text-teal mb-6 border border-teal/20">
            <Compass size={24} className="animate-pulse" />
          </div>

          {/* Heading */}
          <h1 className="font-serif font-bold text-3xl md:text-4xl text-text-primary mb-3">
            404
          </h1>
          <h2 className="font-serif font-semibold text-lg md:text-xl text-text-primary mb-4">
            Mind Wandered Off?
          </h2>

          {/* Subtext */}
          <p className="text-text-muted text-sm leading-relaxed mb-8">
            The page you are looking for does not exist or has been moved. Let's guide you back to clarity.
          </p>

          {/* Action Button */}
          <Link href="/" passHref className="w-full">
            <GradientButton variant="primary" className="w-full py-3 flex items-center justify-center gap-2">
              Back to Home
            </GradientButton>
          </Link>
        </GlassCard>

        {/* Small Footer Text */}
        <span className="text-[11px] text-text-muted/60 mt-8 text-center leading-normal max-w-[35ch]">
          "Braincheck is a self-awareness tool. Not a medical service."
        </span>
      </div>
    </div>
  );
}
