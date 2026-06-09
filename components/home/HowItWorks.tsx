"use client";

import React, { useRef } from "react";
import { motion, useScroll, useInView } from "framer-motion";

interface StepCardProps {
  number: string;
  title: string;
  description: string;
  idx: number;
}

function StepCard({ number, title, description, idx }: StepCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: false, margin: "-20% 0px -20% 0px" });

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px 0px" }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: idx * 0.08 }}
      whileHover={{
        x: 6,
      }}
      className="relative flex flex-col md:flex-row gap-5 md:gap-10 items-start py-5 md:py-6 transition-all duration-300 group cursor-default"
    >
      {/* Junction Dot connecting to vertical pipeline */}
      <div className="absolute -left-[17px] md:-left-[25px] top-[25px] md:top-[30px] z-10 flex items-center justify-center">
        <motion.div
          animate={{
            backgroundColor: isInView ? "rgba(217, 119, 6, 1)" : "rgba(28, 27, 25, 1)",
            borderColor: isInView ? "rgba(217, 119, 6, 1)" : "rgba(255, 255, 255, 0.15)",
          }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="w-2.5 h-2.5 rounded-full border border-white/10"
        />
      </div>

      {/* Step Number */}
      <span className="font-serif font-black text-4xl md:text-6xl text-text-primary/10 group-hover:text-amber transition-colors duration-300 leading-none md:w-20 flex-shrink-0 tabular-nums select-none">
        {number}
      </span>

      {/* Content */}
      <div className="flex-grow relative z-10">
        <h3 className="font-serif font-semibold text-xl md:text-2xl text-text-primary mb-2 leading-snug group-hover:text-amber-light transition-colors duration-300">
          {title}
        </h3>
        <p className="text-text-muted text-sm md:text-base leading-relaxed max-w-[55ch] group-hover:text-text-primary/95 transition-colors duration-300">
          {description}
        </p>
      </div>
    </motion.div>
  );
}

export default function HowItWorks() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  const steps = [
    {
      number: "01",
      title: "Answer 12 questions",
      description:
        "Answer simple questions about stress, focus, energy, and balance.",
    },
    {
      number: "02",
      title: "Enter your email",
      description:
        "Provide your email address where you'd like your results sent.",
    },
    {
      number: "03",
      title: "Get results by email",
      description:
        "Get your results in a simple report in less than five minutes.",
    },
  ];

  return (
    <section className="bg-bg-base py-16 md:py-32 relative overflow-hidden border-t border-bg-card-border/15">
      <div className="max-w-[860px] mx-auto px-5 md:px-8 relative z-1">
        {/* Section header */}
        <div className="mb-14 md:mb-18">
          <span className="text-terracotta font-semibold text-xs uppercase tracking-wider block mb-3">
            How it works
          </span>
          <h2 className="font-serif font-bold text-3xl md:text-4xl text-text-primary leading-tight max-w-[480px]">
            Three steps. A few minutes. Real clarity.
          </h2>
        </div>

        {/* Steps container with relative timeline pipeline */}
        <div ref={containerRef} className="relative pl-6 md:pl-12 flex flex-col gap-6">
          {/* Vertical Track Line (Background) */}
          <div className="absolute left-[7px] md:left-[23px] top-[25px] md:top-[30px] bottom-[25px] md:bottom-[30px] w-[1px] bg-white/10 pointer-events-none rounded" />
          
          {/* Vertical Track Line (Scroll-linked) */}
          <motion.div
            style={{
              scaleY: scrollYProgress,
              transformOrigin: "top",
            }}
            className="absolute left-[7px] md:left-[23px] top-[25px] md:top-[30px] bottom-[25px] md:bottom-[30px] w-[1px] bg-amber/40 pointer-events-none rounded"
          />

          {steps.map((step, idx) => (
            <StepCard
              key={idx}
              number={step.number}
              title={step.title}
              description={step.description}
              idx={idx}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
