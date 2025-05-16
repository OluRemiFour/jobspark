import { ArrowRightIcon, CheckCircle2, Sparkles } from "lucide-react";
import { Button } from "../components/ui/button";
import Link from "next/link";

const Hero = () => {
  return (
    <div className="w-full py-16 md:py-16 lg:py-22 flex flex-col items-center bg-black text-white dark:bg-white dark:text-black">
      <div className="container px-4 md:px-6">
        <div className="grid gap-10 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
          <div className="flex flex-col justify-center space-y-5">
            <div className="inline-block rounded-lg bg-white/10 px-3 py-1 text-sm text-white animate-fade-in mb-2 dark:bg-black/10 dark:text-black">
              <Sparkles className="inline-block mr-1 h-4 w-4" /> AI-Powered Job
              Platform
            </div>
            <div className="space-y-4">
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
                Find Your Dream Job
                <span className="block mt-2 text-white/80 pb-3 w-fit dark:text-black/80">
                  Powered by AI
                </span>
              </h1>
              <p className="max-w-[600px] text-white/70 md:text-xl/relaxed lg:text-xl/relaxed xl:text-2xl/relaxed dark:text-black/70">
                JobSpark AI streamlines your job search with personalized
                matches, smart resume building, and interview preparation.
              </p>
            </div>
            <div className="flex flex-col gap-3 min-[400px]:flex-row mt-2">
              <Link href="/login">
                <Button className="bg-white cursor-pointer hover:bg-gray-100 text-black dark:bg-black dark:hover:bg-gray-800 dark:text-white w-full min-[400px]:w-auto">
                  Get Started
                  <ArrowRightIcon className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/explore">
                <Button
                  variant="outline"
                  className="border-white cursor-pointer text-white dark:border-black dark:text-black w-full min-[400px]:w-auto"
                >
                  Explore Features
                </Button>
              </Link>
            </div>
            <div className="flex flex-wrap items-center gap-4 text-sm text-white/80 dark:text-black/80 mt-2">
              <div className="flex items-center gap-1">
                <CheckCircle2 className="h-4 w-4 text-white dark:text-black" />
                <span>AI-Matched Jobs</span>
              </div>
              <div className="flex items-center gap-1">
                <CheckCircle2 className="h-4 w-4 text-white dark:text-black" />
                <span>Smart Resume Builder</span>
              </div>
              <div className="flex items-center gap-1">
                <CheckCircle2 className="h-4 w-4 text-white dark:text-black" />
                <span>Interview Preparation</span>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <div className="relative w-full h-[450px] rounded-xl overflow-hidden shadow-xl animate-slide-up">
              <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900 dark:from-gray-100 dark:to-gray-200">
                <div className="absolute inset-0 flex flex-col items-center justify-center p-6">
                  <div
                    className="w-full max-w-md bg-white/10 backdrop-blur-md rounded-xl shadow-lg p-6 animate-fade-in dark:bg-black/10"
                    style={{ animationDelay: "0.3s" }}
                  >
                    <div className="text-xl font-semibold mb-4 text-white dark:text-black">
                      Software Developer
                    </div>
                    <div className="text-sm text-white/70 mb-6 dark:text-black/70">
                      Google • San Francisco, CA • Remote
                    </div>
                    <div className="flex flex-wrap gap-2 mb-4">
                      <span className="px-2 py-1 rounded-full bg-white/20 text-white text-xs dark:bg-black/20 dark:text-black">
                        React
                      </span>
                      <span className="px-2 py-1 rounded-full bg-white/20 text-white text-xs dark:bg-black/20 dark:text-black">
                        TypeScript
                      </span>
                      <span className="px-2 py-1 rounded-full bg-white/20 text-white text-xs dark:bg-black/20 dark:text-black">
                        Node.js
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-white dark:text-black">
                        95% Match
                      </span>
                      <Button
                        size="sm"
                        className="bg-white text-black hover:bg-gray-100 dark:bg-black dark:text-white dark:hover:bg-gray-800"
                      >
                        Apply Now
                      </Button>
                    </div>
                  </div>
                  <div className="w-full max-w-md mt-6">
                    <div className="flex justify-between mb-2 text-white dark:text-black">
                      <div className="text-sm font-medium">
                        Resume Completion
                      </div>
                      <div className="text-sm font-medium">85%</div>
                    </div>
                    <div className="w-full bg-white/30 rounded-full h-2.5 dark:bg-black/30">
                      <div
                        className="bg-white h-2.5 rounded-full dark:bg-black"
                        style={{ width: "85%" }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
