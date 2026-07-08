import api from "@/lib/axios"

export const getResponse = async (
  prompt: string,
  projectId: string,
  conversationId: string
) => {
  console.log(prompt, projectId, conversationId)
  const res = await api.post("/ask", { prompt, projectId, conversationId });
  return res.data;
}