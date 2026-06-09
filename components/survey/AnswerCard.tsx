import React from "react";
import { clsx } from "clsx";

interface AnswerCardProps {
  label: string;
  isSelected: boolean;
  onClick: () => void;
  shortcutKey?: string;
}

export default function AnswerCard({ label, isSelected, onClick, shortcutKey }: AnswerCardProps) {
  return (
    <button
      onClick={onClick}
      type="button"
      className={clsx(
        "relative w-full text-left font-sans text-sm md:text-base cursor-pointer select-none rounded-xl outline-none border-2 focus-visible:ring-2 focus-visible:ring-amber focus-visible:ring-offset-2 focus-visible:ring-offset-bg-base group",
        "transition-all duration-200 ease-out",
        "px-5 py-[15px]",
        // 5. Delight: Scale pulse when selected, and 7. Overdrive: Spring physical response on click active state
        "active:scale-[0.98] hover:translate-y-[-1px]",
        {
          // 2. Bold & 3. Colorized: High-contrast active state using brand Amber OKLCH color tints
          "bg-[oklch(65%_0.2_45)/0.08] border-amber text-text-primary shadow-sm shadow-amber/5 font-semibold":
            isSelected,
          // 8. Quieter: Flat, low-contrast neutral unselected cards
          "bg-white/4 border-white/8 text-text-muted hover:bg-white/6 hover:text-text-primary hover:border-white/12":
            !isSelected,
        }
      )}
    >
      <div className="flex items-center justify-between w-full gap-3">
        <div className="flex items-center gap-3">
          {/* Selection indicator */}
          <span
            className={clsx(
              "h-[18px] w-[18px] rounded-full border-2 flex items-center justify-center transition-all duration-200",
              {
                "border-amber bg-amber": isSelected,
                "border-white/25 bg-transparent": !isSelected,
              }
            )}
          >
            {isSelected && (
              // 5. Delight: Checkmark center dot scale animation
              <span className="h-2 w-2 rounded-full bg-bg-base scale-110 transition-transform duration-200" />
            )}
          </span>
          {/* 9. Typeset: Sans-serif text readability */}
          <span className="leading-snug">{label}</span>
        </div>

        {/* Keyboard shortcut key indicator */}
        {shortcutKey && (
          <kbd className="hidden md:inline-flex items-center justify-center h-5 w-5 rounded text-[10px] font-mono font-medium border border-white/10 bg-white/5 text-text-muted group-hover:text-text-primary group-hover:border-white/20 transition-all select-none">
            {shortcutKey}
          </kbd>
        )}
      </div>
    </button>
  );
}
