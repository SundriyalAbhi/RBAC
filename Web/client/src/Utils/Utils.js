import axios from "axios";

const baseURL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8087";

const API = axios.create({
  baseURL,
  headers: {
    "Cache-Control": "no-cache",
    "Pragma": "no-cache",
  },
});

// ✅ Request interceptor — attach token + cache buster
API.interceptors.request.use(
  (config) => {
    // Attach auth token if available
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Cache buster — prevents 304 Not Modified
    config.params = {
      ...config.params,
      _t: Date.now(),
    };

    return config;
  },
  (error) => Promise.reject(error)
);

// ✅ Response interceptor — handle token expiry globally
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired — redirect to login
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export { axios, API, baseURL };
