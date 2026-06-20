import api from "@/lib/axios"

export const startConversation = async (prompt: string) => {
  const res = await api.post("/conversation", { prompt });
  return res.data;
}