import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import OnboardingForm from "../components/OnboardingForm";

const Onboarding = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 py-12 md:py-16 lg:py-20 bg-background">
        <div className="container">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold mb-4">
              Get Started with JobSpark AI
            </h1>
            <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
              Complete your profile to get personalized job recommendations and
              access all features.
            </p>
          </div>
          <OnboardingForm />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Onboarding;
