import React from "react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import Hero from "../components/home/Hero";
import HowItWorks from "../components/home/HowItWorks";
import BenefitCards from "../components/home/BenefitCards";
import PrivacySection from "../components/home/PrivacySection";
import FAQSection from "../components/home/FAQSection";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <HowItWorks />
        <BenefitCards />
        <PrivacySection />
        <FAQSection />
      </main>
      <Footer />
    </>
  );
}
