"use client";

import React from "react";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";

export default function TermsPage() {
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
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-amber/5 filter blur-[120px] opacity-30 pointer-events-none translate-x-1/4 -translate-y-1/4 z-0" />

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
              Terms of Use
            </h1>
            <p className="text-text-muted text-sm md:text-base leading-relaxed max-w-[55ch]">
              Last updated: June 6, 2026. Clear, plain-English terms governing our self-assessment service.
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
              {/* Disclaimer Callout */}
              <motion.div
                variants={itemVariants}
                className="text-text-muted text-xs md:text-sm cursor-default pb-6 border-b border-white/5 mb-4"
              >
                <span className="text-amber font-serif font-semibold block mb-2 text-sm uppercase tracking-wider">
                  Wellness Disclaimer
                </span>
                Braincheck is a wellness check-in tool, not a medical test.
                It does not diagnose, treat, or give clinical advice.
                Results are for self-awareness only.
                If you feel you need help, please talk to a doctor or
                mental health professional.
              </motion.div>

              {/* Section 1 */}
              <motion.div
                variants={itemVariants}
                className="flex flex-col gap-3 cursor-default"
              >
                <h2 className="font-serif font-semibold text-lg md:text-xl text-text-primary mb-1">
                  1. Purpose of the Assessment
                </h2>
                <ul className="flex flex-col gap-2.5 text-sm pl-1">
                  <li className="flex items-start gap-2.5">
                    <span className="text-amber mt-1.5 shrink-0 block w-1.5 h-1.5 rounded-full bg-amber/50" />
                    <span>Braincheck helps you check in on five areas of
                      your mental wellness.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-amber mt-1.5 shrink-0 block w-1.5 h-1.5 rounded-full bg-amber/50" />
                    <span>Your results are for your own self-awareness.
                      They are not a clinical opinion.</span>
                  </li>
                </ul>
              </motion.div>

              {/* Section 2 */}
              <motion.div
                variants={itemVariants}
                className="flex flex-col gap-3 cursor-default"
              >
                <h2 className="font-serif font-semibold text-lg md:text-xl text-text-primary mb-1">
                  2. Transactions and Delivery
                </h2>
                <ul className="flex flex-col gap-2.5 text-sm pl-1">
                  <li className="flex items-start gap-2.5">
                    <span className="text-amber mt-1.5 shrink-0 block w-1.5 h-1.5 rounded-full bg-amber/50" />
                    <span>We charge a one-time fee to create and send
                      your results report.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-amber mt-1.5 shrink-0 block w-1.5 h-1.5 rounded-full bg-amber/50" />
                    <span>No subscriptions, no repeat charges, no
                      hidden fees.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-amber mt-1.5 shrink-0 block w-1.5 h-1.5 rounded-full bg-amber/50" />
                    <span>Once your report is sent to your inbox,
                      we cannot issue a refund.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-amber mt-1.5 shrink-0 block w-1.5 h-1.5 rounded-full bg-amber/50" />
                    <span>If your email did not arrive, contact us.
                      We will send it to you again.</span>
                  </li>
                </ul>
              </motion.div>

              {/* Section 3 */}
              <motion.div
                variants={itemVariants}
                className="flex flex-col gap-3 cursor-default"
              >
                <h2 className="font-serif font-semibold text-lg md:text-xl text-text-primary mb-1">
                  3. Email Address and Delivery
                </h2>
                <ul className="flex flex-col gap-2.5 text-sm pl-1">
                  <li className="flex items-start gap-2.5">
                    <span className="text-amber mt-1.5 shrink-0 block w-1.5 h-1.5 rounded-full bg-amber/50" />
                    <span>You must use a real, correctly typed email
                      address to get your results.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-amber mt-1.5 shrink-0 block w-1.5 h-1.5 rounded-full bg-amber/50" />
                    <span>If you type your email wrong, we cannot
                      redeliver to a different address.</span>
                  </li>
                </ul>
              </motion.div>

              {/* Section 4 */}
              <motion.div
                variants={itemVariants}
                className="flex flex-col gap-3 cursor-default"
              >
                <h2 className="font-serif font-semibold text-lg md:text-xl text-text-primary mb-1">
                  4. Limits of Liability
                </h2>
                <ul className="flex flex-col gap-2.5 text-sm pl-1">
                  <li className="flex items-start gap-2.5">
                    <span className="text-amber mt-1.5 shrink-0 block w-1.5 h-1.5 rounded-full bg-amber/50" />
                    <span>Your results are for your information only.
                      Use them as a guide, not a medical decision.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-amber mt-1.5 shrink-0 block w-1.5 h-1.5 rounded-full bg-amber/50" />
                    <span>We are not responsible for any decisions
                      you make based on your results.</span>
                  </li>
                </ul>
              </motion.div>

              {/* Section 5 */}
              <motion.div
                variants={itemVariants}
                className="flex flex-col gap-3 cursor-default"
              >
                <h2 className="font-serif font-semibold text-lg md:text-xl text-text-primary mb-1">
                  5. Get in Touch
                </h2>
                <p className="mb-1 max-w-[62ch]">
                  For support or questions:
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
