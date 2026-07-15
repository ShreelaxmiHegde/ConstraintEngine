import axios from "axios";
import { useToastStore } from "@/store/toastStore";
import { logout, refresh } from "@/services/auth.service";

const baseURL = process.env.NEXT_PUBLIC_BASE_URL;

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
  (response) => {
    if (response.data.message) {
      useToastStore
        .getState()
        .addToast(
          "success",
          response.data.message
        );
    }

    return response;
  },

  async (error) => {
    const originalReq = error.config;

    if (
      error.response?.status === 401 &&
      (
        originalReq.url === "/auth/me" ||
        originalReq.url === "/auth/refresh" ||
        originalReq.url === "/auth/login" ||
        originalReq.url === "/auth/signup"
      )
    ) {
      return Promise.reject(error);
    }

    if (error.response?.status === 401 && !originalReq._retry) {
      originalReq._retry = true;

      try {
        await refresh();
        return api(originalReq);
      } catch {
        await logout();
      }

      return Promise.reject(error);
    }

    // only log error if its not auth and retried
    console.log(error.response?.data);

    useToastStore
      .getState()
      .addToast(
        "error",
        error.response?.data
          ?.message ??
        "Something went wrong"
      );

    return Promise.reject(error);
  }
);

export default api;