import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:5000/",
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor
apiClient.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error("API error:", error);
    return Promise.reject(error);
  }
);

// Cache control to prevent caching
apiClient.interceptors.request.use((config) => {
  config.headers["Cache-Control"] = "no-cache";
  return config;
});

export default apiClient;
