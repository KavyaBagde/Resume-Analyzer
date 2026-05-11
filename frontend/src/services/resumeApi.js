import api from "./api";

export const resumeApi = {
  upload: (formData) =>
    api.post("/resume/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }),

  claim: (resumeId) => api.post("/resume/claim", { resumeId }),

  getUserResumes: () => api.get("/resume/user"),

  //JD ANALYSIS
  analyzeWithJD: (resumeId, jobDescription) =>
    api.post(`/resume/${resumeId}/analyze-jd`, { jobDescription }),

  // NEW
  generateResume: (resumeId, jdId) =>
    api.post(`/resume/${resumeId}/generate`, { jdId }),
};
