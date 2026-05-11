import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { analyzeResumeWithJD } from "../../../features/resume/resumeActions";

const JobDescriptionModal = ({ onClose, resumeId }) => {
  const [jd, setJd] = useState("");
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // 🔥 AUTH + CREDITS
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const credits = user?.credits ?? 0;

  const JD_COST = 2;

  // 🔥 FREE LIMIT (non-auth users)
  const getJDCount = () => {
    return parseInt(localStorage.getItem("free_jd_count") || "0");
  };

  const incrementJDCount = () => {
    const count = getJDCount();
    localStorage.setItem("free_jd_count", count + 1);
  };

  const FREE_JD_LIMIT = 1;

  const handleSubmit = async () => {
    if (!jd.trim()) return;

    // =========================
    // 🔥 NON-LOGGED USER LIMIT
    // =========================
    if (!isAuthenticated) {
      const count = getJDCount();

      if (count >= FREE_JD_LIMIT) {
        alert("Free limit reached. Please login to continue.");
        navigate("/login");
        return;
      }
    }

    // =========================
    // 🔥 CREDIT CHECK (LOGGED IN)
    // =========================
    if (isAuthenticated && credits < JD_COST) {
      alert("Not enough credits. Please upgrade.");
      navigate("/dashboard/billing"); // future billing page
      return;
    }

    try {
      setLoading(true);

      await dispatch(analyzeResumeWithJD(resumeId, jd, navigate));

      // 🔥 increment free usage AFTER success
      if (!isAuthenticated) {
        incrementJDCount();
      }

      onClose();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // 🔥 DISABLE BUTTON LOGIC
  const isDisabled =
    loading ||
    (!isAuthenticated && getJDCount() >= FREE_JD_LIMIT) ||
    (isAuthenticated && credits < JD_COST);

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="w-full max-w-lg p-6 rounded-2xl bg-white shadow-xl space-y-4">
        <h2 className="text-xl font-semibold text-gray-900">
          Add Job Description
        </h2>

        {/* 🔥 INFO BAR */}
        <div className="text-sm text-gray-500">
          {isAuthenticated ? (
            <p>💰 Cost: {JD_COST} credits</p>
          ) : (
            <p>Free limit: 1 JD analysis</p>
          )}
        </div>

        <textarea
          value={jd}
          onChange={(e) => setJd(e.target.value)}
          placeholder="Paste job description..."
          className="w-full h-40 p-3 border rounded-lg focus:outline-none"
        />

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-gray-100"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            disabled={isDisabled}
            className={`px-4 py-2 rounded-lg text-white ${
              isDisabled
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-linear-to-r from-indigo-500 to-cyan-500"
            }`}
          >
            {loading
              ? "Analyzing..."
              : isAuthenticated && credits < JD_COST
                ? "Need Credits"
                : "Analyze"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default JobDescriptionModal;
