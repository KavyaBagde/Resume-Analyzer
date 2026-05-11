import { motion } from "framer-motion";

const steps = [
  {
    title: "Upload Resume",
    desc: "Upload your resume in PDF or DOCX format securely.",
  },
  {
    title: "AI Analysis",
    desc: "Our AI analyzes ATS score, keywords, and job relevance.",
  },
  {
    title: "Get Optimized Resume",
    desc: "Receive a tailored, job-ready resume instantly.",
  },
];

const HowItWorks = () => {
  return (
    <div className="relative py-28 px-6 overflow-hidden">
      {/* 🌈 Background Glow */}
      <div className="absolute -top-30 -left-30 w-100 h-100 bg-indigo-200 opacity-30 blur-3xl rounded-full"></div>
      <div className="absolute -bottom-30 -right-30 w-100 h-100 bg-cyan-200 opacity-30 blur-3xl rounded-full"></div>

      <div className="max-w-6xl mx-auto text-center">
        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold text-gray-900"
        >
          How It Works
        </motion.h2>

        <p className="mt-4 text-gray-500">
          Simple steps to transform your resume using AI
        </p>

        {/* Steps */}
        <div className="mt-20 grid md:grid-cols-3 gap-12 relative">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2 }}
              className="flex flex-col items-center text-center"
            >
              {/* Step Circle */}
              <div
                className="
                w-16 h-16 flex items-center justify-center
                rounded-full
                bg-linear-to-r from-indigo-500 to-cyan-500
                text-white text-xl font-bold
                shadow-lg
              "
              >
                {i + 1}
              </div>

              {/* Title */}
              <h3 className="mt-6 text-xl font-semibold text-gray-900">
                {step.title}
              </h3>

              {/* Description */}
              <p className="mt-3 text-gray-500 max-w-xs">{step.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Flow Line (desktop only) */}
        <div className="hidden md:block absolute left-1/2 top-[60%] w-[60%] h-0.5 bg-linear-to-r from-indigo-300 to-cyan-300 -translate-x-1/2"></div>
      </div>
    </div>
  );
};

export default HowItWorks;
