"use client";

import React, { useRef } from "react";
import { Timer, Trash2, Receipt, EyeOff } from "lucide-react";
import { motion, useInView } from "framer-motion";

const easeOutExpo = [0.16, 1, 0.3, 1] as const;

export default function PrivacySection() {
  const points = [
    {
      title: "We use your info once, then delete it",
      description:
        "Answers, name, and email are deleted instantly after email is sent.",
      icon: Timer,
    },
    {
      title: "Your answers are never saved",
      description:
        "Answers pass through system to compile scores. Never saved.",
      icon: Trash2,
    },
    {
      title: "Only verification records are kept",
      description:
        "We only store standard transaction/session records for delivery support.",
      icon: Receipt,
    },
    {
      title: "No tracking, no ads, no selling",
      description:
        "Zero trackers, pixels, ads, or third-party marketing tools.",
      icon: EyeOff,
    },
  ];

  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px 0px" });

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.55, ease: easeOutExpo },
    },
  };

  return (
    <section
      ref={sectionRef}
      className="bg-bg-base py-16 md:py-36 text-text-primary border-t border-white/5"
    >
      <div className="max-w-[720px] mx-auto px-5 md:px-8">
        {/* Header */}
        <motion.div
          className="mb-14 flex flex-col items-start"
          initial={{ opacity: 0, y: 32 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: easeOutExpo }}
        >
          <span className="text-terracotta/85 text-[11px] font-sans font-bold uppercase tracking-widest block mb-4 select-none">
            Your privacy
          </span>
          <h2 className="font-serif font-bold text-3xl md:text-4xl mb-4 leading-tight max-w-[480px] text-text-primary">
            We built this to protect you, not collect you.
          </h2>
          <p className="text-text-muted text-sm md:text-base leading-relaxed max-w-[50ch]">
            Your mental wellness is personal. We treat it that way.
          </p>
        </motion.div>

        {/* Points — staggered scroll-reveal */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="flex flex-col gap-4"
        >
          {points.map((point, idx) => {
            const IconComponent = point.icon;
            return (
              <motion.div
                key={idx}
                variants={itemVariants}
                whileHover={{
                  x: 4,
                }}
                className="flex gap-4 md:gap-6 items-start py-4 transition-all duration-300 group cursor-default"
              >
                <div className="text-terracotta/75 mt-1 shrink-0 transition-transform duration-300 group-hover:scale-105 group-hover:text-terracotta">
                  <IconComponent size={20} className="stroke-[1.5]" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <h3 className="font-serif font-semibold text-lg md:text-xl text-text-primary leading-snug group-hover:text-amber transition-colors duration-300">
                    {point.title}
                  </h3>
                  <p className="text-text-muted text-sm md:text-base leading-relaxed max-w-[55ch] group-hover:text-text-primary/90 transition-colors duration-300">
                    {point.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
