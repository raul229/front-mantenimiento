import api from "./AxiosConfig";

export const getMantenimientos = () => {
  return api.get("/mantenimientos/");
};

export const createMantenimiento = (mantenimiento) => {
  return api.post("/mantenimientos/", mantenimiento);
};

export const updateMantenimiento = (id, mantenimiento) => {
  return api.put(`/mantenimientos/${id}/`, mantenimiento);
};

export const deleteMantenimiento = (id) => {
  return api.delete(`/mantenimientos/${id}/`);
};

