import axios from "axios";

const baseURL = "http://localhost:8080";

if (!baseURL) {
  throw new Error(
    "NEXT_PUBLIC_API_URL missing"
  );
}

const api = axios.create({
  baseURL,
  withCredentials: true
});

api.interceptors.response.use(
  response => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      originalRequest.url !== "/auth/refresh"
    ) {
      try {
        await api.post("/auth/refresh");

        return api(originalRequest);
      } catch {
        return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  }
);

export default api;