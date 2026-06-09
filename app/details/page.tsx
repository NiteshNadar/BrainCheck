"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Script from "next/script";
import { ArrowLeft, CreditCard } from "lucide-react";
import { motion } from "framer-motion";
import GlassCard from "../../components/shared/GlassCard";
import GradientButton from "../../components/shared/GradientButton";
import BraincheckLogo from "../../components/shared/BraincheckLogo";
import { AnswerSelection } from "../../lib/types";

// Zod Validation Schema
const detailsSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  consent: z.boolean().refine((val) => val === true, {
    message: "You must consent to proceed.",
  }),
});

type DetailsFormValues = z.infer<typeof detailsSchema>;

declare global {
  interface Window {
    Razorpay: new (options: Record<string, unknown>) => { open: () => void };
  }
}

export default function DetailsPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState<"preparing" | "verifying">("preparing");
  const [serverError, setServerError] = useState<string | null>(null);
  const [answers, setAnswers] = useState<AnswerSelection[]>([]);
  const [isClient, setIsClient] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<DetailsFormValues>({
    resolver: zodResolver(detailsSchema),
    defaultValues: {
      name: "",
      email: "",
      consent: false,
    },
  });

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsClient(true);
    // Fetch answers from localStorage
    const saved = localStorage.getItem("braincheck_answers");
    if (!saved) {
      // No answers, redirect back to survey
      router.replace("/survey");
    } else {
      setAnswers(JSON.parse(saved));
    }
  }, [router]);

  if (!isClient) {
    return (
      <div className="min-h-screen bg-bg-base flex items-center justify-center">
        <BraincheckLogo size={48} className="animate-spin" />
      </div>
    );
  }

  const onSubmit = async (data: DetailsFormValues) => {
    setIsLoading(true);
    setLoadingStep("preparing");
    setServerError(null);

    try {
      // 1. Call API to create order
      const orderResponse = await fetch("/api/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: 4900 }), // Rs. 49 in paise
      });

      if (!orderResponse.ok) {
        throw new Error("Something went wrong. Please try again.");
      }

      const orderData = await orderResponse.json();
      const { order_id } = orderData;

      // 2. Open Razorpay Checkout Modal
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "rzp_test_your_key_id",
        amount: 4900,
        currency: "INR",
        name: "Braincheck",
        description: "Your Check-in Results Report",
        image: window.location.origin.includes("localhost")
          ? "https://raw.githubusercontent.com/Razorpay/razorpay-logo/master/razorpay-logo.png"
          : `${window.location.origin}/logo.png`,
        order_id: order_id,
        handler: async function (response: {
          razorpay_payment_id: string;
          razorpay_order_id: string;
          razorpay_signature: string;
        }) {
          // Inside Razorpay Success Callback
          setIsLoading(true);
          setLoadingStep("verifying");
          try {
            // Verify payment and trigger report generation
            const verifyResponse = await fetch("/api/verify-payment", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_order_id: response.razorpay_order_id,
                razorpay_signature: response.razorpay_signature,
                name: data.name,
                email: data.email,
                answers: answers,
              }),
            });

            if (!verifyResponse.ok) {
              throw new Error("Something went wrong. Please try again.");
            }

            // Save target email in localStorage to show on success page
            localStorage.setItem("braincheck_target_email", data.email);
            // Navigate to success page
            router.push("/success");
          } catch {
            setServerError("Something went wrong. Please try again.");
            setIsLoading(false);
          }
        },
        prefill: {
          name: data.name,
          email: data.email,
        },
        theme: {
          color: "#D97706", // Primary brand color (Amber)
        },
        modal: {
          ondismiss: function () {
            setIsLoading(false);
            setServerError("The process was cancelled.");
          },
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch {
      setServerError("Something went wrong. Please try again.");
      setIsLoading(false);
    }
  };

  return (
    <>
      <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="lazyOnload" />

      <div className="min-h-screen bg-bg-base relative flex flex-col items-center justify-center p-4 md:p-6 overflow-y-auto py-12">
        {/* Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-amber/5 filter blur-[100px] opacity-40 pointer-events-none z-0" />

        {/* Back Link to survey */}
        {!isLoading && (
          <button
            onClick={() => router.back()}
            className="absolute top-6 left-6 flex items-center gap-2 text-text-muted hover:text-text-primary text-sm font-semibold transition-colors duration-150 outline-none select-none z-10 cursor-pointer"
          >
            <ArrowLeft size={16} />
            Back to Survey
          </button>
        )}

        {/* Form Card */}
        <div className="w-full max-w-[440px] z-1 mt-8 md:mt-0">
          <div className="mb-6 flex flex-col items-center gap-2">
            <BraincheckLogo size={36} />
            <span className="font-sans font-bold text-lg text-text-primary tracking-tight">
              Brain<span className="text-amber">check</span>
            </span>
          </div>

          <GlassCard gradientBorder={true} className="p-6 md:p-8">
            {isLoading ? (
              <div className="py-10 flex flex-col items-center justify-center gap-6 text-center">
                {/* 3D Flipping Book Page-Turn Loader */}
                <div className="relative w-14 h-10 flex items-center justify-center mb-2 perspective-[200px] transform-gpu">
                  {/* Left stationary page */}
                  <div className="absolute right-1/2 w-6 h-8 border-t border-b border-l border-amber/35 bg-bg-mid/60 rounded-l-sm" />
                  {/* Right stationary page */}
                  <div className="absolute left-1/2 w-6 h-8 border-t border-b border-r border-amber/35 bg-bg-mid/60 rounded-r-sm" />
                  {/* Spine line */}
                  <div className="absolute w-[1px] h-9 bg-amber/50" />
                  {/* Flipping page */}
                  <motion.div
                    style={{ transformOrigin: "left center" }}
                    animate={{
                      rotateY: [0, -180, 0],
                    }}
                    transition={{
                      duration: 2.2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="absolute left-1/2 w-6 h-8 border-t border-b border-r border-amber/55 bg-bg-mid rounded-r-sm z-10"
                  />
                </div>
                <h3 className="font-serif font-semibold text-lg text-text-primary mt-1">
                  {loadingStep === "preparing" ? "Connecting..." : "Almost done..."}
                </h3>
                <p className="text-text-muted text-xs leading-relaxed max-w-[32ch]">
                  {loadingStep === "preparing"
                    ? "Please wait. Your answers are safe."
                    : "We are making your report. Please wait."}
                </p>
              </div>
            ) : (
              <>
                <h2 className="font-serif font-semibold text-xl md:text-2xl text-text-primary mb-2 text-center">
                  One last step
                </h2>
                <p className="text-text-muted text-xs md:text-sm text-center mb-6 leading-relaxed">
                  Tell us where to send your results.
                </p>

                {/* Error Message */}
                {serverError && (
                  <div className="mb-5 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-xs md:text-sm leading-normal">
                    {serverError}
                  </div>
                )}

                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
                  {/* Name field */}
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="name" className="text-xs font-semibold text-text-muted uppercase tracking-wider">
                      Your Name
                    </label>
                    <input
                      id="name"
                      type="text"
                      placeholder="John Doe"
                      className={`px-4 py-3 bg-bg-mid/50 border ${
                        errors.name ? "border-red-500/50 focus:border-red-500 focus:ring-red-500/20" : "border-white/8 focus:border-amber/55 focus:ring-amber/15"
                      } rounded-xl text-text-primary text-sm outline-none transition-all duration-200 focus:ring-4 placeholder-text-muted/40`}
                      {...register("name")}
                    />
                    {errors.name && <span className="text-red-400 text-xs mt-0.5">{errors.name.message}</span>}
                  </div>

                  {/* Email field */}
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="email" className="text-xs font-semibold text-text-muted uppercase tracking-wider">
                      Email Address
                    </label>
                    <input
                      id="email"
                      type="email"
                      placeholder="john@example.com"
                      className={`px-4 py-3 bg-bg-mid/50 border ${
                        errors.email ? "border-red-500/50 focus:border-red-500 focus:ring-red-500/20" : "border-white/8 focus:border-amber/55 focus:ring-amber/15"
                      } rounded-xl text-text-primary text-sm outline-none transition-all duration-200 focus:ring-4 placeholder-text-muted/40`}
                      {...register("email")}
                    />
                    {errors.email && <span className="text-red-400 text-xs mt-0.5">{errors.email.message}</span>}
                  </div>

                  {/* Consent checkbox */}
                  <div className="flex items-start gap-3 mt-2">
                    <input
                      id="consent"
                      type="checkbox"
                      className="mt-1 h-4 w-4 rounded border-white/20 bg-white/5 text-amber focus:ring-amber focus:ring-offset-bg-base outline-none cursor-pointer"
                      {...register("consent")}
                    />
                    <div className="flex flex-col gap-1">
                      <label htmlFor="consent" className="text-xs text-text-muted leading-relaxed cursor-pointer select-none">
                        Answers are deleted after sending my results.
                      </label>
                      {errors.consent && <span className="text-red-400 text-xs">{errors.consent.message}</span>}
                    </div>
                  </div>

                  {/* Submit Button */}
                  <GradientButton
                    type="submit"
                    isLoading={isLoading}
                    variant="primary"
                    className="w-full mt-4 flex items-center justify-center gap-2 py-3.5"
                  >
                    <CreditCard size={18} />
                    Pay ₹49 and Get My Report
                  </GradientButton>

                  <span className="text-[10px] text-text-muted/75 text-center leading-normal mt-2">
                    Your details are secure and private.
                  </span>
                </form>
              </>
            )}
          </GlassCard>
        </div>
      </div>
    </>
  );
}
