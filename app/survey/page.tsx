"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { questions } from "../../lib/questions";
import { AnswerSelection } from "../../lib/types";
import GlassCard from "../../components/shared/GlassCard";
import ProgressBar from "../../components/survey/ProgressBar";
import SurveyStep from "../../components/survey/SurveyStep";
import BraincheckLogo from "../../components/shared/BraincheckLogo";

interface AnswerState {
  label: string;
  value: number;
}

const PILLAR_GLOW_COLORS: Record<string, string> = {
  stress: "rgba(217, 119, 6, 0.06)",               // amber
  focus: "rgba(139, 92, 246, 0.055)",              // purple/violet
  energy: "rgba(245, 158, 11, 0.05)",              // amber-light / sand
  emotional_balance: "rgba(16, 185, 129, 0.055)",  // mint / emerald
  self_confidence: "rgba(194, 65, 12, 0.055)",     // terracotta
};

export default function SurveyPage() {
  const router = useRouter();
  const [currentIdx, setCurrentIdx] = useState(0);
  const currentIdxRef = useRef(currentIdx);

  useEffect(() => {
    currentIdxRef.current = currentIdx;
  }, [currentIdx]);

  const [answers, setAnswers] = useState<Record<number, AnswerState>>({});
  const [direction, setDirection] = useState(1);
  const [isClient, setIsClient] = useState(false);
  const autoAdvanceTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsClient(true);
    localStorage.removeItem("braincheck_answers");

    return () => {
      if (autoAdvanceTimeoutRef.current) {
        clearTimeout(autoAdvanceTimeoutRef.current);
      }
    };
  }, []);



  const safeIdx = Math.min(Math.max(0, currentIdx), questions.length - 1);
  const currentQuestion = questions[safeIdx];
  const selectedAnswer = answers[currentQuestion.id] || null;

  const handleSelectOption = useCallback((optionLabel: string, optionValue: number) => {
    if (autoAdvanceTimeoutRef.current) {
      clearTimeout(autoAdvanceTimeoutRef.current);
    }

    const activeIdx = Math.min(Math.max(0, currentIdxRef.current), questions.length - 1);
    const activeQuestion = questions[activeIdx];

    setAnswers((prev) => {
      const updated = {
        ...prev,
        [activeQuestion.id]: { label: optionLabel, value: optionValue },
      };

      // Auto-advance to next question or final details screen
      autoAdvanceTimeoutRef.current = setTimeout(() => {
        autoAdvanceTimeoutRef.current = null;
        const latestIdx = currentIdxRef.current;
        if (latestIdx < questions.length - 1) {
          setDirection(1);
          setCurrentIdx(latestIdx + 1);
        } else {
          const formattedAnswers: AnswerSelection[] = questions.map((q) => {
            const ans = updated[q.id];
            return {
              question_id: q.id,
              question_text: q.text,
              selected_answer: ans?.label || "",
              pillar: q.pillar,
            };
          });
          localStorage.setItem("braincheck_answers", JSON.stringify(formattedAnswers));
          router.push("/details");
        }
      }, 220);

      return updated;
    });
  }, [router]);



  const handleBack = useCallback(() => {
    if (autoAdvanceTimeoutRef.current) {
      clearTimeout(autoAdvanceTimeoutRef.current);
    }
    const latestIdx = currentIdxRef.current;
    if (latestIdx > 0) {
      setDirection(-1);
      setCurrentIdx(latestIdx - 1);
    }
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (document.activeElement?.tagName === "INPUT" || document.activeElement?.tagName === "TEXTAREA") {
        return;
      }
      if (autoAdvanceTimeoutRef.current) return;

      if (["1", "2", "3", "4"].includes(e.key)) {
        const optionIdx = parseInt(e.key) - 1;
        const option = currentQuestion.options[optionIdx];
        if (option) {
          handleSelectOption(option.label, option.value);
        }
      }

      if (e.key === "Backspace" || e.key === "ArrowLeft") {
        if (currentIdx > 0) {
          handleBack();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [currentIdx, currentQuestion, handleSelectOption, handleBack]);

  if (!isClient) {
    return (
      <div className="min-h-screen bg-bg-base flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center gap-3">
          <BraincheckLogo size={48} className="animate-spin" />
          <span className="text-text-muted text-sm">Loading...</span>
        </div>
      </div>
    );
  }

  const currentPillar = currentQuestion?.pillar || "stress";
  const glowColor = PILLAR_GLOW_COLORS[currentPillar] || "rgba(217, 119, 6, 0.06)";

  return (
    <div className="min-h-screen bg-bg-base relative flex flex-col items-center justify-center p-4 md:p-6 overflow-hidden">
      {/* Background glow */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[480px] h-[480px] rounded-full filter blur-[120px] opacity-100 pointer-events-none z-0 transition-all duration-1000 ease-in-out"
        style={{ backgroundColor: glowColor }}
      />

      {/* Header */}
      <div className="mb-6 flex flex-col items-center gap-2 z-1">
        <BraincheckLogo size={32} />
        <span className="font-sans font-bold text-lg text-text-primary tracking-tight">
          Brain<span className="text-amber">check</span>
        </span>
      </div>

      {/* Survey card */}
      <div className="w-full max-w-xl z-1 min-h-[460px] flex flex-col">
        <GlassCard gradientBorder={true} className="p-6 md:p-10 flex flex-col justify-between flex-grow">
          {/* Progress */}
          <div className="mb-8">
            <ProgressBar
              current={currentIdx + 1}
              total={questions.length}
              pillar={currentQuestion.pillar}
            />
          </div>

          {/* Question and options */}
          <div className="flex-grow flex items-center justify-center min-h-[240px]">
            <AnimatePresence mode="wait" custom={direction}>
              <SurveyStep
                key={currentQuestion.id}
                question={currentQuestion}
                selectedOptionValue={selectedAnswer ? selectedAnswer.value : null}
                onSelectOption={handleSelectOption}
                direction={direction}
              />
            </AnimatePresence>
          </div>

          {/* Navigation */}
          <div className="mt-8 pt-5 border-t border-bg-card-border/20 flex items-center justify-between gap-4">
            {currentIdx > 0 ? (
              <button
                onClick={handleBack}
                type="button"
                className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-white/10 text-text-muted hover:text-text-primary hover:border-amber/30 text-sm font-medium transition-all duration-150 outline-none active:scale-[0.98] cursor-pointer focus-visible:ring-2 focus-visible:ring-amber"
              >
                <ArrowLeft size={15} />
                Back
              </button>
            ) : (
              <button
                onClick={() => router.push("/")}
                type="button"
                className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-white/10 text-text-muted hover:text-text-primary hover:border-amber/30 text-sm font-medium transition-all duration-150 outline-none active:scale-[0.98] cursor-pointer focus-visible:ring-2 focus-visible:ring-amber"
              >
                <ArrowLeft size={15} />
                Back to Home
              </button>
            )}

            {/* Help Link */}
            <a
              href="mailto:brainchecksupport@gmail.com"
              className="text-xs text-text-muted hover:text-text-primary transition-colors underline outline-none focus-visible:ring-1 focus-visible:ring-amber rounded"
            >
              Need help?
            </a>
          </div>
        </GlassCard>
      </div>
    </div>
  );
}
