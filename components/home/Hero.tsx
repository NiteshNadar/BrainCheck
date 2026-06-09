"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // 7. Overdrive & 5. Delight: Interactive Neural Constellation & Liquid Color Clouds with IntersectionObserver
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
      height = canvas.height = canvas.parentElement?.clientHeight || window.innerHeight;
      
      // Update blob positions/sizes relative to new width/height
      blobs[0].radius = Math.min(width * 0.5, 450);
      blobs[1].radius = Math.min(width * 0.4, 380);
      blobs[2].radius = Math.min(width * 0.45, 400);
    };
    window.addEventListener("resize", handleResize);

    const mouse = { x: -1000, y: -1000 };
    
    // Spark and Shockwave Interfaces for Direction 1 overdrive
    interface Spark {
      x: number;
      y: number;
      vx: number;
      vy: number;
      alpha: number;
      decay: number;
      radius: number;
      color: string;
    }

    interface Shockwave {
      x: number;
      y: number;
      radius: number;
      maxRadius: number;
      speed: number;
      force: number;
    }

    const sparks: Spark[] = [];
    const shockwaves: Shockwave[] = [];

    let lastMoveTime = 0;
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;

      if (mediaQuery.matches) return;

      // Cursor movement leaves a faint upward-drifting amber spark trail (Direction 1)
      const now = Date.now();
      if (now - lastMoveTime > 30) {
        sparks.push({
          x: mouse.x,
          y: mouse.y,
          vx: (Math.random() * 0.6 - 0.3),
          vy: -(Math.random() * 0.7 + 0.4),
          alpha: 0.8,
          decay: Math.random() * 0.018 + 0.012,
          radius: Math.random() * 1.3 + 0.6,
          color: `rgba(245, 158, 11, `,
        });
        lastMoveTime = now;
      }
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    // Click triggers shockwave and 22-ember spark explosion (Direction 1)
    const handleCanvasClick = (e: MouseEvent) => {
      if (mediaQuery.matches) return;
      const rect = canvas.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const clickY = e.clientY - rect.top;

      shockwaves.push({
        x: clickX,
        y: clickY,
        radius: 0,
        maxRadius: 200,
        speed: 4.8,
        force: 16,
      });

      for (let i = 0; i < 22; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 2.8 + 0.8;
        sparks.push({
          x: clickX,
          y: clickY,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - 0.6,
          alpha: 1.0,
          decay: Math.random() * 0.015 + 0.008,
          radius: Math.random() * 1.6 + 0.8,
          color: `rgba(251, 191, 36, `,
        });
      }
    };
    
    const parent = canvas.parentElement;
    parent?.addEventListener("mousemove", handleMouseMove);
    parent?.addEventListener("mouseleave", handleMouseLeave);
    parent?.addEventListener("click", handleCanvasClick);

    // 1. Liquid Blobs Setup
    class LiquidBlob {
      x: number;
      y: number;
      radius: number;
      baseX: number;
      baseY: number;
      angleX: number;
      angleY: number;
      speedX: number;
      speedY: number;
      color: string;

      constructor(w: number, h: number, r: number, color: string) {
        this.baseX = Math.random() * w;
        this.baseY = Math.random() * h;
        this.x = this.baseX;
        this.y = this.baseY;
        this.radius = r;
        this.angleX = Math.random() * Math.PI * 2;
        this.angleY = Math.random() * Math.PI * 2;
        this.speedX = Math.random() * 0.0012 + 0.0005;
        this.speedY = Math.random() * 0.0012 + 0.0005;
        this.color = color;
      }

      update(w: number, h: number) {
        this.angleX += this.speedX;
        this.angleY += this.speedY;
        this.x = this.baseX + Math.sin(this.angleX) * (w * 0.12);
        this.y = this.baseY + Math.cos(this.angleY) * (h * 0.12);
      }

      draw(c: CanvasRenderingContext2D) {
        const gradient = c.createRadialGradient(
          this.x, this.y, 0,
          this.x, this.y, this.radius
        );
        gradient.addColorStop(0, this.color);
        gradient.addColorStop(1, "rgba(0, 0, 0, 0)");
        c.fillStyle = gradient;
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        c.fill();
      }
    }

    const blobs = [
      new LiquidBlob(width, height, Math.min(width * 0.5, 450), "rgba(217, 119, 6, 0.055)"), // Amber glow
      new LiquidBlob(width, height, Math.min(width * 0.4, 380), "rgba(194, 65, 12, 0.035)"), // Terracotta glow
      new LiquidBlob(width, height, Math.min(width * 0.45, 400), "rgba(139, 92, 246, 0.025)"), // Violet glow
    ];

    // 2. Neural Nodes Setup
    interface Node {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      pulseAngle: number;
      pulseSpeed: number;
      isSparkle?: boolean;
    }

    const nodesCount = 45;
    const nodes: Node[] = [];
    for (let i = 0; i < nodesCount; i++) {
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() * 0.2 - 0.1),
        vy: -(Math.random() * 0.22 + 0.08), // slowly drift upward
        radius: Math.random() * 1.5 + 0.6,
        pulseAngle: Math.random() * Math.PI * 2,
        pulseSpeed: Math.random() * (i % 3 === 0 ? 0.055 : 0.015) + 0.005, // sparkles pulse faster
        isSparkle: i % 3 === 0,
      });
    }

    let breathingAngle = 0;
    let isVisible = true;

    const animate = () => {
      if (!isVisible) return;
      
      // Clean canvas
      ctx.clearRect(0, 0, width, height);

      // Draw and update liquid color blobs
      blobs.forEach((b) => {
        b.update(width, height);
        b.draw(ctx);
      });

      // Update breathing scale
      breathingAngle += 0.004;
      const breathingFactor = 0.75 + Math.sin(breathingAngle) * 0.25;

      // Update nodes positions & apply cursor gravity pulling force
      nodes.forEach((n) => {
        n.x += n.vx;
        n.y += n.vy;

        // Reset if offscreen
        if (n.y < -10) {
          n.y = height + 10;
          n.x = Math.random() * width;
        }
        if (n.x < -10 || n.x > width + 10) {
          n.vx = -n.vx;
        }

        // Mouse gravity pull (attracts nodes gently)
        if (mouse.x !== -1000) {
          const dx = mouse.x - n.x;
          const dy = mouse.y - n.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 160) {
            const force = (160 - dist) / 160;
            // pull toward mouse focus
            n.x += (dx / dist) * force * 0.35;
            n.y += (dy / dist) * force * 0.35;
          }
        }
      });

      // Update and animate shockwaves (applying forces to nodes and sparks) - Direction 1
      for (let i = shockwaves.length - 1; i >= 0; i--) {
        const sw = shockwaves[i];
        sw.radius += sw.speed;

        // Apply physical push force to nodes near the shockwave wave-front
        nodes.forEach((n) => {
          const dx = n.x - sw.x;
          const dy = n.y - sw.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const threshold = 22;
          const diff = Math.abs(dist - sw.radius);
          if (diff < threshold && dist > 0) {
            const expansionRatio = 1 - sw.radius / sw.maxRadius;
            const pushForce = ((threshold - diff) / threshold) * sw.force * expansionRatio;
            n.x += (dx / dist) * pushForce * 0.45;
            n.y += (dy / dist) * pushForce * 0.45;
          }
        });

        // Apply force to sparks too
        sparks.forEach((sp) => {
          const dx = sp.x - sw.x;
          const dy = sp.y - sw.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const threshold = 22;
          const diff = Math.abs(dist - sw.radius);
          if (diff < threshold && dist > 0) {
            const expansionRatio = 1 - sw.radius / sw.maxRadius;
            const pushForce = ((threshold - diff) / threshold) * sw.force * expansionRatio;
            sp.x += (dx / dist) * pushForce * 0.7;
            sp.y += (dy / dist) * pushForce * 0.7;
          }
        });

        // Draw expanding shockwave ring
        if (sw.radius < sw.maxRadius) {
          const alpha = (1 - sw.radius / sw.maxRadius) * 0.18 * breathingFactor;
          ctx.strokeStyle = `rgba(217, 119, 6, ${alpha})`;
          ctx.lineWidth = 1.0;
          ctx.beginPath();
          ctx.arc(sw.x, sw.y, sw.radius, 0, Math.PI * 2);
          ctx.stroke();
        } else {
          shockwaves.splice(i, 1);
        }
      }

      // Update and draw sparks, connecting them to nearby static nodes - Direction 1
      for (let i = sparks.length - 1; i >= 0; i--) {
        const sp = sparks[i];
        sp.x += sp.vx;
        sp.y += sp.vy;
        sp.alpha -= sp.decay;
        sp.vy -= 0.005; // extremely gentle upward rise accent

        if (sp.alpha <= 0) {
          sparks.splice(i, 1);
        } else {
          ctx.fillStyle = `${sp.color}${sp.alpha * breathingFactor})`;
          ctx.beginPath();
          ctx.arc(sp.x, sp.y, sp.radius, 0, Math.PI * 2);
          ctx.fill();

          // Connect sparks to nearby static constellation nodes
          const sparkConnectDist = 75;
          nodes.forEach((n) => {
            const dx = sp.x - n.x;
            const dy = sp.y - n.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < sparkConnectDist) {
              const lineAlpha = (1 - dist / sparkConnectDist) * 0.15 * sp.alpha * breathingFactor;
              ctx.strokeStyle = `rgba(217, 119, 6, ${lineAlpha})`;
              ctx.lineWidth = 0.55;
              ctx.beginPath();
              ctx.moveTo(sp.x, sp.y);
              ctx.lineTo(n.x, n.y);
              ctx.stroke();
            }
          });
        }
      }

      // Draw connection lines between nearby nodes
      const maxConnectDist = 95;
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const n1 = nodes[i];
          const n2 = nodes[j];
          const dx = n1.x - n2.x;
          const dy = n1.y - n2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxConnectDist) {
            const alpha = (1 - dist / maxConnectDist) * 0.12 * breathingFactor;
            ctx.strokeStyle = `rgba(167, 162, 154, ${alpha})`; // soft sand-grey connections
            ctx.lineWidth = 0.6;
            ctx.beginPath();
            ctx.moveTo(n1.x, n1.y);
            ctx.lineTo(n2.x, n2.y);
            ctx.stroke();
          }
        }
      }

      // Draw cursor constellation halos (connect nodes to mouse position)
      if (mouse.x !== -1000) {
        nodes.forEach((n) => {
          const dx = mouse.x - n.x;
          const dy = mouse.y - n.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 130) {
            const alpha = (1 - dist / 130) * 0.15 * breathingFactor;
            ctx.strokeStyle = `rgba(217, 119, 6, ${alpha})`; // glowing amber lines to cursor
            ctx.lineWidth = 0.7;
            ctx.beginPath();
            ctx.moveTo(mouse.x, mouse.y);
            ctx.lineTo(n.x, n.y);
            ctx.stroke();
          }
        });
      }

      // Draw nodes (flickering thought clusters & sparkles)
      nodes.forEach((n) => {
        n.pulseAngle += n.pulseSpeed;
        const currentRadius = n.radius * (0.8 + Math.sin(n.pulseAngle) * 0.2);
        
        // Sparkles flash and flicker intensely
        const baseAlpha = n.isSparkle ? 0.45 : 0.22;
        const pulseRange = n.isSparkle ? 0.35 : 0.1;
        const nodeAlpha = (baseAlpha + Math.sin(n.pulseAngle) * pulseRange) * breathingFactor;

        ctx.fillStyle = `rgba(253, 251, 247, ${nodeAlpha})`; // warm alabaster
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.isSparkle ? currentRadius * 1.35 : currentRadius, 0, Math.PI * 2);
        ctx.fill();

        // Subtle glowing core for sparkles & larger nodes
        if (n.isSparkle || n.radius > 1.4) {
          ctx.fillStyle = `rgba(217, 119, 6, ${nodeAlpha * 0.85})`;
          ctx.beginPath();
          ctx.arc(n.x, n.y, currentRadius * 0.6, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    // Support prefers-reduced-motion
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisible = entry.isIntersecting;
          if (isVisible && !mediaQuery.matches) {
            cancelAnimationFrame(animationFrameId);
            animate();
          } else {
            cancelAnimationFrame(animationFrameId);
          }
        });
      },
      { threshold: 0.05 }
    );

    observer.observe(canvas);

    return () => {
      window.removeEventListener("resize", handleResize);
      parent?.removeEventListener("mousemove", handleMouseMove);
      parent?.removeEventListener("mouseleave", handleMouseLeave);
      parent?.removeEventListener("click", handleCanvasClick);
      cancelAnimationFrame(animationFrameId);
      observer.disconnect();
    };
  }, []);

  // 1. Animate: Entrance choreography stagger sequence
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
    },
  };

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center pt-20 md:pt-32 pb-16 md:pb-20 overflow-hidden">
      {/* 3. Colorized: Active HD OKLCH background glow orbs */}
      <div className="absolute top-0 left-0 w-[550px] h-[550px] rounded-full bg-[radial-gradient(circle,rgba(217,119,6,0.08)_0%,transparent_70%)] filter blur-[100px] pointer-events-none z-0" />
      <div className="absolute bottom-0 right-0 w-[450px] h-[450px] rounded-full bg-[radial-gradient(circle,rgba(194,65,12,0.05)_0%,transparent_70%)] filter blur-[100px] pointer-events-none z-0" />

      {/* Floating Canvas Emitter Overlay */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-none z-0"
      />

      {/* Screen Edge Vignette Mask */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,#0D0C0A_95%)] pointer-events-none z-0 opacity-80" />

      <div className="relative max-w-[680px] mx-auto px-5 md:px-8 z-1 w-full">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center gap-6 text-center min-h-[60vh] md:min-h-[70vh] justify-center"
        >
          {/* Eyebrow label */}
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center gap-2 text-xs font-sans font-medium text-amber/70 uppercase tracking-[0.12em] select-none"
          >
            <span className="h-px w-5 bg-amber/40" />
            Mental wellness · 5 minutes
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={itemVariants}
            className="font-serif font-black text-4xl md:text-5xl lg:text-[3.4rem] text-text-primary tracking-tight leading-[1.1] [text-wrap:balance]"
          >
            How is your mind{" "}
            <motion.span
              className="inline-block text-amber cursor-default select-none"
              initial={{ filter: "drop-shadow(0 0 20px rgba(217, 119, 6, 0.35))" }}
              whileHover={{
                scale: 1.03,
                filter: "drop-shadow(0 0 30px rgba(217, 119, 6, 0.65))",
              }}
              transition={{
                duration: 0.3,
                ease: [0.25, 1, 0.5, 1],
              }}
            >
              doing right now?
            </motion.span>
          </motion.h1>

          {/* One-line plain-English description */}
          <motion.p
            variants={itemVariants}
            className="text-text-muted text-sm md:text-base leading-relaxed max-w-[38ch]"
          >
            Answer honestly. Get a clear picture of where you stand.
          </motion.p>

          {/* CTA Link Button */}
          <motion.div variants={itemVariants} className="mt-1 flex flex-col items-center gap-4">
            <motion.div
              whileHover={{ scale: 1.025, y: -1 }}
              whileTap={{ scale: 0.975 }}
              transition={{ duration: 0.15, ease: [0.16, 1, 0.3, 1] }}
            >
              <Link
                href="/survey"
                className="relative overflow-hidden inline-flex items-center justify-center font-sans font-bold text-center select-none bg-[oklch(53%_0.2_36)] hover:bg-[oklch(60%_0.21_42)] text-text-primary rounded-xl text-base px-8 py-3.5 border border-amber/25 shadow-lg shadow-black/30 transition-colors duration-200 outline-none focus-visible:ring-2 focus-visible:ring-amber focus-visible:ring-offset-2 focus-visible:ring-offset-bg-base group"
              >
                {/* Subtle top-edge shine */}
                <span className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-amber/50 to-transparent" />
                <span className="relative z-10 flex items-center gap-2.5">
                  <span>Open the Journal</span>
                  <svg
                    className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1"
                    viewBox="0 0 16 16"
                    fill="none"
                    aria-hidden="true"
                  >
                    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </Link>
            </motion.div>

            {/* Trust strip */}
            <span className="text-text-muted/60 text-xs flex flex-wrap items-center justify-center gap-x-2.5 gap-y-1 select-none">
              <span>No account needed</span>
              <span className="h-1 w-1 rounded-full bg-white/10" />
              <span>Your answers are deleted right after</span>
            </span>
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
}
