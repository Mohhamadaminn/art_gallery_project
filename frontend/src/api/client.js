import axios from "axios";

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:8000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Optional: Add request interceptor for debugging
apiClient.interceptors.request.use((config) => {
  console.log(`[API Request] ${config.method.toUpperCase()} ${config.url}`);
  return config;
});

export default apiClient;