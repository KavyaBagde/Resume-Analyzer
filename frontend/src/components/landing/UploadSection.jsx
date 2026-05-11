import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import GlassCard from "../common/GlassCard";
import Button from "../common/Button";

import { uploadResume } from "../../features/resume/resumeActions";

const UploadSection = () => {
  const [file, setFile] = useState(null);
  const [dragging, setDragging] = useState(false);

  const fileInputRef = useRef(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading } = useSelector((state) => state.resume);

  // 🔥 AUTH CHECK
  const { isAuthenticated } = useSelector((state) => state.auth);

  // 🔥 FREE LIMIT TRACKING (localStorage)
  const getUploadCount = () => {
    return parseInt(localStorage.getItem("free_upload_count") || "0");
  };

  const incrementUploadCount = () => {
    const count = getUploadCount();
    localStorage.setItem("free_upload_count", count + 1);
  };

  const FREE_UPLOAD_LIMIT = 1;

  // ----------------------------
  //  FILE HANDLING
  // ----------------------------
  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);

    const uploadedFile = e.dataTransfer.files[0];
    if (uploadedFile) setFile(uploadedFile);
  };

  const handleFileChange = (e) => {
    const uploadedFile = e.target.files[0];
    if (uploadedFile) setFile(uploadedFile);
  };

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  // ----------------------------
  //  ANALYZE FUNCTION
  // ----------------------------
  const handleAnalyze = async () => {
    if (!file) return;

    // 🔥 FREE USER LIMIT CHECK
    if (!isAuthenticated) {
      const count = getUploadCount();

      if (count >= FREE_UPLOAD_LIMIT) {
        alert("Free limit reached. Please login to continue.");
        navigate("/auth");
        return;
      }
    }

    const result = await dispatch(uploadResume(file));

    if (!result) return;

    // 🔥 HANDLE CREDIT ERROR
    if (result.error === "NO_CREDITS") {
      alert("Not enough credits. Please upgrade.");
      navigate("/dashboard/billing");
      return;
    }

    if (result.payload) {
      // 🔥 INCREMENT AFTER SUCCESS
      if (!isAuthenticated) {
        incrementUploadCount();
      }

      const resumeId = result.payload.resumeId;
      navigate(`/analysis/${resumeId}`);
    }
  };

  return (
    <div id="upload" className="relative py-28 px-6 overflow-hidden">
      {/*  Background Glow */}
      <div className="absolute -top-30 -left-30 w-100 h-100 bg-indigo-200 opacity-30 blur-3xl rounded-full"></div>
      <div className="absolute -bottom-30 -right-30 w-100 h-100 bg-cyan-200 opacity-30 blur-3xl rounded-full"></div>

      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
          Analyze Your Resume with{" "}
          <span className="bg-linear-to-r from-indigo-500 to-cyan-500 bg-clip-text text-transparent">
            AI
          </span>
        </h2>

        <p className="mt-4 text-gray-500 text-lg">
          Get ATS score, smart suggestions, and a job-ready resume instantly
        </p>

        {/* 🔥 LIMIT MESSAGE */}
        {!isAuthenticated && getUploadCount() >= FREE_UPLOAD_LIMIT && (
          <p className="mt-4 text-red-500 text-sm">
            Free limit reached. Login to continue.
          </p>
        )}

        <motion.div
          onDragOver={(e) => {
            e.preventDefault();
            setDragging(true);
          }}
          onDragLeave={() => setDragging(false)}
          onDrop={handleDrop}
          className="mt-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          <GlassCard
            className={`p-12 border-2 border-dashed transition ${
              dragging
                ? "border-indigo-500 bg-indigo-50/40 scale-[1.02]"
                : "border-gray-300 hover:border-indigo-400 hover:bg-indigo-50/20"
            }`}
          >
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              accept=".pdf,.doc,.docx"
              onChange={handleFileChange}
            />

            {!file ? (
              <div>
                <div className="flex justify-center">
                  <div className="w-16 h-16 flex items-center justify-center rounded-full bg-linear-to-r from-indigo-500 to-cyan-500 text-white text-2xl shadow-lg">
                    ↑
                  </div>
                </div>

                <p className="mt-6 text-gray-700 font-medium text-lg">
                  Drag & drop your resume here
                </p>

                <p className="text-sm text-gray-400 mt-2">
                  or click to upload (PDF, DOCX)
                </p>

                <div className="mt-6">
                  <Button onClick={handleButtonClick}>Select File</Button>
                </div>
              </div>
            ) : (
              <div className="text-left">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-green-100 text-green-600">
                    📄
                  </div>

                  <div>
                    <p className="text-gray-900 font-medium">{file.name}</p>
                    <p className="text-sm text-gray-400">Ready for analysis</p>
                  </div>
                </div>

                <div className="mt-6 flex flex-wrap gap-4">
                  <Button onClick={handleAnalyze} disabled={loading}>
                    {loading ? "Analyzing..." : "Analyze Resume"}
                  </Button>

                  <button
                    onClick={() => setFile(null)}
                    className="px-4 py-2 text-gray-600 hover:text-red-500 transition"
                  >
                    Remove
                  </button>
                </div>
              </div>
            )}
          </GlassCard>
        </motion.div>

        <p className="mt-6 text-sm text-gray-400">
          No signup required • Your data is secure
        </p>
      </div>
    </div>
  );
};

export default UploadSection;
