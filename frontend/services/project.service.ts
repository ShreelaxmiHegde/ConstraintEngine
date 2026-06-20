import api from "@/lib/axios";

export const createProject = async (rawDescription: string) => {
  console.log(rawDescription);
  const res = await api.post("/project/", { rawDescription });
  return res.data;
}

export const fetchProject = async () => {
  const res = await api.get("/project/");
  return res.data;
}