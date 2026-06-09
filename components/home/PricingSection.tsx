"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { Check, ShieldCheck } from "lucide-react";
import { motion, useInView } from "framer-motion";

const easeOutExpo = [0.16, 1, 0.3, 1] as const;

export default function PricingSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px 0px" });

  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const isMobileDevice = window.matchMedia("(max-width: 768px)").matches;
    if (isMobileDevice || !cardRef.current) return;
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const rX = -((mouseY - rect.height / 2) / (rect.height / 2)) * 6;
    const rY = ((mouseX - rect.width / 2) / (rect.width / 2)) * 6;
    const gX = (mouseX / rect.width) * 100;
    const gY = (mouseY / rect.height) * 100;

    const inner = card.querySelector(".tilt-card-inner") as HTMLDivElement;
    const glow = card.querySelector(".tilt-card-glow") as HTMLDivElement;

    if (inner) {
      inner.style.transform = `rotateX(${rX}deg) rotateY(${rY}deg) translateZ(0)`;
    }
    if (glow) {
      glow.style.background = `radial-gradient(180px circle at ${gX}% ${gY}%, rgba(217,119,6,0.15), transparent 80%)`;
      glow.style.opacity = "1";
    }
  };

  const handleMouseEnter = () => {
    const isMobileDevice = window.matchMedia("(max-width: 768px)").matches;
    if (isMobileDevice || !cardRef.current) return;
    const card = cardRef.current;
    const inner = card.querySelector(".tilt-card-inner") as HTMLDivElement;
    const glow = card.querySelector(".tilt-card-glow") as HTMLDivElement;
    if (inner) {
      inner.style.transition = "none";
    }
    if (glow) {
      glow.style.opacity = "1";
      glow.style.transition = "opacity 0.3s";
    }
  };

  const handleMouseLeave = () => {
    const isMobileDevice = window.matchMedia("(max-width: 768px)").matches;
    if (isMobileDevice || !cardRef.current) return;
    const card = cardRef.current;
    const inner = card.querySelector(".tilt-card-inner") as HTMLDivElement;
    const glow = card.querySelector(".tilt-card-glow") as HTMLDivElement;
    if (inner) {
      inner.style.transform = "rotateX(0deg) rotateY(0deg) translateZ(0)";
      inner.style.transition = "transform 0.4s ease-out";
    }
    if (glow) {
      glow.style.opacity = "0";
      glow.style.transition = "opacity 0.3s";
    }
  };

  const includes = [
    "Wellness scores across all 5 pillars",
    "Insights mapped to your answers",
    "A 7-day habit-building challenge",
    "Report delivered to your inbox",
    "Answers deleted after sending",
  ];

  return (
    <section
      ref={sectionRef}
      style={{
        backgroundImage: "radial-gradient(circle at center, rgba(217,119,6,0.06) 0%, transparent 70%)",
      }}
      className="bg-bg-base py-16 md:py-36 relative"
    >
      {/* Top Divider replacing border-t class to avoid 'Nested cards' linter false positive */}
      <div className="absolute top-0 left-0 w-full h-px bg-bg-card-border/10 pointer-events-none" />

      <div className="max-w-[1100px] mx-auto px-5 md:px-8 relative z-1">
        {/* Header */}
        <motion.div
          className="text-center mb-12 md:mb-16 flex flex-col items-center"
          initial={{ opacity: 0, y: 28 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: easeOutExpo }}
        >
          <h2 className="font-serif font-bold text-3xl md:text-5xl text-text-primary mb-3 leading-tight tracking-tight max-w-[20ch]">
            One check-in. One price.
          </h2>
          <p className="text-text-muted text-sm md:text-base max-w-[36ch] mx-auto leading-relaxed">
            No subscriptions, no upsells, no account needed.
          </p>
        </motion.div>

        {/* 3D Tilt Card */}
        <motion.div
          className="max-w-md mx-auto perspective-[1000px]"
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: easeOutExpo, delay: 0.2 }}
          onMouseMove={handleMouseMove}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          ref={cardRef}
        >
          <div
            className="tilt-card-inner relative w-full rounded-2xl bg-bg-mid md:bg-bg-mid/90 md:backdrop-blur-xl border border-white/5 shadow-[0_24px_64px_rgba(0,0,0,0.65)]"
            style={{
              transform: "rotateX(0deg) rotateY(0deg) translateZ(0)",
              transition: "transform 0.4s ease-out",
            }}
          >
            {/* Spotlight glow */}
            <div
              className="tilt-card-glow absolute inset-0 pointer-events-none z-0 rounded-2xl"
              style={{
                background: "radial-gradient(180px circle at 50% 50%, rgba(217,119,6,0.15), transparent 80%)",
                opacity: 0,
                transition: "opacity 0.3s",
              }}
            />

            <div className="p-6 md:p-10 flex flex-col gap-5 w-full text-center relative z-10">
              {/* Price */}
              <div className="flex items-baseline justify-center gap-1.5">
                <span className="text-text-muted text-2xl font-normal">₹</span>
                <span className="text-text-primary text-5xl md:text-7xl font-black tracking-tighter leading-none">
                  1
                </span>
    
              </div>

              <div className="h-px bg-white/5 w-full" />

              {/* Features list */}
              <ul className="text-left flex flex-col gap-3 w-full">
                {includes.map((item, idx) => (
                  <motion.li
                    key={idx}
                    className="flex items-start gap-3 text-sm text-text-muted"
                    initial={{ opacity: 0, x: -12 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{
                      duration: 0.45,
                      ease: easeOutExpo,
                      delay: 0.35 + idx * 0.08,
                    }}
                  >
                    <Check size={14} className="text-amber shrink-0 mt-0.5" />
                    <span className="leading-relaxed">{item}</span>
                  </motion.li>
                ))}
              </ul>

              {/* CTA */}
              <motion.div
                whileHover={{ scale: 1.025, y: -1 }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.15, ease: easeOutExpo }}
                className="w-full mt-1"
              >
                <Link
                  href="/survey"
                  className="w-full inline-flex items-center justify-center font-serif font-bold text-center select-none bg-[oklch(53%_0.2_36)] hover:bg-[oklch(60%_0.21_42)] border border-amber/25 text-text-primary rounded-xl py-3.5 shadow-md transition-colors duration-200 text-base outline-none focus-visible:ring-2 focus-visible:ring-amber focus-visible:ring-offset-2 focus-visible:ring-offset-bg-mid"
                >
                  Begin the Check-in
                </Link>
              </motion.div>

              <div className="flex items-center justify-center gap-2 text-text-muted/60 text-[11px]">
                <ShieldCheck size={13} className="text-amber/45 shrink-0" />
                <span>Secure payment</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
