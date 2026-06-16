import axios from "axios";
import { useToastStore } from "@/store/toastStore";

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
  (response) => {
    if (
      response.data.message
    ) {
      useToastStore
        .getState()
        .addToast(
          "success",
          response.data.message
        );
    }

    return response;
  },

  (error) => {
    console.log(error.response?.data);

    if (
      error.response?.status === 401 &&
      (
        error.config.url === "/auth/me" ||
        error.config.url === "/auth/refresh"
      )
    ) {
      return Promise.reject(error);
    }

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