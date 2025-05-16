import { motion } from "framer-motion";
import {
  Bot,
  Briefcase,
  FileText,
  Search,
  Sparkles,
  Upload,
} from "lucide-react";

const features = [
  {
    icon: Search,
    title: "Smart Job Matching",
    description:
      "Our AI analyzes thousands of job postings to find the perfect match for your skills and preferences.",
  },
  {
    icon: FileText,
    title: "Resume & Cover Letter Builder",
    description:
      "Create professional, ATS-optimized documents with our easy-to-use templates and AI suggestions.",
  },
  {
    icon: Bot,
    title: "AI Career Assistant",
    description:
      "Get personalized career advice, interview tips, and job search strategies from your AI helper.",
  },
  {
    icon: Sparkles,
    title: "One-Click Apply",
    description:
      "Apply to multiple jobs with a single click and track your application status in real-time.",
  },
  {
    icon: Briefcase,
    title: "Job Market Insights",
    description:
      "Access real-time data on salary ranges, in-demand skills, and hiring trends in your industry.",
  },
  {
    icon: Upload,
    title: "Import & Enhance",
    description:
      "Upload your existing resume and let our AI suggest improvements to make it stand out.",
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { y: 20, opacity: 0 },
  show: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
    },
  },
};

const Features = () => {
  return (
    // <section className="w-full py-16 md:py-24 lg:py-32 flex flex-col items-center bg-gray-50 dark:bg-gray-900 relative overflow-hidden">
    //   <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-white to-transparent dark:from-black dark:to-transparent"></div>
    //   <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-white to-transparent dark:from-black dark:to-transparent"></div>
    <section className="w-full py-16 md:py-24 lg:py-32 flex flex-col items-center bg-gray-50 dark:bg-gray-900 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-white to-transparent dark:from-black dark:to-transparent"></div>
      <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-white to-transparent dark:from-black dark:to-transparent"></div>

      <div className="container px-4 md:px-6 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="flex flex-col items-center justify-center space-y-4 text-center"
        >
          <div className="space-y-2">
            <div className="inline-flex items-center rounded-full border border-black bg-white px-3 py-1 text-sm text-black dark:border-white dark:bg-black dark:text-white">
              <Sparkles className="mr-1 h-3.5 w-3.5" />
              <span>AI-Powered Features</span>
            </div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-black dark:text-white">
              Transform Your Job Search
            </h2>
            <p className="max-w-[900px] text-gray-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
              JobSpark AI provides everything you need to find, apply for, and
              land your dream job.
            </p>
          </div>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="mx-auto grid max-w-5xl grid-cols-1 gap-8 py-12 md:grid-cols-2 lg:grid-cols-3"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={item}
              whileHover={{
                y: -10,
                boxShadow: "0 10px 30px -15px rgba(0,0,0,0.2)",
                transition: { duration: 0.2 },
              }}
              className="relative overflow-hidden rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-black dark:hover:border-gray-700"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-black/5 text-black mb-4 dark:bg-white/10 dark:text-white">
                <feature.icon className="h-7 w-7" />
              </div>
              <h3 className="text-xl font-bold text-black dark:text-white">
                {feature.title}
              </h3>
              <p className="text-gray-600 mt-2 dark:text-gray-400">
                {feature.description}
              </p>
              <div className="absolute -bottom-10 -right-10 w-24 h-24 bg-black/5 rounded-full dark:bg-white/5"></div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Features;
