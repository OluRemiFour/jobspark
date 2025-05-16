"use client";
import React from "react";
// import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { motion } from "framer-motion";
import { Check, Briefcase, Award, Users } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Button } from "../components/ui/button";
import Link from "next/link";
const page = () => {
  const features = [
    {
      icon: <Briefcase className="h-10 w-10 text-jobspark-500" />,
      title: "AI-Powered Job Matching",
      description:
        "Our sophisticated algorithms match your skills, experience, and preferences with the perfect job opportunities.",
    },
    {
      icon: <Award className="h-10 w-10 text-jobspark-500" />,
      title: "Smart Resume Builder",
      description:
        "Create professional, ATS-optimized resumes and cover letters tailored to specific job listings.",
    },
    {
      icon: <Users className="h-10 w-10 text-jobspark-500" />,
      title: "Interview Preparation",
      description:
        "Practice with our AI interviewer that simulates real interviews and provides feedback.",
    },
  ];
  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* <Navbar /> */}

      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-20 border-gray-200 dark:border-gray-800">
          <div className="container px-4 mx-auto">
            <div className="flex flex-col md:flex-row items-center gap-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="flex-1 space-y-6"
              >
                <h1 className="text-4xl md:text-5xl font-bold">
                  Reimagine Your Job Search
                </h1>
                <p className="text-xl text-gray-600 dark:text-gray-400">
                  JobSpark AI combines cutting-edge technology with personalized
                  career guidance to help you land your dream job faster.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link href="/signup">
                    <Button size="lg" className="rounded-full">
                      Get Started for Free
                    </Button>
                  </Link>
                  <Link href="/pricing">
                    <Button
                      variant="outline"
                      size="lg"
                      className="rounded-full"
                    >
                      View Plans
                    </Button>
                  </Link>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="flex-1"
              >
                <img
                  src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                  alt="Person using JobSpark AI"
                  className="rounded-lg shadow-2xl"
                />
              </motion.div>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="py-20">
          <div className="container px-4 mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16 max-w-3xl mx-auto"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Features Designed for Job Seekers
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-400">
                From finding the right opportunities to landing the offer,
                we&apos;ve built tools that make every step of your job search
                journey more effective.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="h-full bg-white dark:bg-gray-900 transition-transform hover:-translate-y-2 duration-300 border-2 dark:border-gray-800">
                    <CardHeader>
                      <div className="mb-4">{feature.icon}</div>
                      <CardTitle className="text-2xl">
                        {feature.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-base">
                        {feature.description}
                      </CardDescription>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Feature Details */}
        <section className="py-20 bg-gray-50 dark:bg-gray-900">
          <div className="container px-4 mx-auto">
            <div className="flex flex-col space-y-20">
              {/* Feature Item 1 */}
              <div className="flex flex-col md:flex-row items-center gap-12">
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="flex-1"
                >
                  <img
                    src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                    alt="AI Job Matching"
                    className="rounded-lg shadow-lg"
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="flex-1 space-y-6"
                >
                  <h3 className="text-3xl font-bold">
                    AI-Powered Job Matching
                  </h3>
                  <p className="text-lg text-gray-600 dark:text-gray-400">
                    Our intelligent algorithms analyze thousands of job listings
                    in real-time, matching them with your skills, experience,
                    and preferences to find opportunities that are perfect for
                    you.
                  </p>
                  <ul className="space-y-3">
                    {[
                      "Personalized job recommendations based on your profile",
                      "Real-time job market insights and salary information",
                      "Custom alerts for new opportunities that match your criteria",
                      "Skill gap analysis with recommendations for improvement",
                    ].map((item, i) => (
                      <li key={i} className="flex items-start">
                        <Check className="h-6 w-6 text-green-500 mr-2 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </div>

              {/* Feature Item 2 */}
              <div className="flex flex-col md:flex-row-reverse items-center gap-12">
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="flex-1"
                >
                  <img
                    src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                    alt="Smart Resume Builder"
                    className="rounded-lg shadow-lg"
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="flex-1 space-y-6"
                >
                  <h3 className="text-3xl font-bold">Smart Resume Builder</h3>
                  <p className="text-lg text-gray-600 dark:text-gray-400">
                    Create professional, ATS-optimized resumes in minutes with
                    our intuitive builder that highlights your strengths and
                    makes you stand out to employers.
                  </p>
                  <ul className="space-y-3">
                    {[
                      "ATS-friendly templates designed by hiring professionals",
                      "AI-powered content suggestions tailored to specific jobs",
                      "Keyword optimization to pass applicant tracking systems",
                      "One-click customization for different job applications",
                    ].map((item, i) => (
                      <li key={i} className="flex items-start">
                        <Check className="h-6 w-6 text-green-500 mr-2 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20">
          <div className="container px-4 mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="max-w-3xl mx-auto text-center"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Ready to Transform Your Job Search?
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
                Join thousands of professionals who are landing their dream jobs
                faster with JobSpark AI.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link href="/signup">
                  <Button size="lg" className="rounded-full px-8">
                    Get Started for Free
                  </Button>
                </Link>
                <Link href="/pricing">
                  <Button
                    variant="outline"
                    size="lg"
                    className="rounded-full px-8"
                  >
                    Compare Plans
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default page;
