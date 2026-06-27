import api from "@/lib/axios";

export const createProject = async (rawDescription: string) => {
  console.log(rawDescription);
  const res = await api.post("/project/", { rawDescription });
  return res.data;
}

export const fetchProject = async (projectId: string) => {
  console.log(projectId);
  const res = await api.get(`/project/${projectId}`);
  return res.data;
}

export const fetchAllProjects = async () => {
  const res = await api.get("/project");
  return res.data;
}