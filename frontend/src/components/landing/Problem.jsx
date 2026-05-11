import { motion } from "framer-motion";
import GlassCard from "../common/GlassCard";

const problems = [
  {
    title: "Rejected by ATS",
    desc: "Most resumes never reach recruiters due to poor ATS optimization.",
  },
  {
    title: "Generic Content",
    desc: "Using the same resume for every job reduces your chances drastically.",
  },
  {
    title: "No Clear Feedback",
    desc: "You don’t know what’s wrong or how to improve your resume.",
  },
];

const Problem = () => {
  return (
    <div className="relative py-28 px-6 overflow-hidden">
      {/* 🌈 Background Glow */}
      <div className="absolute -top-30 -left-30 w-100 h-100 bg-red-200 opacity-30 blur-3xl rounded-full"></div>
      <div className="absolute -bottom-30 -right-30 w-100 h-100 bg-orange-200 opacity-30 blur-3xl rounded-full"></div>

      <div className="max-w-6xl mx-auto text-center">
        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold text-gray-900"
        >
          Why Most Resumes Fail
        </motion.h2>

        <p className="mt-4 text-gray-500">
          Even qualified candidates get rejected due to these common mistakes
        </p>

        {/* Problem Cards */}
        <div className="mt-16 grid md:grid-cols-3 gap-10">
          {problems.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2 }}
            >
              <GlassCard
                className="
                p-8 text-left h-full
                hover:-translate-y-2 hover:shadow-xl
                transition
              "
              >
                <h3 className="text-lg font-semibold text-red-500">
                  {item.title}
                </h3>

                <p className="mt-4 text-gray-600">{item.desc}</p>
              </GlassCard>
            </motion.div>
          ))}
        </div>

        {/* Subtle Transition Line */}
        <div className="mt-16 text-sm text-gray-400">
          Our AI solves all of these problems instantly ↓
        </div>
      </div>
    </div>
  );
};

export default Problem;
