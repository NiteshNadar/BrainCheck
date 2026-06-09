"use client";

import React from "react";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";

export default function PrivacyPage() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1,
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
    <>
      <Navbar />
      <main className="flex-grow pt-32 pb-24 bg-bg-base relative overflow-hidden">
        {/* Glow */}
        <div className="absolute top-0 left-0 w-[500px] h-[500px] rounded-full bg-amber/5 filter blur-[120px] opacity-40 pointer-events-none -translate-x-1/4 -translate-y-1/4 z-0" />

        <div className="max-w-[720px] mx-auto px-6 relative z-10">
          {/* Back to Home Button */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="mb-6"
          >
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-text-muted hover:text-text-primary text-sm font-medium transition-colors duration-200 outline-none focus-visible:ring-1 focus-visible:ring-amber rounded py-1 px-2 -ml-2"
            >
              <ArrowLeft size={15} className="text-amber/80" />
              <span>Back to Home</span>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="text-left mb-12 border-b border-white/10 pb-8"
          >
            <h1 className="font-serif font-bold text-3xl md:text-5xl text-text-primary mb-4 leading-tight">
              Privacy Policy
            </h1>
            <p className="text-text-muted text-sm md:text-base leading-relaxed max-w-[55ch]">
              Last updated: June 6, 2026. Clear, plain-English guidelines on how we protect your information.
            </p>
          </motion.div>

          {/* Editorial Article Layout */}
          <div className="max-w-[680px] mx-auto">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="flex flex-col gap-10 text-text-muted text-sm md:text-base"
            >
              {/* Section 1 */}
              <motion.div
                variants={itemVariants}
                className="flex flex-col gap-3 cursor-default"
              >
                <h2 className="font-serif font-semibold text-lg md:text-xl text-text-primary mb-1">
                  1. Zero Permanent Storage
                </h2>
                <ul className="flex flex-col gap-2.5 text-sm pl-1">
                  <li className="flex items-start gap-2.5">
                    <span className="text-amber mt-1.5 shrink-0 block w-1.5 h-1.5 rounded-full bg-amber/50" />
                    <span>We never save your answers to a database.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-amber mt-1.5 shrink-0 block w-1.5 h-1.5 rounded-full bg-amber/50" />
                    <span>We don&apos;t log your IP address or
                      track your visit.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-amber mt-1.5 shrink-0 block w-1.5 h-1.5 rounded-full bg-amber/50" />
                    <span>Your answers are deleted the moment
                      your results are sent.</span>
                  </li>
                </ul>
              </motion.div>

              {/* Section 2 */}
              <motion.div
                variants={itemVariants}
                className="flex flex-col gap-3 cursor-default"
              >
                <h2 className="font-serif font-semibold text-lg md:text-xl text-text-primary mb-1">
                  2. How We Process Your Assessment
                </h2>
                <ul className="flex flex-col gap-2.5 text-sm pl-1">
                  <li className="flex items-start gap-2.5">
                    <span className="text-amber mt-1.5 shrink-0 block w-1.5 h-1.5 rounded-full bg-amber/50" />
                    <span>We save your answers in your browser
                      so you don&apos;t lose your progress.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-amber mt-1.5 shrink-0 block w-1.5 h-1.5 rounded-full bg-amber/50" />
                    <span>Payments are processed securely.
                      We never see your card details.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-amber mt-1.5 shrink-0 block w-1.5 h-1.5 rounded-full bg-amber/50" />
                    <span>We calculate your scores, write your report,
                      and email it to you.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-amber mt-1.5 shrink-0 block w-1.5 h-1.5 rounded-full bg-amber/50" />
                    <span>After delivery, we erase your name, email,
                      and answers from our system.</span>
                  </li>
                </ul>
              </motion.div>

              {/* Section 3 */}
              <motion.div
                variants={itemVariants}
                className="flex flex-col gap-3 cursor-default"
              >
                <h2 className="font-serif font-semibold text-lg md:text-xl text-text-primary mb-1">
                  3. Secure Transaction Records
                </h2>
                <ul className="flex flex-col gap-2.5 text-sm pl-1">
                  <li className="flex items-start gap-2.5">
                    <span className="text-amber mt-1.5 shrink-0 block w-1.5 h-1.5 rounded-full bg-amber/50" />
                    <span>Safe payment systems keep a record
                      to confirm the transaction.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-amber mt-1.5 shrink-0 block w-1.5 h-1.5 rounded-full bg-amber/50" />
                    <span>We do not store your card or bank details
                      on our servers.</span>
                  </li>
                </ul>
              </motion.div>

              {/* Section 4 */}
              <motion.div
                variants={itemVariants}
                className="flex flex-col gap-3 cursor-default"
              >
                <h2 className="font-serif font-semibold text-lg md:text-xl text-text-primary mb-1">
                  4. Zero Marketing or Advertising
                </h2>
                <ul className="flex flex-col gap-2.5 text-sm pl-1">
                  <li className="flex items-start gap-2.5">
                    <span className="text-amber mt-1.5 shrink-0 block w-1.5 h-1.5 rounded-full bg-amber/50" />
                    <span>We use your email exactly once:
                      to send your results.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-amber mt-1.5 shrink-0 block w-1.5 h-1.5 rounded-full bg-amber/50" />
                    <span>No marketing emails, no newsletters,
                      no selling your data. Ever.</span>
                  </li>
                </ul>
              </motion.div>

              {/* Section 5 */}
              <motion.div
                variants={itemVariants}
                className="flex flex-col gap-3 cursor-default"
              >
                <h2 className="font-serif font-semibold text-lg md:text-xl text-text-primary mb-1">
                  5. Contact Support
                </h2>
                <p className="mb-1 max-w-[62ch]">
                  If your results haven&apos;t arrived in a few minutes,
                  check your spam folder or email us:
                </p>
                <p className="text-text-primary">
                  Email support:{" "}
                  <a
                    href="mailto:brainchecksupport@gmail.com"
                    className="text-terracotta hover:text-terracotta-light font-semibold transition-colors underline outline-none focus-visible:ring-1 focus-visible:ring-terracotta rounded"
                  >
                    brainchecksupport@gmail.com
                  </a>
                </p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
