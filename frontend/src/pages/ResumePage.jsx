import { useParams, useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useMemo, useState, useRef, useEffect } from "react";

import TemplateRenderer from "../components/resumeTemplates/TemplateRenderer";
import { generateResumePDF } from "../utils/generateResumePDF";

const ResumePage = () => {
  const { resumeId } = useParams();
  const [searchParams] = useSearchParams();
  const jdId = searchParams.get("jd");

  const { claimedResumes } = useSelector((state) => state.resume);

  const resume = useMemo(
    () => claimedResumes.find((r) => r._id === resumeId),
    [claimedResumes, resumeId],
  );

  const generatedResume = resume?.generatedResumes?.find(
    (g) => g.jdId === jdId,
  );

  const [template, setTemplate] = useState("modern");
  const [theme, setTheme] = useState("royalBlue");

  const [isEditing, setIsEditing] = useState(false);
  const [editableData, setEditableData] = useState({});

  const resumeRef = useRef();

  useEffect(() => {
    if (generatedResume) {
      setEditableData({
        name: "",
        role: "",
        email: "",
        phone: "",
        github: "",
        ...generatedResume.content,
      });
    }
  }, [generatedResume]);

  // ================= DOWNLOAD =================
  const handleDownload = () => {
    if (!generatedResume) return;

    generateResumePDF(editableData, theme, template);
  };

  // ================= LOADING =================
  if (!resume || !generatedResume || !editableData) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-indigo-400 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-6 py-10 space-y-8">
        {/* ================= HEADER ================= */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Resume Builder</h1>
            <p className="text-gray-500 text-sm">
              Customize, edit and download your resume
            </p>
          </div>

          {/* ACTION BUTTONS */}
          <div className="flex gap-3">
            <button
              onClick={() => setIsEditing((prev) => !prev)}
              className={`px-5 py-2 rounded-lg ${
                isEditing
                  ? "bg-green-600 text-white"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
            >
              {isEditing ? "Done Editing" : "Edit"}
            </button>

            <button
              onClick={handleDownload}
              className="px-5 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700"
            >
              Download PDF
            </button>
          </div>
        </div>

        {/* ================= CONTROLS ================= */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          {/* TEMPLATE SWITCH */}
          <div className="flex gap-2">
            {["modern", "minimal", "premium"].map((t) => (
              <button
                key={t}
                onClick={() => setTemplate(t)}
                className={`
                  px-4 py-2 rounded-lg capitalize transition
                  ${
                    template === t
                      ? "bg-indigo-600 text-white"
                      : "bg-white border"
                  }
                `}
              >
                {t}
              </button>
            ))}
          </div>

          {/* THEME SWITCH */}
          <div className="flex gap-3">
            {["executive", "royalBlue", "emerald", "wine", "graphite"].map(
              (t) => (
                <button
                  key={t}
                  onClick={() => setTheme(t)}
                  className={`
                    w-8 h-8 rounded-full
                    ${
                      t === "executive"
                        ? "bg-gray-900"
                        : t === "royalBlue"
                          ? "bg-blue-800"
                          : t === "emerald"
                            ? "bg-emerald-600"
                            : t === "wine"
                              ? "bg-rose-700"
                              : "bg-gray-600"
                    }
                    ${
                      theme === t
                        ? "ring-4 ring-offset-2 ring-black scale-110"
                        : ""
                    }
                  `}
                />
              ),
            )}
          </div>
        </div>

        {/* ================= PREVIEW ================= */}
        <div className="bg-white shadow-lg rounded-xl p-6">
          <TemplateRenderer
            template={template}
            data={editableData}
            theme={theme}
            innerRef={resumeRef}
            isEditing={isEditing}
            setData={setEditableData}
          />
        </div>
      </div>
    </div>
  );
};

export default ResumePage;
