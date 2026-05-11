import { motion } from "framer-motion";
import GlassCard from "../common/GlassCard";
import Button from "../common/Button";

const Pricing = () => {
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
          Simple, Transparent Pricing
        </motion.h2>

        <p className="mt-4 text-gray-500">
          Start free. Upgrade when you're ready to land more interviews.
        </p>

        {/* Pricing Cards */}
        <div className="mt-16 grid md:grid-cols-2 gap-10">
          {/* FREE PLAN */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <GlassCard className="p-8 text-left h-full">
              <h3 className="text-xl font-semibold text-gray-800">Free</h3>

              <p className="mt-2 text-3xl font-bold text-gray-900">₹0</p>

              <p className="mt-2 text-gray-500">Perfect to get started</p>

              <ul className="mt-6 space-y-3 text-gray-600">
                <li>✔ 1 Resume Analysis</li>
                <li>✔ Basic ATS Score</li>
                <li>✔ Limited Suggestions</li>
                <li>✔ 1 Download Resume</li>
              </ul>

              <div className="mt-8">
                <Button className="w-full">Get Started</Button>
              </div>
            </GlassCard>
          </motion.div>

          {/* PRO PLAN (HIGHLIGHTED) */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            {/* 🔥 Highlight Badge */}
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-linear-to-r from-indigo-500 to-cyan-500 text-white text-sm px-4 py-1 rounded-full shadow z-10">
              Most Popular
            </div>

            <GlassCard className="p-8 text-left h-full border-2 border-indigo-500 shadow-xl">
              <h3 className="text-xl font-semibold text-gray-800">Pro</h3>

              <p className="mt-2 text-3xl font-bold text-gray-900">
                ₹199
                <span className="text-lg font-medium text-gray-500">
                  /month
                </span>
              </p>

              <p className="mt-2 text-gray-500">For serious job seekers</p>

              <ul className="mt-6 space-y-3 text-gray-700">
                <li>✔ Unlimited Analysis</li>
                <li>✔ AI Resume Generation</li>
                <li>✔ Advanced Suggestions</li>
                <li>✔ Download Resume</li>
              </ul>

              <div className="mt-8">
                <Button className="w-full">Upgrade to Pro</Button>
              </div>
            </GlassCard>
          </motion.div>
        </div>

        {/* Trust Line */}
        <p className="mt-10 text-sm text-gray-400">
          No hidden fees 
        </p>
      </div>
    </div>
  );
};

export default Pricing;
