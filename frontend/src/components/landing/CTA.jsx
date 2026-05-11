import { motion } from "framer-motion";
import Button from "../common/Button";

const CTA = () => {
  const scrollToUpload = () => {
    document.getElementById("upload")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="relative py-28 px-6 overflow-hidden">
      {/* 🌈 Background Glow */}
      <div className="absolute -top-25 -left-25 w-100 h-100 bg-indigo-300 opacity-30 blur-3xl rounded-full"></div>
      <div className="absolute -bottom-25 -right-25 w-100 h-100 bg-cyan-300 opacity-30 blur-3xl rounded-full"></div>

      <div className="max-w-5xl mx-auto ">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="
            relative
            bg-white/60
            backdrop-blur-2xl
            border border-white/30
            rounded-3xl
            shadow-[0_20px_60px_rgba(0,0,0,0.1)]
            p-12 md:p-16
            text-center
          "
        >
          {/* ✨ Gradient Border Glow */}
          <div className="absolute inset-0 rounded-3xl border border-transparent bg-linear-to-r from-indigo-500 to-cyan-500 opacity-20 blur-xl -z-10"></div>

          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
            Land Interviews Faster with{" "}
            <span className="bg-linear-to-r from-indigo-500 to-cyan-500 bg-clip-text text-transparent">
              AI-Powered Resumes
            </span>
          </h2>

          <p className="mt-6 text-lg text-gray-600 max-w-2xl mx-auto">
            Stop guessing what recruiters want. Upload your resume and let AI
            optimize it for real job success.
          </p>

          {/* CTA Buttons */}
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Button onClick={scrollToUpload}>Upload Resume — Free</Button>
          </div>

          {/* Trust Line */}
          <p className="mt-6 text-sm text-gray-400">
            No signup required • Free first analysis
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default CTA;
