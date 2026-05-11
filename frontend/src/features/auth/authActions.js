import { authApi } from "../../services/authApi";
import { tokenService } from "../../utils/tokenService";
import { setUser, setLoading, setError, logout } from "./authSlice";
import { fetchUserResumes } from "../resume/resumeActions";
import { setInitialized } from "./authSlice";

// ================= LOGIN =================
export const loginUser = (credentials) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    dispatch(setError(null));

    const res = await authApi.login(credentials);

    const { accessToken, refreshToken } = res.data;

    tokenService.setTokens({ accessToken, refreshToken });

    // 🔥 CRITICAL FIX: fetch fresh user from /me
    const userRes = await authApi.getMe();

    dispatch(setUser(userRes.data));
    dispatch(fetchUserResumes());

    return true;
  } catch (err) {
    dispatch(setError(err.response?.data?.message || "Login failed"));
    return false;
  } finally {
    dispatch(setLoading(false));
  }
};

// ================= SIGNUP =================
export const signupUser = (data) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    dispatch(setError(null));

    const res = await authApi.signup(data);

    const { accessToken, refreshToken } = res.data;

    tokenService.setTokens({ accessToken, refreshToken });

    // 🔥 SAME FIX HERE
    const userRes = await authApi.getMe();

    dispatch(setUser(userRes.data));
    dispatch(fetchUserResumes());

    return true;
  } catch (err) {
    dispatch(setError(err.response?.data?.message || "Signup failed"));
    return false;
  } finally {
    dispatch(setLoading(false));
  }
};

// ================= LOAD USER =================
export const loadUser = () => async (dispatch) => {
  const token = tokenService.getAccessToken();

  dispatch(setLoading(true));

  try {
    if (!token) {
      dispatch(logout());
      return;
    }

    const res = await authApi.getMe();

    dispatch(setUser(res.data));
    dispatch(fetchUserResumes());
  } catch (err) {
    tokenService.clearTokens();
    dispatch(logout());
  } finally {
    dispatch(setLoading(false));
    dispatch(setInitialized(true));
  }
};

// ================= LOGOUT =================
export const logoutUser = () => async (dispatch) => {
  try {
    await authApi.logout();
  } catch (err) {
    console.error(err);
  } finally {
    tokenService.clearTokens();
    dispatch(logout());
  }
};
