import { motion } from "framer-motion";
import GlassCard from "../common/GlassCard";

const Demo = () => {
  return (
    <div id="demo" className="relative py-28 px-6 overflow-hidden">
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
          See the Transformation
        </motion.h2>

        <p className="mt-4 text-gray-500">
          Watch how AI turns an average resume into a job-winning one
        </p>

        {/* BEFORE vs AFTER */}
        <div className="mt-16 grid md:grid-cols-2 gap-10">
          {/* BEFORE */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
          >
            <GlassCard className="p-8 text-left h-full">
              <h3 className="text-red-500 font-semibold text-lg">❌ Before</h3>

              <div className="mt-6 space-y-4 text-sm text-gray-600">
                <p>• Responsible for managing team tasks</p>
                <p>• Worked on improving system performance</p>
                <p>• Helped with backend development</p>
              </div>

              <div className="mt-6 text-xs text-gray-400">
                Low ATS Score • Generic • Weak impact
              </div>
            </GlassCard>
          </motion.div>

          {/* AFTER */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
          >
            <GlassCard className="p-8 text-left h-full border-2 border-indigo-500 shadow-xl">
              <h3 className="text-green-600 font-semibold text-lg">
                ✔ After AI Optimization
              </h3>

              <div className="mt-6 space-y-4 text-sm text-gray-700">
                <p>
                  ✔ Led a team of 5 engineers to deliver projects 30% faster
                </p>
                <p>
                  ✔ Optimized backend performance improving response time by 40%
                </p>
                <p>✔ Built scalable APIs using Node.js and MongoDB</p>
              </div>

              <div className="mt-6 text-xs text-gray-500">
                High ATS Score • Quantified • Role-focused
              </div>
            </GlassCard>
          </motion.div>
        </div>

        {/* Arrow / Flow Hint */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="mt-10 text-gray-400 text-sm"
        >
          Powered by AI Resume Intelligence
        </motion.div>
      </div>
    </div>
  );
};

export default Demo;
