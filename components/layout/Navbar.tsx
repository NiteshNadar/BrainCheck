"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import BraincheckLogo from "../shared/BraincheckLogo";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-bg-base/85 backdrop-blur-md border-b border-bg-card-border/40 py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-[1100px] mx-auto px-5 md:px-8 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2.5 group outline-none"
          aria-label="Braincheck Home"
        >
          <BraincheckLogo
            size={30}
            className="transition-transform duration-200 group-hover:scale-105"
          />
          <span className="font-sans font-bold text-xl tracking-tight text-text-primary">
            Brain<span className="text-amber">check</span>
          </span>
        </Link>

        {/* CTA */}
        <motion.div
          whileHover={{ scale: 1.04, y: -1 }}
          whileTap={{ scale: 0.96 }}
          transition={{ duration: 0.15, ease: [0.16, 1, 0.3, 1] }}
        >
          <Link
            href="/survey"
            className="relative inline-flex items-center justify-center font-sans font-bold text-center transition-colors duration-200 outline-none focus-visible:ring-2 focus-visible:ring-amber focus-visible:ring-offset-2 focus-visible:ring-offset-bg-base select-none bg-[oklch(53%_0.2_36)] hover:bg-[oklch(60%_0.21_42)] border border-amber/20 text-text-primary px-5 py-2 rounded-lg text-sm shadow-md"
          >
            Open the Journal
          </Link>
        </motion.div>
      </div>
    </header>
  );
}
