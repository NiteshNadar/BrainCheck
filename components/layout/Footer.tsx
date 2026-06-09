"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ShieldCheck } from "lucide-react";
import BraincheckLogo from "../shared/BraincheckLogo";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative z-10 isolate border-t border-white/[0.05] bg-bg-mid">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="max-w-[1100px] mx-auto px-5 md:px-8 py-12 md:py-16"
      >
        {/* Top row: brand + links */}
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-10 pb-10 border-b border-white/[0.05]">
          {/* Brand */}
          <div className="flex flex-col gap-3.5 max-w-xs">
            <Link
              href="/"
              className="flex items-center gap-2.5 outline-none focus-visible:ring-2 focus-visible:ring-amber focus-visible:ring-offset-2 focus-visible:ring-offset-bg-mid rounded-lg p-1 group w-fit"
              aria-label="Braincheck Home"
            >
              <BraincheckLogo size={34} className="transition-transform duration-300 group-hover:scale-105" />
              <span className="font-sans font-bold text-xl tracking-tight text-text-primary">
                Brain<span className="text-amber">check</span>
              </span>
            </Link>
            <p className="text-text-muted text-sm leading-relaxed">
              12 questions. Personal insights. Sent to your inbox.
            </p>
          </div>

          {/* Legal links */}
          <div className="flex flex-col gap-3.5">
            <h3 className="font-sans font-bold text-[10px] uppercase tracking-widest text-amber/80">
              Legal
            </h3>
            <div className="flex flex-col gap-3">
              <Link
                href="/privacy"
                className="relative text-text-muted hover:text-amber text-sm transition-colors duration-200 outline-none w-fit group/link focus-visible:text-amber focus-visible:ring-1 focus-visible:ring-amber/30 rounded px-1"
              >
                <span>Privacy Policy</span>
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-amber transition-all duration-300 group-hover/link:w-full" />
              </Link>
              <Link
                href="/terms"
                className="relative text-text-muted hover:text-amber text-sm transition-colors duration-200 outline-none w-fit group/link focus-visible:text-amber focus-visible:ring-1 focus-visible:ring-amber/30 rounded px-1"
              >
                <span>Terms of Use</span>
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-amber transition-all duration-300 group-hover/link:w-full" />
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom row */}
        <div className="pt-8 flex flex-col gap-5">
          <p className="text-text-muted/80 text-xs leading-relaxed max-w-md">
            <strong className="text-text-muted/90">Disclaimer:</strong> For self-awareness only. Not medical or clinical advice.
          </p>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-[11px] text-text-muted/50">
            <span>© {currentYear} Braincheck. All rights reserved.</span>
            <span className="flex items-center gap-1.5">
              <ShieldCheck size={12} className="text-amber/40 shrink-0" />
              <span>Your data is never stored.</span>
            </span>
          </div>
        </div>
      </motion.div>
    </footer>
  );
}
