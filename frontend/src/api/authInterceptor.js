import axios from "axios";

const REFRESH_URL =
  (import.meta.env.VITE_API_BASE_URL || "http://localhost:8000/api") +
  "/auth/token/refresh/";

let refreshPromise = null;

function refreshAccessToken() {
  if (!refreshPromise) {
    const refresh = localStorage.getItem("refresh");
    refreshPromise = axios
      .post(REFRESH_URL, { refresh })
      .then(({ data }) => {
        localStorage.setItem("access", data.access);
        return data.access;
      })
      .finally(() => {
        refreshPromise = null;
      });
  }
  return refreshPromise;
}

export function attachAuthInterceptors(instance) {
  instance.interceptors.request.use((config) => {
    const token = localStorage.getItem("access");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  });

  instance.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;

      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        try {
          const newAccess = await refreshAccessToken();
          originalRequest.headers.Authorization = `Bearer ${newAccess}`;
          return instance(originalRequest);
        } catch {
          localStorage.removeItem("access");
          localStorage.removeItem("refresh");
          const currentPath = window.location.pathname + window.location.search;
          window.location.href = `/login?next=${encodeURIComponent(currentPath)}`;
        }
      }

      return Promise.reject(error);
    }
  );
}