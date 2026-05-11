import AuthForm from "./AuthForm";

export default function AuthCard({ mode, setMode }) {
  return (
    <div className="w-full max-w-md p-8 rounded-2xl
      backdrop-blur-xl bg-white/5 border border-white/10 shadow-2xl">

      {/* Header */}
      <div className="text-center mb-6">
        <h2 className="text-2xl font-semibold text-white">
          {mode === "login" ? "Welcome Back" : "Create Account"}
        </h2>
        <p className="text-gray-400 text-sm mt-1">
          {mode === "login"
            ? "Login to continue improving your resume"
            : "Start optimizing your resume with AI"}
        </p>
      </div>

      {/* Form */}
      <AuthForm mode={mode} />

      {/* Toggle */}
      <div className="mt-6 text-center text-sm text-gray-400">
        {mode === "login" ? (
          <>
            Don’t have an account?{" "}
            <button
              onClick={() => setMode("signup")}
              className="text-cyan-400 hover:underline"
            >
              Sign up
            </button>
          </>
        ) : (
          <>
            Already have an account?{" "}
            <button
              onClick={() => setMode("login")}
              className="text-cyan-400 hover:underline"
            >
              Login
            </button>
          </>
        )}
      </div>
    </div>
  );
}