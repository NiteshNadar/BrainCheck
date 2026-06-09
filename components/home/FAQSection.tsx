"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface FAQItem {
  question: string;
  answer: string;
}

export default function FAQSection() {
  const faqs: FAQItem[] = [
    {
      question: "Why should I take the Braincheck check-in?",
      answer: "To understand your stress, focus, and energy in a private, journal-like space.",
    },
    {
      question: "How is this different from a medical diagnosis?",
      answer: "This is a self-awareness check-in, not a doctor's medical test.",
    },
    {
      question: "How quickly will I get my results?",
      answer: "We email a simple report of your results in less than five minutes.",
    },
    {
      question: "Why can I trust that my data is safe?",
      answer: "We delete all your answers instantly after sending your email.",
    },
    {
      question: "Are my answers kept confidential?",
      answer: "Yes, we treat your answers with absolute confidentiality and delete them permanently after delivery.",
    },
    {
      question: "How do I get help if my results haven't arrived?",
      answer: "Check your spam folder first, then email brainchecksupport@gmail.com for help.",
    },
  ];

  return (
    <section className="bg-bg-base py-16 md:py-32 relative overflow-hidden border-t border-bg-card-border/20">
      <div className="max-w-[720px] mx-auto px-5 md:px-8 relative z-1">
        <div className="text-center mb-12 md:mb-14">
          <h2 className="font-serif font-bold text-3xl md:text-4xl text-text-primary mb-3 leading-tight">
            Common questions
          </h2>
          <p className="text-text-muted text-sm md:text-base max-w-[44ch] mx-auto">
            Everything you need to know before taking the check-in.
          </p>
        </div>

        {/* Accordion — no GlassCard wrapping, simple dividers */}
        <div className="flex flex-col">
          {faqs.map((faq, idx) => (
            <AccordionItem key={idx} question={faq.question} answer={faq.answer} />
          ))}
        </div>
      </div>
    </section>
  );
}

function AccordionItem({ question, answer }: FAQItem) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-bg-card-border/25">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full text-left py-5 md:py-6 flex items-center justify-between gap-4 font-serif font-semibold text-sm md:text-base text-text-primary hover:text-amber transition-colors duration-150 outline-none focus-visible:text-amber focus-visible:ring-2 focus-visible:ring-amber/50 rounded-lg px-2 cursor-pointer"
        aria-expanded={isOpen}
      >
        <span>{question}</span>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] as const }}
          className="flex-shrink-0 text-text-muted text-xs select-none"
        >
          ▼
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: "auto" }}
            exit={{ height: 0 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <div className="pb-5 md:pb-6 text-text-muted text-sm leading-relaxed max-w-[60ch]">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
