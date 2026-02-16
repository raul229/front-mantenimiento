import api from "./AxiosConfig";

export const getVehiculos = () => {
  return api.get("/vehiculos");
};
