import axios from "axios";
import { baseURL } from "./baseURL.js";
import store from "../store/store.js";
import { logout, setCredentials } from "../store/authslice.js";

const API = axios.create({
  baseURL: baseURL,
  withCredentials: true, // Include cookies for refresh token
});

// Attach token to requests
API.interceptors.request.use((config) => {
  const token = store.getState().auth.accessToken;
  if (token && !config.headers.Authorization) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle responses & refresh tokens
API.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

     if (!originalRequest) return Promise.reject(error);

    // prevent infinite loop
    if (originalRequest.url.includes("/refresh-token")) {
      return Promise.reject(error);
    }

    // If token expired & not retried already
    if (
      (error.response?.status === 401 || error.response?.status === 403) &&
      !originalRequest._retry) {
      originalRequest._retry = true;

      try {

        // Get new access token
        const res = await API.post("/api/v1/users/refresh-token");

        const newAccessToken = res.data.data.accessToken;

        // Update Redux store
        store.dispatch(
          setCredentials({
            // user: res.data.data.user,
            accessToken: newAccessToken
          })
        );

        // Retry original request with new token
         originalRequest.headers = originalRequest.headers || {};
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return API(originalRequest);
      } catch (err) {
        store.dispatch(logout());
        return Promise.reject(err);
      }
    }
    return Promise.reject(error);
  }
);

export default API;