import api from "./AxiosConfig";

export const getMantenimientos = () => {
  return api.get("/mantenimientos");
};
