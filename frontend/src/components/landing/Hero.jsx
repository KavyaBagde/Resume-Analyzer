import { motion } from "framer-motion";
import Button from "../common/Button";
import GlassCard from "../common/GlassCard";

const Hero = () => {

  const scrollToUpload = () => {
    document
      .getElementById("upload")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToDemo = () => {
    document
      .getElementById("demo")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden px-6"
    >
      {/* 🌈 Background blobs */}
      <div className="absolute -top-37.5 -left-37.5 w-125 h-125 bg-purple-300 opacity-30 blur-3xl rounded-full"></div>
      <div className="absolute -bottom-37.5 -right-37.5 w-125 h-125 bg-cyan-300 opacity-30 blur-3xl rounded-full"></div>

      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10 items-center">
        {/* LEFT */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-5xl font-bold text-gray-900">
            Build Job-Winning Resumes with{" "}
            <span className="bg-linear-to-r from-indigo-500 to-cyan-500 bg-clip-text text-transparent">
              AI
            </span>
          </h1>

          <p className="mt-6 text-lg text-gray-500">
            Analyze your resume, improve ATS score, and generate tailored
            resumes instantly.
          </p>

          <div className="mt-8 flex gap-4">
            <Button onClick={scrollToUpload}>Upload Resume</Button>

            <button
              onClick={scrollToDemo}
              className="px-6 py-3 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
            >
              See Demo
            </button>
          </div>
        </motion.div>

        {/* RIGHT */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
        >
          <GlassCard className="p-6">
            <h3 className="text-gray-800 font-semibold">ATS Score</h3>

            <div className="mt-4 h-3 bg-gray-200 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "78%" }}
                transition={{ duration: 1 }}
                className="h-3 bg-linear-to-r from-green-400 to-emerald-500"
              />
            </div>

            <ul className="mt-4 text-sm text-gray-600 space-y-1">
              <li>✔ Improve keywords</li>
              <li>✔ Add measurable impact</li>
              <li>✔ Fix formatting issues</li>
            </ul>
          </GlassCard>
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;
