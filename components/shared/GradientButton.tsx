"use client";

import React from "react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { motion } from "framer-motion";

interface GradientButtonProps {
  variant?: "primary" | "secondary";
  isLoading?: boolean;
  children?: React.ReactNode;
  className?: string;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
}

export default function GradientButton({
  children,
  variant = "primary",
  isLoading = false,
  className,
  disabled,
  type = "button",
  onClick,
}: GradientButtonProps) {
  const isButtonDisabled = disabled || isLoading;

  return (
    <motion.button
      type={type}
      disabled={isButtonDisabled}
      onClick={onClick}
      whileHover={isButtonDisabled ? undefined : { scale: 1.025, y: -1 }}
      whileTap={isButtonDisabled ? undefined : { scale: 0.97 }}
      transition={{ duration: 0.15, ease: [0.16, 1, 0.3, 1] }}
      className={twMerge(
        clsx(
          "relative inline-flex items-center justify-center font-sans font-bold text-center outline-none focus-visible:ring-2 focus-visible:ring-amber focus-visible:ring-offset-2 focus-visible:ring-offset-bg-base select-none",
          {
            "bg-[oklch(53%_0.2_36)] hover:bg-[oklch(60%_0.21_42)] border border-amber/25 text-text-primary rounded-xl px-8 py-3.5 shadow-md transition-colors duration-200":
              variant === "primary",
            "bg-transparent border border-amber/30 text-sand rounded-xl px-8 py-3.5 hover:border-amber/60 hover:bg-amber/5 transition-colors duration-200":
              variant === "secondary",
            "opacity-50 pointer-events-none cursor-not-allowed": isButtonDisabled,
          }
        ),
        className
      )}
    >
      {isLoading ? (
        <span className="flex items-center justify-center gap-2">
          <svg
            className="animate-spin h-5 w-5 text-current"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
          Loading...
        </span>
      ) : (
        children
      )}
    </motion.button>
  );
}
