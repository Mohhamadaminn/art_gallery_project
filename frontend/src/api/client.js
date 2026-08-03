import axios from "axios";
import { attachAuthInterceptors } from "./authInterceptor";

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:8000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

attachAuthInterceptors(apiClient);

export default apiClient;