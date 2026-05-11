import axios from "axios";
import { tokenService } from "../utils/tokenService";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: true,
});

api.interceptors.request.use(
  (config) => {
    const token = tokenService.getAccessToken();

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

let isRefreshing = false;
let subscribers = [];

const onRefreshed = (token) => {
  subscribers.forEach((cb) => cb(token));
  subscribers = [];
};

const addSubscriber = (cb) => {
  subscribers.push(cb);
};

api.interceptors.response.use(
  (res) => res,

  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      if (isRefreshing) {
        return new Promise((resolve) => {
          addSubscriber((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            resolve(api(originalRequest));
          });
        });
      }

      isRefreshing = true;

      try {
        const refreshToken = tokenService.getRefreshToken();

        const res = await axios.post("http://localhost:5000/api/auth/refresh", {
          refreshToken,
        });

        const newAccessToken = res.data.accessToken;

        tokenService.setTokens({
          accessToken: newAccessToken,
          refreshToken,
        });

        api.defaults.headers.Authorization = `Bearer ${newAccessToken}`;

        onRefreshed(newAccessToken);

        return api(originalRequest);
      } catch (err) {
        console.error("Refresh failed:", err);

        tokenService.clearTokens();

        window.location.href = "/";

        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    // Extract message safely
    const message =
      error.response?.data?.message || error.message || "Something went wrong";

    // Avoid toast spam for 401 (handled separately)
    if (error.response?.status !== 401) {
      toastService.error(message);
    }

    return Promise.reject(error);
  },
);

export default api;
