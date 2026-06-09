import React from "react";
import { clsx } from "clsx";

const PILLAR_LABELS: Record<string, string> = {
  stress: "Stress",
  focus: "Focus",
  energy: "Energy",
  emotional_balance: "Balance",
  self_confidence: "Confidence",
};

// 3. Colorized: Active HD OKLCH color palettes per pillar
const PILLAR_COLORS: Record<string, string> = {
  stress: "from-[oklch(67%_0.22_48)] to-[oklch(53%_0.2_36)]",
  focus: "from-[oklch(60%_0.18_270)] to-[oklch(50%_0.22_290)]",
  energy: "from-[oklch(76%_0.2_75)] to-[oklch(67%_0.22_48)]",
  emotional_balance: "from-[oklch(68%_0.16_160)] to-[oklch(58%_0.18_180)]",
  self_confidence: "from-[oklch(58%_0.22_310)] to-[oklch(48%_0.24_330)]",
};

// Custom glow shadows per pillar for active progress indication
const PILLAR_GLOWS: Record<string, string> = {
  stress: "shadow-[0_0_8px_rgba(217,119,6,0.45)]",
  focus: "shadow-[0_0_8px_rgba(139,92,246,0.4)]",
  energy: "shadow-[0_0_8px_rgba(245,158,11,0.4)]",
  emotional_balance: "shadow-[0_0_8px_rgba(16,185,129,0.4)]",
  self_confidence: "shadow-[0_0_8px_rgba(194,65,12,0.4)]",
};

interface ProgressBarProps {
  current: number;
  total: number;
  pillar?: string;
}

export default function ProgressBar({ current, total, pillar }: ProgressBarProps) {
  const percentage = Math.min(Math.max((current / total) * 100, 0), 100);
  const pillarLabel = pillar ? PILLAR_LABELS[pillar] || pillar : null;
  const gradientClass = pillar ? PILLAR_COLORS[pillar] || "from-amber to-terracotta" : "from-amber to-terracotta";
  const glowClass = pillar ? PILLAR_GLOWS[pillar] || "shadow-[0_0_8px_rgba(217,119,6,0.3)]" : "shadow-[0_0_8px_rgba(217,119,6,0.3)]";

  return (
    <div className="w-full flex flex-col gap-3">
      <div className="flex items-baseline justify-between text-xs text-text-muted">
        <span className="flex items-center gap-2">
          {/* 9. Typeset: Serif italic step label */}
          <span className="font-serif italic font-semibold text-xs text-text-primary">
            Question {current} of {total}
          </span>
          {pillarLabel && (
            <>
              <span className="h-1 w-1 rounded-full bg-white/10" />
              <span className="text-amber font-bold uppercase tracking-widest text-[9px]">
                {pillarLabel}
              </span>
            </>
          )}
        </span>
        <span className="tabular-nums font-semibold text-xs text-text-primary/70">{Math.round(percentage)}%</span>
      </div>
      
      {/* 6. Layout: Segmented progress pills */}
      <div className="w-full flex items-center gap-1.5 h-2">
        {Array.from({ length: total }).map((_, idx) => {
          const isActive = idx === current - 1;
          const isCompleted = idx < current - 1;

          return (
            <div
              key={idx}
              className={clsx(
                "rounded-full transition-all duration-300 ease-out flex-grow",
                {
                  [`h-[5px] bg-gradient-to-r ${gradientClass} ${glowClass} opacity-100 scale-y-105`]:
                    isActive,
                  [`h-[3px] bg-gradient-to-r ${gradientClass} opacity-40`]:
                    isCompleted,
                  "h-[3px] bg-white/5":
                    !isActive && !isCompleted,
                }
              )}
            />
          );
        })}
      </div>
    </div>
  );
}
