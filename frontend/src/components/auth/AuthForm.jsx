import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, signupUser } from "../../features/auth/authActions";
import { useNavigate } from "react-router-dom";
import { claimResume } from "../../features/resume/resumeActions";
import { useLocation } from "react-router-dom";
import { toastService } from "../../services/toastService";

export default function AuthForm({ mode }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error } = useSelector((state) => state.auth);
  const [claiming, setClaiming] = useState(false);

  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const redirect = params.get("redirect");

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let success;

    if (mode === "login") {
      success = await dispatch(loginUser(form));
    } else {
      success = await dispatch(signupUser(form));
    }

    if (!success) {
      toastService.error("Authentication failed");
      return;
    }

    toastService.success(
      mode === "login" ? "Welcome back 👋" : "Account created 🎉",
    );

    const hasTempResume = localStorage.getItem("tempResume");

    if (hasTempResume) {
      setClaiming(true);

      const claimed = await dispatch(claimResume());

      setClaiming(false);

      if (claimed) {
        navigate("/dashboard");
        return;
      }
    }

    // fallback
    navigate(redirect || "/");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Name (Signup only) */}
      {mode === "signup" && (
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10
          text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500"
        />
      )}

      {/* Email */}
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
        className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10
        text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500"
      />

      {/* Password */}
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={form.password}
        onChange={handleChange}
        className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10
        text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500"
      />

      {/* Button */}
      <button
        type="submit"
        disabled={loading || claiming}
        className="w-full py-3 rounded-lg font-medium text-white
  bg-linear-to-r from-indigo-500 to-cyan-500
  hover:opacity-90 transition
  disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {claiming ? (
          <>
            <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
            Saving your resume...
          </>
        ) : loading ? (
          <>
            <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
            Processing...
          </>
        ) : mode === "login" ? (
          "Login"
        ) : (
          "Create Account"
        )}
      </button>
    </form>
  );
}
