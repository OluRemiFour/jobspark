"use client";
import { motion } from "framer-motion";
import { Check, DollarSign, Star, Users } from "lucide-react";
import Link from "next/link";
import Footer from "../components/Footer";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Separator } from "../components/ui/separator";
import Image from "next/image";

const Employers = () => {
  const benefits = [
    {
      icon: <Users className="h-10 w-10 text-jobspark-500" />,
      title: "Talent Pipeline",
      description:
        "Access a curated pool of pre-screened candidates with verified skills and experience.",
    },
    {
      icon: <Star className="h-10 w-10 text-jobspark-500" />,
      title: "Smart Matching",
      description:
        "Our AI matches the right candidates to your jobs based on skills, experience, and cultural fit.",
    },
    {
      icon: <DollarSign className="h-10 w-10 text-jobspark-500" />,
      title: "Cost Effective",
      description:
        "Save time and money with faster hiring cycles and reduced recruitment costs.",
    },
  ];

  const testimonials = [
    {
      quote:
        "'JobSpark AI has revolutionized our hiring process. We've reduced our time-to-hire by 40% and improved quality of hire significantly.'",
      author: "Sarah Johnson",
      title: "Head of Talent Acquisition",
      company: "TechCorp Inc.",
    },
    {
      quote:
        "'The quality of candidates we get through JobSpark AI is consistently high. Their AI matching technology is incredibly accurate.'",
      author: "Michael Chen",
      title: "Recruiting Manager",
      company: "InnovateCo",
    },
    {
      quote:
        "'We've saved thousands in recruitment costs while improving our hiring outcomes. JobSpark AI delivers on its promises.'",
      author: "Jessica Williams",
      title: "HR Director",
      company: "Global Systems",
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
                  Transform Your Hiring Process
                </h1>
                <p className="text-xl text-gray-600 dark:text-gray-400">
                  Find the right talent faster with our AI-powered recruitment
                  platform tailored for employers.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link href="/employers/signup">
                    <Button size="lg" className="rounded-full">
                      Post a Job
                    </Button>
                  </Link>
                  <Button variant="outline" size="lg" className="rounded-full">
                    <Link href="/employers/demo">Schedule a Demo</Link>
                  </Button>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="flex-1"
              >
                <img
                  src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                  alt="Recruitment Analytics Dashboard"
                  className="rounded-lg shadow-2xl"
                />
              </motion.div>
            </div>
          </div>
        </section>

        {/* Benefits Grid */}
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
                Why Employers Choose JobSpark AI
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-400">
                Our platform is designed to streamline your recruitment process,
                reduce costs, and find better candidates faster.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="h-full bg-white dark:bg-gray-900 transition-transform hover:-translate-y-2 duration-300 border-2 dark:border-gray-800">
                    <CardHeader>
                      <div className="mb-4">{benefit.icon}</div>
                      <CardTitle className="text-2xl">
                        {benefit.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-base">
                        {benefit.description}
                      </CardDescription>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-20 bg-gray-50 dark:bg-gray-900">
          <div className="container px-4 mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16 max-w-3xl mx-auto"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                How It Works
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-400">
                A simple, streamlined process to find the perfect candidates for
                your open positions.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {[
                {
                  step: "01",
                  title: "Create Your Account",
                  description:
                    "Sign up and create your company profile with your recruitment needs and culture.",
                },
                {
                  step: "02",
                  title: "Post Jobs",
                  description:
                    "Create detailed job listings with skills, experience, and other requirements.",
                },
                {
                  step: "03",
                  title: "Get Matched",
                  description:
                    "Our AI identifies and ranks the best candidates for your open positions.",
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex flex-col items-center text-center"
                >
                  <div className="w-16 h-16 rounded-full bg-black dark:bg-white text-white dark:text-black flex items-center justify-center text-2xl font-bold mb-6">
                    {item.step}
                  </div>
                  <h3 className="text-2xl font-bold mb-3">{item.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {item.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Features List */}
        <section className="py-20">
          <div className="container px-4 mx-auto">
            <div className="flex flex-col md:flex-row items-center gap-12">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="flex-1 space-y-6"
              >
                <h3 className="text-3xl font-bold">
                  Powerful Employer Features
                </h3>
                <p className="text-lg text-gray-600 dark:text-gray-400">
                  Everything you need to streamline your recruitment process and
                  find the best candidates.
                </p>
                <ul className="space-y-4">
                  {[
                    "AI-powered candidate matching",
                    "Automated screening and shortlisting",
                    "Video interview platform",
                    "Collaborative hiring tools",
                    "Advanced analytics and reporting",
                    "Employer branding solutions",
                    "Integration with ATS systems",
                  ].map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <Check className="h-6 w-6 text-green-500 mr-2 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="flex-1"
              >
                <Image
                  width={600}
                  height={600}
                  src="https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                  alt="Recruitment Dashboard"
                  className="rounded-lg shadow-lg"
                />
              </motion.div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-20 bg-gray-50 dark:bg-gray-900">
          <div className="container px-4 mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16 max-w-3xl mx-auto"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                What Employers Say
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-400">
                Don&apos;t just take our word for it. Here&apos;s what employers
                have to say about JobSpark AI.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="h-full bg-white dark:bg-gray-900">
                    <CardContent className="pt-6">
                      <div className="mb-4 flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className="h-5 w-5 text-yellow-500 fill-yellow-500"
                          />
                        ))}
                      </div>
                      <p className="italic mb-6">
                        &quot{testimonial.quote}&quot
                      </p>
                      <div>
                        <p className="font-semibold">{testimonial.author}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {testimonial.title}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {testimonial.company}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing Preview */}
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
                Flexible Plans for Every Business
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-400">
                Whether you&apos;re a startup or an enterprise, we have a plan
                that suits your needs.
              </p>
            </motion.div>

            <div className="max-w-5xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  {
                    name: "Starter",
                    price: "$99",
                    description: "Perfect for small businesses",
                    features: [
                      "5 active job postings",
                      "Basic AI matching",
                      "Email support",
                      "30-day job visibility",
                    ],
                  },
                  {
                    name: "Growth",
                    price: "$299",
                    description: "For growing teams and companies",
                    features: [
                      "20 active job postings",
                      "Advanced AI matching",
                      "Video interviewing tools",
                      "Priority support",
                      "60-day job visibility",
                      "Candidate assessments",
                    ],
                  },
                  {
                    name: "Enterprise",
                    price: "Custom",
                    description: "For large organizations",
                    features: [
                      "Unlimited job postings",
                      "Premium AI matching",
                      "Full recruiting suite",
                      "Dedicated account manager",
                      "Custom integrations",
                      "Branded career portal",
                    ],
                  },
                ].map((plan, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Card
                      className={`h-full ${
                        index === 1
                          ? "border-2 border-black dark:border-white"
                          : ""
                      }`}
                    >
                      <CardHeader>
                        <CardTitle className="text-2xl">{plan.name}</CardTitle>
                        <CardDescription>{plan.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="mb-6">
                          <span className="text-4xl font-bold">
                            {plan.price}
                          </span>
                          {plan.price !== "Custom" && (
                            <span className="text-gray-500 dark:text-gray-400">
                              /month
                            </span>
                          )}
                        </div>
                        <Separator className="mb-6" />
                        <ul className="space-y-3">
                          {plan.features.map((feature, i) => (
                            <li key={i} className="flex items-start">
                              <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                        <div className="mt-6">
                          <Link href="/employers/signup" className="w-full">
                            <Button className="w-full">
                              {plan.price === "Custom"
                                ? "Contact Sales"
                                : "Get Started"}
                            </Button>
                          </Link>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-black text-white dark:bg-white dark:text-black">
          <div className="container px-4 mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="max-w-3xl mx-auto text-center"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Ready to Transform Your Hiring?
              </h2>
              <p className="text-xl opacity-80 mb-8">
                Join thousands of companies that have improved their hiring
                outcomes with JobSpark AI.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link href="/employers/signup">
                  <Button
                    size="lg"
                    className="rounded-full px-8 bg-white text-black hover:bg-gray-200 dark:bg-black dark:text-white dark:hover:bg-gray-800"
                  >
                    Get Started
                  </Button>
                </Link>
                <Link href="/employers/demo">
                  <Button
                    variant="outline"
                    size="lg"
                    className="rounded-full px-8 border-white text-white hover:bg-white/10 dark:border-black dark:text-black dark:hover:bg-black/10"
                  >
                    Schedule a Demo
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

export default Employers;
