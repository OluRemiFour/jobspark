import { motion } from "framer-motion";
import { Award, Briefcase, TrendingUp, Users } from "lucide-react";

const statsData = [
  {
    icon: Users,
    value: "10k+",
    label: "Active Users",
    delay: 0,
  },
  {
    icon: Briefcase,
    value: "50k+",
    label: "Jobs Posted",
    delay: 0.1,
  },
  {
    icon: Award,
    value: "85%",
    label: "Success Rate",
    delay: 0.2,
  },
  {
    icon: TrendingUp,
    value: "30%",
    label: "Faster Hiring",
    delay: 0.3,
  },
];

const Stats = () => {
  return (
    <section className="w-full py-16 md:py-24 bg-white flex flex-col items-center dark:bg-black relative overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,transparent,rgba(0,0,0,0.02)_40%,rgba(0,0,0,0.02)_60%,transparent)] dark:bg-[linear-gradient(to_right,transparent,rgba(255,255,255,0.02)_40%,rgba(255,255,255,0.02)_60%,transparent)]"></div>

      <div className="container px-4 md:px-6 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="flex flex-col items-center mb-12 text-center"
        >
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-black dark:text-white">
            Why Job Seekers Choose Us
          </h2>
          <p className="mt-4 max-w-[700px] text-gray-600 md:text-xl/relaxed dark:text-gray-400">
            Our AI-powered platform has helped thousands of professionals find
            their perfect career fit.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {statsData.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: stat.delay,
                type: "spring",
                stiffness: 100,
              }}
              viewport={{ once: true }}
              whileHover={{
                y: -5,
                boxShadow: "0 10px 30px -15px rgba(0,0,0,0.2)",
                transition: { duration: 0.2 },
              }}
              className="flex flex-col items-center justify-center space-y-2 p-6 border border-gray-200 dark:border-gray-800 rounded-lg transition-all hover:shadow-md"
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0.5 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 + stat.delay }}
                className="flex h-16 w-16 items-center justify-center rounded-full bg-black/5 dark:bg-white/10"
              >
                <stat.icon className="h-8 w-8 text-black dark:text-white" />
              </motion.div>
              <motion.h3
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.4 + stat.delay }}
                className="text-3xl font-bold text-black dark:text-white"
              >
                {stat.value}
              </motion.h3>
              <motion.p
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.5 + stat.delay }}
                className="text-center text-sm text-gray-500 dark:text-gray-400"
              >
                {stat.label}
              </motion.p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
