import api from "@/lib/axios";
import { GuestSessionInput } from "@/types/auth";

export const guestSession = async (formdata: GuestSessionInput) => {
  console.log(formdata);
  const response = await api.post('/m', formdata);
  return response.data;
}

