import api from "./axios";


export const firstConvo = async (req) => {
  console.log(req);
  const result = await api.post('/c', req);
  return result;
}