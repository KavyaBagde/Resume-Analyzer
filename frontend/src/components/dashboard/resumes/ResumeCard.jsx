import { useNavigate } from "react-router-dom";
import { useState } from "react";
import JobDescriptionModal from "./JobDescriptionModal";

const ResumeCard = ({ resume }) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const score =
    resume?.analysis?.aiBased?.score ??
    resume?.analysis?.ruleBased?.score ??
    resume?.data?.analysis?.aiBased?.score ?? // fallback
    "N/A";

  return (
    <div className="p-6 rounded-2xl bg-white/70 backdrop-blur-xl shadow-xl border border-white/50 space-y-4 hover:shadow-2xl transition">
      {/* Title */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900">
          {resume.fileName}
        </h2>
        <p className="text-sm text-gray-500">
          Score: <span className="font-medium text-gray-800">{score}</span>
        </p>
      </div>

      {/* Quick Insights (🔥 USE YOUR DATA) */}
      <div className="text-sm text-gray-600 line-clamp-3">
        {resume?.analysis?.aiBased?.strengths?.[0] || "No insights available"}
      </div>

      {/* Actions */}
      <div className="flex flex-wrap gap-3">
        {/* View Report */}
        <button
          onClick={() => navigate(`/analysis/${resume._id}`)}
          className="px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-800 transition"
        >
          View Report
        </button>
      </div>

      {/* Modal */}
      {open && (
        <JobDescriptionModal
          onClose={() => setOpen(false)}
          resumeId={resume._id}
        />
      )}
    </div>
  );
};

export default ResumeCard;
