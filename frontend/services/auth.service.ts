import api from "@/lib/axios";
import { SignupInput, LoginInput } from "@/types/auth";


export const signup = async (formdata: SignupInput) => {
  console.log("Signup data: ", formdata);
  const response = await api.post('auth/signup', formdata);
  return response.data;
}

export const login = async (formdata: LoginInput) => {
  console.log("Login data: ", formdata);
  const response = await api.post('auth/login', formdata);
  return response.data;
}

export const logout = async () => {
  console.log("logging user out...");
  const response = await api.post('auth/logout');
  return response.data;
}

export const refresh = async () => {
  const response = await api.post('/auth/refresh');
  return response.data;
}

export const getMe = async () => {
  const response = await api.get('/auth/me');
  return response.data;
}