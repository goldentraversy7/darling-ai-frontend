import axios from "axios";

// Create axios instance with default config
const api = axios.create({ baseURL: "http://5.180.24.82:5000/api" });

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // You can add auth tokens here
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle errors globally
    if (error.response?.status === 401) {
      // Handle unauthorized
      localStorage.removeItem("token");
      window.location.href = "/signin";
    }
    return Promise.reject(error);
  }
);

export default api;
