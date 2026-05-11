import { useSelector, useDispatch } from "react-redux";
import {
  useParams,
  useNavigate,
  Navigate,
  useSearchParams,
} from "react-router-dom";
import { useEffect, useState, useRef } from "react";

import GlassCard from "../components/common/GlassCard";
import { claimResume } from "../features/resume/resumeActions";
import JobDescriptionModal from "../components/dashboard/resumes/JobDescriptionModal";
import { generateResume } from "../features/resume/resumeActions";

import TemplateRenderer from "../components/resumeTemplates/TemplateRenderer";
import { generateResumePDF } from "../utils/generateResumePDF";

const AnalysisPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { tempResume, claimedResumes, loading } = useSelector(
    (state) => state.resume,
  );

  // 🔥 GET USER (credits)
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const credits = user?.credits ?? 0;

  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const jdId = searchParams.get("jd");

  const [stableResume, setStableResume] = useState(null);
  const [selectedAnalysis, setSelectedAnalysis] = useState(null);
  const [selectedLabel, setSelectedLabel] = useState("Base");

  const [openIndex, setOpenIndex] = useState(null);
  const [resolved, setResolved] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const [selectedTemplate, setSelectedTemplate] = useState("modern");
  const [selectedTheme, setSelectedTheme] = useState("royalBlue");

  const generatedResume = stableResume?.generatedResumes?.find(
    (gen) => gen.jdId === jdId,
  );

  const hasClaimed = useRef(false);
  const resumeRef = useRef();

  // 🔥 CREDIT COST (sync with backend)
  const GENERATE_COST = 3;

  // ================= AUTO CLAIM =================
  useEffect(() => {
    if (isAuthenticated && tempResume && !hasClaimed.current) {
      hasClaimed.current = true;
      dispatch(claimResume());
    }
  }, [isAuthenticated, tempResume]);

  // ================= RESOLVE RESUME =================
  useEffect(() => {
    const found =
      claimedResumes.find((r) => r._id === id) ||
      tempResume ||
      JSON.parse(localStorage.getItem("tempResume"));

    if (found) setStableResume(found);
    setResolved(true);
  }, [claimedResumes, tempResume, id]);

  // ================= SELECT ANALYSIS =================
  useEffect(() => {
    if (!stableResume) return;

    if (jdId && stableResume.jdAnalyses?.length) {
      const index = stableResume.jdAnalyses.findIndex((jd) => jd._id === jdId);

      if (index !== -1) {
        setSelectedAnalysis(stableResume.jdAnalyses[index].analysis);
        setSelectedLabel(`JD V${index + 1}`);
        return;
      }
    }

    setSelectedAnalysis(stableResume.analysis);
    setSelectedLabel("Base");
  }, [stableResume, jdId]);

  // ================= INVALID =================
  if (resolved && !stableResume) {
    return <Navigate to="/" replace />;
  }

  // ================= LOADER =================
  if (!stableResume || !selectedAnalysis) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-indigo-400 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  const ai = selectedAnalysis?.aiBased || {};

  // ================= GENERATE =================
  const handleGenerate = async () => {
    if (!jdId) return;

    if (generatedResume) {
      navigate(`/resume/${id}?jd=${jdId}`);
      return;
    }

    const res = await dispatch(generateResume(id, jdId));

    if (res) {
      navigate(`/resume/${id}?jd=${jdId}`);
    }
  };

  // ================= CREDIT LOGIC =================
  const notEnoughCredits = credits < GENERATE_COST;

  // ================= BUTTON LOGIC =================
  const isDisabled = loading || !jdId || (!generatedResume && notEnoughCredits);

  const getButtonStyle = () => {
    if (loading) return "bg-gray-300 text-gray-500 cursor-not-allowed";

    if (!jdId) return "bg-gray-200 text-gray-400 cursor-not-allowed";

    if (!generatedResume && notEnoughCredits)
      return "bg-red-200 text-red-500 cursor-not-allowed";

    if (generatedResume) return "bg-indigo-500 text-white hover:bg-indigo-600";

    return "bg-green-500 text-white hover:bg-green-600";
  };

  const getButtonText = () => {
    if (loading) return "Generating...";
    if (!jdId) return "Select JD First";

    if (!generatedResume && notEnoughCredits)
      return `Need ${GENERATE_COST} Credits`;

    if (generatedResume) return "View Resume";

    return `Generate Resume (${GENERATE_COST} credits)`;
  };

  const isTempResume = !stableResume?.userId;

  return (
    <div className="min-h-screen relative">
      <div className="max-w-6xl mx-auto px-6 py-12 space-y-14">
        {/* HEADER */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-gray-900">Resume Analysis</h1>

          {/* 🔥 SHOW CREDITS */}
          {isAuthenticated && (
            <div className="flex justify-center">
              <span className="px-4 py-1 rounded-full text-sm bg-yellow-100 text-yellow-700 font-medium">
                💰 {credits} Credits
              </span>
            </div>
          )}

          <div className="flex justify-center">
            <span className="px-4 py-1 rounded-full text-sm bg-indigo-100 text-indigo-600 font-medium">
              {selectedLabel}
            </span>
          </div>

          <div className="flex justify-center">
            <div className="px-6 py-2 rounded-full bg-linear-to-r from-indigo-500 to-cyan-500 text-white font-semibold">
              AI Score: {ai?.score || "N/A"}
            </div>
          </div>

          {/* TOGGLE */}
          {stableResume.jdAnalyses?.length > 0 && (
            <div className="flex flex-wrap justify-center gap-2 mt-4">
              <button
                onClick={() => navigate(`/analysis/${id}`)}
                className={`px-3 py-1 rounded-lg text-sm ${
                  selectedLabel === "Base"
                    ? "bg-indigo-500 text-white"
                    : "bg-gray-100"
                }`}
              >
                Base
              </button>

              {stableResume.jdAnalyses.map((jd, index) => (
                <button
                  key={jd._id}
                  onClick={() => navigate(`/analysis/${id}?jd=${jd._id}`)}
                  className={`px-3 py-1 rounded-lg text-sm ${
                    selectedLabel === `JD V${index + 1}`
                      ? "bg-indigo-500 text-white"
                      : "bg-gray-100"
                  }`}
                >
                  JD V{index + 1}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* STRENGTHS */}
        <div>
          <h2 className="text-2xl font-semibold text-center mb-6">Strengths</h2>

          <div className="grid md:grid-cols-3 gap-6">
            {ai?.strengths?.map((item, i) => (
              <GlassCard key={i} className="p-6">
                {item}
              </GlassCard>
            ))}
          </div>
        </div>

        {/* WEAKNESSES */}
        <div>
          <h2 className="text-2xl font-semibold text-center mb-6">
            Areas to Improve
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            {ai?.weaknesses?.map((item, i) => (
              <GlassCard key={i} className="p-6">
                {item}
              </GlassCard>
            ))}
          </div>
        </div>

        {/* SUGGESTIONS */}
        <div>
          <h2 className="text-2xl font-semibold text-center mb-6">
            Suggestions
          </h2>

          <div className="max-w-3xl mx-auto space-y-4">
            {ai?.suggestions?.map((item, i) => (
              <div
                key={i}
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
              >
                <GlassCard className="p-4 cursor-pointer">
                  <p className="font-medium">Suggestion {i + 1}</p>

                  {openIndex === i && (
                    <p className="mt-2 text-gray-600">{item}</p>
                  )}
                </GlassCard>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="flex justify-center gap-4 flex-wrap">
          <div className="relative group">
            <button
              onClick={async () => {
                // if temp resume → claim first
                if (!stableResume.userId) {
                  const success = await dispatch(claimResume());

                  if (!success) return;

                  setShowModal(true);
                  return;
                }

                setShowModal(true);
              }}
              disabled={!isAuthenticated || isTempResume}
              className={`
                px-6 py-3 rounded-xl
                ${
                  !isAuthenticated || isTempResume
                    ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                    : "bg-linear-to-r from-indigo-500 to-cyan-500 text-white"
                }
              `}
            >
              Add Job Description
            </button>

            {/*  HOVER MESSAGE */}
            {isTempResume && (
              <div className="absolute left-1/2 -translate-x-1/2 top-full mt-3 w-72 opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none z-50">
                <div className="relative bg-gray-900 text-white text-xs rounded-xl px-4 py-3 shadow-xl text-center leading-relaxed">
                  {/* Arrow */}
                  <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-3 h-3 bg-gray-900 rotate-45"></div>
                  🚫 This resume is not saved yet
                  <br />
                  👉 Go to{" "}
                  <span className="font-semibold text-indigo-300">
                    Dashboard
                  </span>{" "}
                  and return to enable JD analysis
                </div>
              </div>
            )}
          </div>

          <button
            onClick={handleGenerate}
            disabled={isDisabled}
            className={`
              px-6 py-3 rounded-xl font-medium transition-all duration-200
              ${getButtonStyle()}
            `}
          >
            {getButtonText()}
          </button>

          <button
            onClick={() => navigate("/dashboard")}
            className="px-6 py-3 rounded-xl bg-gray-100"
          >
            Go to Dashboard
          </button>
        </div>
      </div>

      {/* MODAL */}
      {showModal && (
        <JobDescriptionModal
          onClose={() => setShowModal(false)}
          resumeId={id}
        />
      )}
    </div>
  );
};

export default AnalysisPage;
