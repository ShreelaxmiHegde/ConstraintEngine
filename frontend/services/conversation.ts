import api from "@/lib/axios"

export const getResponse = async (prompt: string) => {
  const res = await api.post("/ask", { prompt });
  return res.data;
}