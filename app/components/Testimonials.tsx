"use client";

import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "../components/ui/button";
import Image from "next/image";

const testimonials = [
  {
    name: "Sarah Johnson",
    position: "UX Designer at Adobe",
    photo: "/img1.png",
    quote:
      "JobSpark AI helped me land my dream job at Adobe. The AI-powered resume builder highlighted my strongest skills, and I received 3 interview requests within a week!",
    rating: 5,
  },
  {
    name: "Michael Chen",
    position: "Software Engineer at Microsoft",
    photo: "/img2.png",
    quote:
      "After months of struggling, JobSpark's tailored job matches and personalized cover letter templates completely transformed my job search. I'm now working at Microsoft!",
    rating: 5,
  },
  {
    name: "Emily Rodriguez",
    position: "Marketing Manager at Spotify",
    photo: "/img3.png",
    quote:
      "The one-click apply feature saved me countless hours. I could apply to multiple positions that matched my profile with just a few clicks. Landed a job at Spotify in just 3 weeks!",
    rating: 5,
  },
];

const Testimonials = () => {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);

  const next = () => {
    setDirection(1);
    setCurrent((current + 1) % testimonials.length);
  };

  const previous = () => {
    setDirection(-1);
    setCurrent((current - 1 + testimonials.length) % testimonials.length);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setDirection(1);
      setCurrent((current + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [current]);

  const variants = {
    enter: (direction: number) => {
      return {
        x: direction > 0 ? 1000 : -1000,
        opacity: 0,
      };
    },
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => {
      return {
        x: direction < 0 ? 1000 : -1000,
        opacity: 0,
      };
    },
  };

  return (
    <section className="w-full flex flex-col items-center py-16 md:py-24 lg:py-32 bg-white dark:bg-black relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(0,0,0,0.03),transparent_70%)] dark:bg-[radial-gradient(circle_at_20%_30%,rgba(255,255,255,0.03),transparent_70%)]"></div>

      <div className="container px-4 md:px-6 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="flex flex-col items-center justify-center space-y-4 text-center mb-16"
        >
          <div className="space-y-2">
            <div className="inline-flex items-center rounded-full border border-black px-3 py-1 text-sm text-black dark:border-white dark:text-white mb-4">
              <Quote className="mr-1 h-3.5 w-3.5" />
              <span>Client Success Stories</span>
            </div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-black dark:text-white">
              Success Stories
            </h2>
            <p className="max-w-[700px] text-gray-600 md:text-xl/relaxed dark:text-gray-400">
              Hear from professionals who&quot;ve transformed their careers with
              JobSpark AI.
            </p>
          </div>
        </motion.div>

        <div className="mx-auto max-w-5xl">
          <div className="relative">
            <motion.div
              key={current}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 },
              }}
              className="relative overflow-hidden rounded-xl bg-gradient-to-br from-white to-gray-50 p-8 md:p-12 shadow-xl dark:from-gray-900 dark:to-black dark:border dark:border-gray-800"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-black/5 rounded-full -translate-y-1/2 translate-x-1/2 dark:bg-white/5"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-black/5 rounded-full translate-y-1/2 -translate-x-1/2 dark:bg-white/5"></div>

              <div className="grid items-center gap-6 md:grid-cols-[1fr_200px]">
                <div className="flex flex-col justify-between space-y-4">
                  <div className="space-y-3">
                    <div className="flex gap-1">
                      {[...Array(testimonials[current].rating)].map((_, i) => (
                        <Star
                          key={i}
                          className="h-5 w-5 fill-black text-black dark:fill-white dark:text-white"
                        />
                      ))}
                    </div>
                    <div className="relative">
                      <Quote className="absolute top-0 left-0 h-10 w-10 text-black/10 dark:text-white/10 -translate-x-4 -translate-y-4" />
                      <p className="text-lg font-medium md:text-xl text-gray-800 dark:text-gray-200 italic">
                        &quot;{testimonials[current].quote}&quot;
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 pt-4">
                    <div>
                      <h3 className="font-bold text-black dark:text-white">
                        {testimonials[current].name}
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {testimonials[current].position}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex justify-center md:justify-end">
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.4 }}
                    className="relative h-36 w-36 overflow-hidden rounded-full border-4 border-gray-200 dark:border-gray-800 shadow-lg"
                  >
                    <Image
                      width={150}
                      height={150}
                      src={testimonials[current].photo}
                      alt={testimonials[current].name}
                      className="object-cover h-full w-full"
                    />
                  </motion.div>
                </div>
              </div>
            </motion.div>

            <div className="mt-12 flex justify-center gap-4">
              <Button
                variant="outline"
                size="icon"
                onClick={previous}
                className="rounded-full border border-gray-300 text-black hover:bg-gray-100 hover:text-black dark:border-gray-700 dark:text-white dark:hover:bg-gray-800 dark:hover:text-white shadow-sm"
              >
                <ChevronLeft className="h-5 w-5" />
                <span className="sr-only">Previous</span>
              </Button>
              <div className="flex gap-2 items-center">
                {testimonials.map((_, index) => (
                  <motion.button
                    key={index}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setCurrent(index)}
                    className={`h-3 w-${
                      index === current ? "10" : "3"
                    } rounded-full transition-all duration-300 ${
                      index === current
                        ? "bg-black dark:bg-white"
                        : "bg-gray-300 dark:bg-gray-700"
                    }`}
                  ></motion.button>
                ))}
              </div>
              <Button
                variant="outline"
                size="icon"
                onClick={next}
                className="rounded-full border border-gray-300 text-black hover:bg-gray-100 hover:text-black dark:border-gray-700 dark:text-white dark:hover:bg-gray-800 dark:hover:text-white shadow-sm"
              >
                <ChevronRight className="h-5 w-5" />
                <span className="sr-only">Next</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
