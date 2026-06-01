import axios from "axios";

const baseURL = process.env.NEXT_PUBLIC_API_URL;

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
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        await api.post('auth/refresh');
        return api(originalRequest);
      } catch {
        window.location.href = '/login';
      }
    }

    return Promise.reject(error);
  }
)

export default api;