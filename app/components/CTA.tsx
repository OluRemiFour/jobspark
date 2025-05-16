import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "../components/ui/button";
import Link from "next/link";

const CTA = () => {
  return (
    <section className="w-full flex flex-col items-center py-16 md:py-24 lg:py-32 bg-black text-white dark:bg-white dark:text-black relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.1),rgba(0,0,0,0))] dark:bg-[radial-gradient(circle_at_30%_50%,rgba(0,0,0,0.1),rgba(255,255,255,0))]"></div>

      {/* Animated sparkles */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: [0.4, 0.8, 0.4] }}
        transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
        className="absolute top-1/4 left-1/4 w-2 h-2 bg-white dark:bg-black rounded-full"
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: [0.3, 0.7, 0.3] }}
        transition={{
          repeat: Infinity,
          duration: 4,
          ease: "easeInOut",
          delay: 1,
        }}
        className="absolute top-1/3 right-1/4 w-3 h-3 bg-white dark:bg-black rounded-full"
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: [0.2, 0.5, 0.2] }}
        transition={{
          repeat: Infinity,
          duration: 5,
          ease: "easeInOut",
          delay: 0.5,
        }}
        className="absolute bottom-1/4 left-1/3 w-2 h-2 bg-white dark:bg-black rounded-full"
      />

      <div className="container px-4 md:px-6 relative z-10">
        <div className="flex flex-col items-center justify-center space-y-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="space-y-4 max-w-3xl"
          >
            <div className="inline-flex items-center justify-center rounded-full bg-white/10 px-3 py-1 text-sm text-white dark:bg-black/10 dark:text-black mb-4">
              <Sparkles className="mr-1 h-3.5 w-3.5" />
              <span>Start Your Career Journey</span>
            </div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
              Ready to Land Your Dream Job?
            </h2>
            <p className="mx-auto max-w-[800px] text-white/80 md:text-xl/relaxed lg:text-xl/relaxed xl:text-2xl/relaxed dark:text-black/80">
              Join thousands of professionals who&apos;ve transformed their
              careers with JobSpark AI.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="flex flex-col gap-4 min-[400px]:flex-row"
          >
            <Link href="/onboarding">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  size="lg"
                  className="bg-white text-black hover:bg-gray-100 dark:bg-black dark:text-white dark:hover:bg-gray-900 text-lg px-8 py-6 shadow-lg"
                >
                  Get Started For Free
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </motion.div>
            </Link>
            <Link href="/explore">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white/10 dark:border-black dark:text-black dark:hover:bg-black/10 text-lg px-8 py-6"
                >
                  See How It Works
                </Button>
              </motion.div>
            </Link>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-sm text-white/60 dark:text-black/60 pt-2"
          >
            No credit card required. Free trial for 14 days.
          </motion.p>
        </div>
      </div>
    </section>
  );
};

export default CTA;
