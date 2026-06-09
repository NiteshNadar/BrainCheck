import React from "react";

interface BraincheckLogoProps {
  size?: number;
  className?: string;
}

export default function BraincheckLogo({ size = 32, className = "" }: BraincheckLogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Braincheck Logo"
    >
      <defs>
        <linearGradient id="logo-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#D97706" />
          <stop offset="100%" stopColor="#C2410C" />
        </linearGradient>
      </defs>
      {/* 
        Abstract brain shape with checkmark integrated into the bottom right.
        Uses a smooth gradient fill.
      */}
      <path
        d="M 50,30 
           C 40,20 20,22 18,40 
           C 16,58 30,68 40,65 
           C 38,72 43,80 50,80 
           C 54,80 58,78 61,75 
           L 75,89 
           L 90,65 
           C 92,60 90,52 86,48 
           C 90,38 82,24 68,26 
           C 62,27 55,32 50,38 
           Z
           M 46,65
           C 36,65 24,55 26,42
           C 28,30 42,28 48,36
           C 51,40 51,46 48,49
           C 47,51 46,55 46,65
           Z
           M 50,72
           C 48,72 47,70 47,68
           C 49,60 51,55 53,52
           C 55,49 60,45 66,41
           C 74,36 82,41 80,50
           C 79,54 75,58 72,60
           L 61,71
           C 58,74 54,75 50,72
           Z"
        fill="url(#logo-gradient)"
        fillRule="evenodd"
        clipRule="evenodd"
      />
      {/* Highlight/Checkmark path overlay for accentuation */}
      <path
        d="M 45,74 L 54,83 L 83,49"
        stroke="url(#logo-gradient)"
        strokeWidth="8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
