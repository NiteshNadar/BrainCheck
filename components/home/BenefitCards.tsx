"use client";

import React, { useRef } from "react";
import { Sprout, BarChart3, ShieldCheck } from "lucide-react";
import { motion, useInView } from "framer-motion";

const easeOutExpo = [0.16, 1, 0.3, 1] as const;

export default function BenefitCards() {
  const benefits = [
    {
      title: "Know yourself better, not get a label",
      description:
        "See your own patterns. Make better choices for yourself.",
      icon: Sprout,
    },
    {
      title: "Five things that matter most",
      description:
        "We score stress, focus, energy, balance, and confidence.",
      icon: BarChart3,
    },
    {
      title: "Your answers stay private. Always.",
      description:
        "We do not save answers or email. Zero tracking or ads.",
      icon: ShieldCheck,
    },
  ];

  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px 0px" });

  return (
    <section
      ref={sectionRef}
      className="bg-bg-base py-16 md:py-36 text-text-primary border-t border-white/5"
    >
      <div className="max-w-[1060px] mx-auto px-5 md:px-8">
        <div className="flex flex-col md:flex-row gap-10 md:gap-16 items-start">
          {/* Left Column — Why */}
          <motion.div
            className="w-full md:w-5/12 md:sticky md:top-32 flex flex-col items-start"
            initial={{ opacity: 0, y: 32 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: easeOutExpo }}
          >
            <span className="text-terracotta/85 text-[11px] font-sans font-bold uppercase tracking-widest block mb-4 select-none">
              Why Braincheck?
            </span>
            <h2 className="font-serif font-bold text-3xl md:text-4xl mb-4 leading-tight text-text-primary">
              Built for honesty, not hype
            </h2>
            <p className="text-text-muted text-sm md:text-base leading-relaxed max-w-[42ch]">
              A private check-in to understand your stress, energy, and focus.
            </p>
          </motion.div>

          {/* Right Column — staggered benefit blocks */}
          <div className="w-full md:w-7/12 flex flex-col gap-10">
            {benefits.map((benefit, idx) => {
              const IconComponent = benefit.icon;
              return (
                <motion.div
                  key={idx}
                  className="flex gap-5 items-start"
                  initial={{ opacity: 0, y: 28 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{
                    duration: 0.6,
                    ease: easeOutExpo,
                    delay: 0.2 + idx * 0.15,
                  }}
                >
                  <div className="text-terracotta/70 mt-1.5 shrink-0">
                    <IconComponent size={20} className="stroke-[1.5]" />
                  </div>
                  <div>
                    <h3 className="font-serif font-semibold text-lg md:text-xl mb-1.5 text-text-primary leading-snug">
                      {benefit.title}
                    </h3>
                    <p className="text-text-muted text-sm md:text-base leading-relaxed max-w-[50ch]">
                      {benefit.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
