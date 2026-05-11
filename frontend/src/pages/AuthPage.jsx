import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AuthCard from "../components/auth/AuthCard";

export default function AuthPage() {
  const [mode, setMode] = useState("login");

  return (
    <div
      className="min-h-screen flex items-center justify-center px-6
      bg-linear-to-br from-indigo-950 via-slate-900 to-black"
    >
      {/* Glow Effects */}
      <div className="absolute w-72 h-72 bg-indigo-500/20 blur-3xl rounded-full top-10 left-10" />
      <div className="absolute w-72 h-72 bg-cyan-500/20 blur-3xl rounded-full bottom-10 right-10" />

      <AnimatePresence mode="wait">
        <motion.div
          key={mode}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -40 }}
          transition={{ duration: 0.4 }}
        >
          <AuthCard mode={mode} setMode={setMode} />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
