import api from "./axios";
import { GuestSessionInput, LoginInput, SignupInput } from "./types";

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
  const response = await api.get('auth/logout');
  return response.data;
}

export const getMe = async () => {
  const response = await api.get('/auth/me');
  return response.data;
}

export const guestSession = async (formdata: GuestSessionInput) => {
  console.log(formdata);
  const response = await api.post('/m', formdata);
  return response.data;
}

export const extractConstraints = async (formdata: GuestSessionInput) => {
  console.log(formdata);
  const response = await api.post('/m', formdata);
  return response.data;
}