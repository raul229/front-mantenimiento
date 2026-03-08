import api from "./AxiosConfig";

export const getFallas = () => {
  return api.get("/fallas");
};

export const createFalla = (falla) => {
  return api.post("/fallas/", falla);
};

export const updateFalla = (id, falla) => {
  return api.put(`/fallas/${id}/`, falla);
};

export const deleteFalla = (id) => {
  return api.delete(`/fallas/${id}/`);
};
