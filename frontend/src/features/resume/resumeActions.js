import { resumeApi } from "../../services/resumeApi";
import {
  setLoading,
  setError,
  setTempResume,
  clearTempResume,
  addClaimedResume,
  setClaimedResumes,
  addJdAnalysis,
  addGeneratedResume,
} from "./resumeSlice";

// 🔥 IMPORT CREDIT ACTION
import { deductCredits } from "../auth/authSlice";

// ================= UPLOAD RESUME =================
export const uploadResume = (file) => async (dispatch, getState) => {
  try {
    dispatch(setLoading(true));

    const formData = new FormData();
    formData.append("file", file);

    const res = await resumeApi.upload(formData);

    const data = {
      ...res.data.data,
      _id: res.data.data.resumeId,
    };

    dispatch(setTempResume(data));

    // 🔥 DEDUCT BASE ANALYSIS (ONLY IF LOGGED IN)
    const { auth } = getState();
    if (auth.isAuthenticated) {
      dispatch(deductCredits(2)); // base_analysis cost
    }

    return { payload: data };
  } catch (err) {
    if (err.response?.status === 403) {
      return { error: "NO_CREDITS" };
    }

    dispatch(setError("Upload failed"));
    return null;
  } finally {
    dispatch(setLoading(false));
  }
};

// ================= CLAIM RESUME =================
export const claimResume = () => async (dispatch, getState) => {
  try {
    dispatch(setLoading(true));
    dispatch(setError(null));

    const { resume } = getState();
    const resumeId = resume.tempResume?._id;

    if (!resumeId) return false;

    const res = await resumeApi.claim(resumeId);

    const resumeData = res.data.data;

    dispatch(addClaimedResume(resumeData));
    dispatch(clearTempResume());

    return true;
  } catch (err) {
    dispatch(setError("Claim failed"));
    return false;
  } finally {
    dispatch(setLoading(false));
  }
};

// ================= FETCH USER RESUMES =================
export const fetchUserResumes = () => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    dispatch(setError(null));

    const res = await resumeApi.getUserResumes();
    dispatch(setClaimedResumes(res.data.data));
  } catch (err) {
    dispatch(setError("Failed to fetch resumes"));
  } finally {
    dispatch(setLoading(false));
  }
};

// ================= JD ANALYSIS =================
export const analyzeResumeWithJD =
  (resumeId, jobDescription, navigate) => async (dispatch) => {
    try {
      dispatch(setLoading(true));
      dispatch(setError(null));

      const res = await resumeApi.analyzeWithJD(resumeId, jobDescription);

      const jdEntry = res.data.data;

      dispatch(addJdAnalysis({ resumeId, jdEntry }));

      // 🔥 LIVE CREDIT UPDATE
      dispatch(deductCredits(2));

      navigate(`/analysis/${resumeId}?jd=${jdEntry._id}`);
    } catch (err) {
      dispatch(setError("JD analysis failed"));
    } finally {
      dispatch(setLoading(false));
    }
  };

// ================= GENERATE RESUME =================
export const generateResume = (resumeId, jdId) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    dispatch(setError(null));

    const res = await resumeApi.generateResume(resumeId, jdId);

    const genEntry = res.data.data;

    dispatch(addGeneratedResume({ resumeId, genEntry }));

    // 🔥 LIVE CREDIT UPDATE
    dispatch(deductCredits(3));

    return genEntry;
  } catch (err) {
    dispatch(setError("Resume generation failed"));
    return null;
  } finally {
    dispatch(setLoading(false));
  }
};
