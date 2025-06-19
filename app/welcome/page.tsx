"use client";
import React from "react";
import Hero from "../components/Hero";
import Features from "../components/Features";
import Stats from "../components/Stats";
import Testimonials from "../components/Testimonials";
import CTA from "../components/CTA";
import Footer from "../components/Footer";
import AIAssistant from "../components/AIAssistant";

const Welcome = () => {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      {/* <Navbar /> */}
      <main className="flex-1">
        <Hero />
        <Features />
        <Stats />
        <Testimonials />
        <CTA />
      </main>
      <Footer />
      <AIAssistant />
    </div>
  );
};

export default Welcome;
