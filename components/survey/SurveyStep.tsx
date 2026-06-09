"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import { Question } from "../../lib/types";
import AnswerCard from "./AnswerCard";

interface SurveyStepProps {
  question: Question;
  selectedOptionValue: number | null;
  onSelectOption: (optionLabel: string, optionValue: number) => void;
  direction: number;
}

// 7. Quieter & 1. Animate: Smooth horizontal slide/fade transition
const containerVariants: Variants = {
  enter: { opacity: 0 },
  center: {
    opacity: 1,
    transition: {
      staggerChildren: 0.02,
      delayChildren: 0.02,
    },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.12 },
  },
};

const itemVariants: Variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 20 : -20,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.25, ease: [0.16, 1, 0.3, 1] },
  },
  exit: (direction: number) => ({
    x: direction < 0 ? 20 : -20,
    opacity: 0,
    transition: { duration: 0.12, ease: "easeInOut" },
  }),
};

export default function SurveyStep({
  question,
  selectedOptionValue,
  onSelectOption,
  direction,
}: SurveyStepProps) {
  return (
    <motion.div
      variants={containerVariants}
      initial="enter"
      animate="center"
      exit="exit"
      className="w-full flex flex-col gap-6"
    >
      {/* 9. Typeset: Serif heading for readability and literary brand style */}
      <motion.h3 
        variants={itemVariants}
        className="font-serif font-bold text-xl md:text-2xl text-text-primary leading-snug min-h-[56px] text-center md:text-left tracking-tight"
      >
        {question.text}
      </motion.h3>

      {/* 6. Layout: Even flex columns with vertical spacing rhythm */}
      <div className="flex flex-col gap-3">
        {question.options.map((option, idx) => (
          <motion.div key={idx} variants={itemVariants} custom={direction}>
            <AnswerCard
              label={option.label}
              isSelected={selectedOptionValue === option.value}
              onClick={() => onSelectOption(option.label, option.value)}
              shortcutKey={String(idx + 1)}
            />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
