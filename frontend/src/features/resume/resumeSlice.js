import { createSlice } from "@reduxjs/toolkit";

const savedResume = localStorage.getItem("tempResume");

const initialState = {
  tempResume: savedResume ? JSON.parse(savedResume) : null,
  claimedResumes: [],
  loading: false,
  error: null,
};

const resumeSlice = createSlice({
  name: "resume",
  initialState,

  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },

    setError: (state, action) => {
      state.error = action.payload;
    },

    setTempResume: (state, action) => {
      state.tempResume = action.payload;

      localStorage.setItem("tempResume", JSON.stringify(action.payload));
      localStorage.setItem("lastResumeId", action.payload.resumeId);
    },

    clearTempResume: (state) => {
      state.tempResume = null;
      localStorage.removeItem("tempResume");
    },

    addClaimedResume: (state, action) => {
      state.claimedResumes.push(action.payload);
    },

    setClaimedResumes: (state, action) => {
      state.claimedResumes = action.payload;
    },

    //ADD JD ANALYSIS TO RESUME
    addJdAnalysis: (state, action) => {
      const { resumeId, jdEntry } = action.payload;

      const resume = state.claimedResumes.find((r) => r._id === resumeId);

      if (resume) {
        if (!resume.jdAnalyses) {
          resume.jdAnalyses = [];
        }

        resume.jdAnalyses.push(jdEntry);
      }
    },

    addGeneratedResume: (state, action) => {
      const { resumeId, genEntry } = action.payload;

      const resume = state.claimedResumes.find((r) => r._id === resumeId);

      if (resume) {
        if (!resume.generatedResumes) {
          resume.generatedResumes = [];
        }

        resume.generatedResumes.push(genEntry);
      }
    },
  },
});

export const {
  setLoading,
  setError,
  setTempResume,
  clearTempResume,
  addClaimedResume,
  setClaimedResumes,
  addJdAnalysis,
  addGeneratedResume,
} = resumeSlice.actions;

export default resumeSlice.reducer;
