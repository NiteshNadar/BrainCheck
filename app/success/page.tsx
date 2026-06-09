"use client";
 
import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Mail, ArrowLeft } from "lucide-react";
import BraincheckLogo from "../../components/shared/BraincheckLogo";
 
export default function SuccessPage() {
  const router = useRouter();
  const [email, setEmail] = useState<string>("your email");
  const [isClient, setIsClient] = useState(false);
 
  const cardRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
 
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const isMobileDevice = window.matchMedia("(max-width: 768px)").matches;
    if (isMobileDevice || !cardRef.current) return;
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
 
    const rX = -((mouseY - rect.height / 2) / (rect.height / 2)) * 6;
    const rY = ((mouseX - rect.width / 2) / (rect.width / 2)) * 6;
    const gX = (mouseX / rect.width) * 100;
    const gY = (mouseY / rect.height) * 100;
 
    const inner = card.querySelector(".tilt-card-inner") as HTMLDivElement;
    const glow = card.querySelector(".tilt-card-glow") as HTMLDivElement;
 
    if (inner) {
      inner.style.transform = `rotateX(${rX}deg) rotateY(${rY}deg) translateZ(0)`;
    }
    if (glow) {
      glow.style.background = `radial-gradient(220px circle at ${gX}% ${gY}%, rgba(217,119,6,0.15), transparent 80%)`;
      glow.style.opacity = "1";
    }
  };
 
  const handleMouseEnter = () => {
    const isMobileDevice = window.matchMedia("(max-width: 768px)").matches;
    if (isMobileDevice || !cardRef.current) return;
    const card = cardRef.current;
    const inner = card.querySelector(".tilt-card-inner") as HTMLDivElement;
    const glow = card.querySelector(".tilt-card-glow") as HTMLDivElement;
    if (inner) {
      inner.style.transition = "none";
    }
    if (glow) {
      glow.style.opacity = "1";
      glow.style.transition = "opacity 0.3s";
    }
  };
 
  const handleMouseLeave = () => {
    const isMobileDevice = window.matchMedia("(max-width: 768px)").matches;
    if (isMobileDevice || !cardRef.current) return;
    const card = cardRef.current;
    const inner = card.querySelector(".tilt-card-inner") as HTMLDivElement;
    const glow = card.querySelector(".tilt-card-glow") as HTMLDivElement;
    if (inner) {
      inner.style.transform = "rotateX(0deg) rotateY(0deg) translateZ(0)";
      inner.style.transition = "transform 0.4s ease-out";
    }
    if (glow) {
      glow.style.opacity = "0";
      glow.style.transition = "opacity 0.3s";
    }
  };
 
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsClient(true);
    const savedEmail = localStorage.getItem("braincheck_target_email");
    if (savedEmail) {
      setEmail(savedEmail);
    }
    localStorage.removeItem("braincheck_answers");
    localStorage.removeItem("braincheck_target_email");
 
    // Confetti celebration effect (2 seconds duration from bottom-left and bottom-right)
    import("canvas-confetti").then((module) => {
      const confetti = module.default;
      const duration = 2000;
      const animationEnd = Date.now() + duration;
 
      const frame = () => {
        confetti({
          particleCount: 3,
          angle: 60,
          spread: 55,
          origin: { x: 0, y: 0.85 },
          colors: ["#D97706", "#F59E0B", "#C2410C", "#EA580C", "#FDE047"]
        });
        confetti({
          particleCount: 3,
          angle: 120,
          spread: 55,
          origin: { x: 1, y: 0.85 },
          colors: ["#D97706", "#F59E0B", "#C2410C", "#EA580C", "#FDE047"]
        });
 
        if (Date.now() < animationEnd) {
          requestAnimationFrame(frame);
        }
      };
      frame();
    }).catch((err) => console.error("Failed to load canvas-confetti:", err));
 
    // Embers Canvas Animation
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
 
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);
 
    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);
 
    interface Ember {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      alpha: number;
      decay: number;
      color: string;
    }
 
    const embers: Ember[] = [];
    const colors = ["#D97706", "#F59E0B", "#C2410C", "#EA580C"];
 
    // Initial distribution of embers
    if (!mediaQuery.matches) {
      for (let i = 0; i < 35; i++) {
        embers.push({
          x: Math.random() * width,
          y: Math.random() * height * 0.8 + height * 0.2,
          vx: Math.random() * 0.4 - 0.2,
          vy: -(Math.random() * 0.7 + 0.3),
          radius: Math.random() * 1.6 + 0.6,
          alpha: Math.random() * 0.5 + 0.2,
          decay: Math.random() * 0.002 + 0.001,
          color: colors[Math.floor(Math.random() * colors.length)],
        });
      }
    }
 
    const animateEmbers = () => {
      ctx.clearRect(0, 0, width, height);
 
      if (mediaQuery.matches) return;
 
      if (embers.length < 50 && Math.random() < 0.2) {
        embers.push({
          x: Math.random() * width,
          y: height + 10,
          vx: Math.random() * 0.4 - 0.2,
          vy: -(Math.random() * 0.7 + 0.3),
          radius: Math.random() * 1.6 + 0.6,
          alpha: Math.random() * 0.6 + 0.3,
          decay: Math.random() * 0.0025 + 0.001,
          color: colors[Math.floor(Math.random() * colors.length)],
        });
      }
 
      for (let i = embers.length - 1; i >= 0; i--) {
        const e = embers[i];
        e.x += e.vx;
        e.y += e.vy;
        e.alpha -= e.decay;
        e.vx += (Math.random() * 0.03 - 0.015);
 
        if (e.alpha <= 0 || e.y < -10 || e.x < -10 || e.x > width + 10) {
          embers.splice(i, 1);
        } else {
          ctx.fillStyle = e.color;
          ctx.globalAlpha = e.alpha;
          ctx.beginPath();
          ctx.arc(e.x, e.y, e.radius, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      ctx.globalAlpha = 1.0;
 
      animationFrameId = requestAnimationFrame(animateEmbers);
    };
 
    if (!mediaQuery.matches) {
      animateEmbers();
    }
 
    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  if (!isClient) {
    return (
      <div className="min-h-screen bg-bg-base flex items-center justify-center">
        <BraincheckLogo size={48} className="animate-pulse" />
      </div>
    );
  }

  const checkmarkPathVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: { type: "spring" as const, stiffness: 80, damping: 20, delay: 0.3 },
        opacity: { duration: 0.15, delay: 0.3 },
      },
    },
  };

  const checkmarkCircleVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { type: "spring" as const, stiffness: 100, damping: 14 },
    },
  };

  return (
    <div className="min-h-screen bg-bg-base relative flex flex-col items-center justify-center p-4 md:p-6 overflow-y-auto py-10 md:py-16">
 
      {/* Background glow */}
      <motion.div
        animate={{ scale: [1, 1.15, 1], opacity: [0.25, 0.4, 0.25] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] rounded-full bg-[radial-gradient(circle,rgba(217,119,6,0.12)_0%,transparent_70%)] filter blur-[120px] pointer-events-none z-0"
      />
 
      {/* Slow golden embers canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-0"
      />
 
      <div className="w-full max-w-[420px] z-10 text-center my-auto flex flex-col gap-5">
        {/* Logo */}
        <div className="flex flex-col items-center gap-1.5">
          <BraincheckLogo size={28} />
          <span className="font-sans font-bold text-base text-text-primary tracking-tight">
            Brain<span className="text-amber">check</span>
          </span>
        </div>
 
        {/* Card */}
        <motion.div
          initial={{ scale: 0.85, y: 24, opacity: 0 }}
          animate={{ scale: 1, y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          className="w-full perspective-[1000px] text-center"
          onMouseMove={handleMouseMove}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          ref={cardRef}
        >
          <div
            className="tilt-card-inner relative w-full rounded-2xl bg-[#13110F] md:bg-[#13110F]/85 md:backdrop-blur-xl border border-amber/20 shadow-[0_25px_65px_-15px_rgba(0,0,0,0.65)]"
            style={{
              transform: "rotateX(0deg) rotateY(0deg) translateZ(0)",
              transition: "transform 0.4s ease-out",
            }}
          >
            {/* Spotlight glow */}
            <div
              className="tilt-card-glow absolute inset-0 pointer-events-none z-0 rounded-2xl"
              style={{
                background: "radial-gradient(220px circle at 50% 50%, rgba(217,119,6,0.15), transparent 80%)",
                opacity: 0,
                transition: "opacity 0.3s",
              }}
            />

            <div className="p-6 md:p-10 flex flex-col items-center gap-5 text-center w-full relative z-10">
              {/* Checkmark with single ripple */}
              <div className="relative h-20 w-20 flex items-center justify-center">
                <motion.div
                  initial={{ scale: 0.8, opacity: 0.5 }}
                  animate={{ scale: 2.2, opacity: 0 }}
                  transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut" }}
                  className="absolute inset-0 rounded-full border-2 border-amber/30 pointer-events-none"
                />
                <motion.svg
                  width="72"
                  height="72"
                  viewBox="0 0 80 80"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="relative z-10"
                >
                  <motion.circle
                    cx="40" cy="40" r="36"
                    stroke="#D97706" strokeWidth="3" fill="none"
                    variants={checkmarkCircleVariants}
                    initial="hidden" animate="visible"
                    className="opacity-25"
                  />
                  <circle cx="40" cy="40" r="36" fill="rgba(217,119,6,0.06)" />
                  <motion.path
                    d="M26 40L35 49L54 30"
                    stroke="#D97706" strokeWidth="5"
                    strokeLinecap="round" strokeLinejoin="round"
                    fill="none"
                    variants={checkmarkPathVariants}
                    initial="hidden" animate="visible"
                  />
                </motion.svg>
              </div>

              {/* Heading */}
              <h1 className="font-serif font-black text-2xl md:text-3xl text-text-primary tracking-tight leading-tight">
                Confirmed
              </h1>

              {/* Copy */}
              <p className="text-text-muted text-sm leading-relaxed max-w-[30ch]">
                Your results will arrive in your inbox shortly.
              </p>

              {/* Email note */}
              <div className="flex items-center justify-center gap-2.5 text-sm text-text-primary">
                <Mail size={16} className="text-amber shrink-0" />
                <span className="truncate min-w-0">
                  Sending your report to <strong className="text-amber font-semibold">{email}</strong>
                </span>
              </div>

              {/* Spam note, inline */}
              <p className="text-sm text-text-muted/70 leading-relaxed max-w-[32ch]">
                If your report doesn&apos;t arrive in 5 minutes, please check your spam folder or{" "}
                <a
                  href="mailto:brainchecksupport@gmail.com"
                  className="text-amber hover:text-amber-light font-medium underline transition-colors outline-none focus-visible:ring-1 focus-visible:ring-amber rounded"
                >
                  email support
                </a>.
              </p>

              <div className="w-full h-px bg-bg-card-border/20" />

              {/* Back home */}
              <motion.button
                onClick={() => router.push("/")}
                type="button"
                whileHover={{ scale: 1.025, y: -1 }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.15, ease: [0.16, 1, 0.3, 1] }}
                className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white/4 border border-white/8 text-text-primary hover:bg-white/8 text-sm font-medium transition-colors duration-200 outline-none select-none cursor-pointer focus-visible:ring-2 focus-visible:ring-amber focus-visible:ring-offset-2 focus-visible:ring-offset-bg-mid"
              >
                <ArrowLeft size={15} />
                Back to Home
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
