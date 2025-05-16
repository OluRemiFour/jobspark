"use client";
import React from "react";
// import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs";
import Link from "next/link";

const Pricing = () => {
  const tiers = [
    {
      name: "Free",
      description: "Essential tools to kickstart your job search",
      price: { monthly: "$0", yearly: "$0" },
      isMostPopular: false,
      features: [
        "5 job applications per month",
        "Basic resume builder",
        "Limited AI job matching",
        "Email support",
      ],
      buttonText: "Sign up",
      buttonVariant: "outline",
    },
    {
      name: "Pro",
      description: "Comprehensive tools for active job seekers",
      price: { monthly: "$12", yearly: "$9" },
      isMostPopular: true,
      features: [
        "Unlimited job applications",
        "Advanced resume builder",
        "Full AI job matching",
        "Interview preparation",
        "Priority email support",
        "Job application tracking",
      ],
      buttonText: "Get Started",
      buttonVariant: "default",
    },
    {
      name: "Enterprise",
      description: "Complete career development suite",
      price: { monthly: "$29", yearly: "$24" },
      isMostPopular: false,
      features: [
        "Everything in Pro",
        "Career coaching sessions",
        "Personalized job search strategy",
        "LinkedIn profile optimization",
        "Personal branding assistance",
        "24/7 phone and email support",
      ],
      buttonText: "Contact Us",
      buttonVariant: "outline",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* <Navbar /> */}

      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-20">
          <div className="container px-4 mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center max-w-3xl mx-auto space-y-6"
            >
              <h1 className="text-4xl md:text-5xl font-bold">
                Simple, Transparent Pricing
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-400">
                Choose the plan that fits your needs. All plans include a 14-day
                free trial.
              </p>
            </motion.div>

            {/* Pricing Tabs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-12"
            >
              <Tabs defaultValue="monthly" className="max-w-4xl mx-auto">
                <div className="flex justify-center mb-8">
                  <TabsList className="grid w-[400px] grid-cols-2">
                    <TabsTrigger value="monthly">Monthly Billing</TabsTrigger>
                    <TabsTrigger value="yearly">
                      Yearly Billing
                      <span className="ml-2 rounded-full bg-green-100 dark:bg-green-900 px-2 py-0.5 text-xs text-green-800 dark:text-green-200">
                        Save 20%
                      </span>
                    </TabsTrigger>
                  </TabsList>
                </div>

                {/* Monthly Pricing */}
                <TabsContent value="monthly">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {tiers.map((tier, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
                      >
                        <Card
                          className={`flex flex-col h-full ${
                            tier.isMostPopular
                              ? "border-2 border-black dark:border-black shadow-lg"
                              : ""
                          }`}
                        >
                          {tier.isMostPopular && (
                            <div className="bg-black text-white dark:bg-black rounded-tl-md rounded-tr-md dark:text-white py-3 text-center text-sm font-medium">
                              Most Popular
                            </div>
                          )}
                          <CardHeader>
                            <CardTitle className="text-2xl">
                              {tier.name}
                            </CardTitle>
                            <CardDescription>
                              {tier.description}
                            </CardDescription>
                          </CardHeader>
                          <CardContent className="flex-1">
                            <div className="mt-2 mb-8">
                              <span className="text-4xl font-bold">
                                {tier.price.monthly}
                              </span>
                              <span className="text-gray-500 dark:text-gray-400">
                                /month
                              </span>
                            </div>
                            <ul className="space-y-3">
                              {tier.features.map((feature, i) => (
                                <li key={i} className="flex items-start">
                                  <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                                  <span>{feature}</span>
                                </li>
                              ))}
                            </ul>
                          </CardContent>
                          <CardFooter>
                            <Link href="/signup" className="w-full">
                              <Button
                                variant={
                                  tier.buttonVariant as "default" | "outline"
                                }
                                className={`w-full ${
                                  tier.isMostPopular
                                    ? "bg-black text-white"
                                    : ""
                                }`}
                                size="lg"
                              >
                                {tier.buttonText}
                              </Button>
                            </Link>
                          </CardFooter>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                </TabsContent>

                {/* Yearly Pricing */}
                <TabsContent value="yearly">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {tiers.map((tier, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
                      >
                        <Card
                          className={`flex flex-col h-full ${
                            tier.isMostPopular
                              ? "border-2 border-black dark:border-black shadow-lg"
                              : ""
                          }`}
                        >
                          {tier.isMostPopular && (
                            <div className="bg-black text-white dark:bg-black rounded-tl-md rounded-tr-md dark:text-white py-3 text-center text-sm font-medium">
                              Most Popular
                            </div>
                          )}
                          <CardHeader>
                            <CardTitle className="text-2xl">
                              {tier.name}
                            </CardTitle>
                            <CardDescription>
                              {tier.description}
                            </CardDescription>
                          </CardHeader>
                          <CardContent className="flex-1">
                            <div className="mt-2 mb-8">
                              <span className="text-4xl font-bold">
                                {tier.price.yearly}
                              </span>
                              <span className="text-gray-500 dark:text-gray-400">
                                /month
                              </span>
                            </div>
                            <ul className="space-y-3">
                              {tier.features.map((feature, i) => (
                                <li key={i} className="flex items-start">
                                  <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                                  <span>{feature}</span>
                                </li>
                              ))}
                            </ul>
                          </CardContent>
                          <CardFooter>
                            <Link href="/signup" className="w-full">
                              <Button
                                variant={
                                  tier.buttonVariant as "default" | "outline"
                                }
                                className={`w-full ${
                                  tier.isMostPopular
                                    ? "text-white bg-black"
                                    : ""
                                }`}
                                size="lg"
                              >
                                {tier.buttonText}
                              </Button>
                            </Link>
                          </CardFooter>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </motion.div>
          </div>
        </section>

        {/* FAQs Section */}
        <section className="py-20 bg-gray-50 dark:bg-gray-900">
          <div className="container px-4 mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center max-w-2xl mx-auto mb-12"
            >
              <h2 className="text-3xl md:text-4xl text-white font-bold mb-6">
                Frequently Asked Questions
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-400">
                Everything you need to know about our pricing and plans.
              </p>
            </motion.div>

            <div className="max-w-3xl mx-auto">
              {[
                {
                  question: "Can I switch plans later?",
                  answer:
                    "Yes, you can upgrade, downgrade, or cancel your plan at any time. Changes to your subscription will take effect immediately.",
                },
                {
                  question: "Do you offer discounts for students?",
                  answer:
                    "Yes, we offer a 50% discount for students with a valid student email address. Contact our support team to verify your student status.",
                },
                {
                  question: "How does the 14-day trial work?",
                  answer:
                    "Your 14-day trial gives you full access to all features of the Pro plan. No credit card is required to start your trial, and you can upgrade to a paid plan at any time.",
                },
                {
                  question: "What payment methods do you accept?",
                  answer:
                    "We accept all major credit cards, PayPal, and Apple Pay. For enterprise plans, we can also arrange invoicing.",
                },
                {
                  question: "Can I get a refund if I'm not satisfied?",
                  answer:
                    "Yes, we offer a 30-day money-back guarantee. If you're not completely satisfied with your paid plan, contact our support team for a full refund.",
                },
              ].map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="mb-6 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm"
                >
                  <h3 className="text-xl font-semibold text-gray-200 mb-3">
                    {faq.question}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {faq.answer}
                  </p>
                </motion.div>
              ))}
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
                Ready to Start Your Job Search Journey?
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
                Try JobSpark AI for free for 14 days. No credit card required.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link href="/signup">
                  <Button size="lg" className="rounded-full px-8">
                    Start Your Free Trial
                  </Button>
                </Link>
                <Button
                  variant="outline"
                  size="lg"
                  className="rounded-full px-8"
                >
                  <Link href="/contact">Contact Sales</Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Pricing;
