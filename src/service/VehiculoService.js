import api from "./AxiosConfig";

export const getVehiculos = () => {
  return api.get("/vehiculos/");
};

export const createVehiculo = (vehiculo) => {
  return api.post("/vehiculos/", vehiculo);
};

export const updateVehiculo = (id, vehiculo) => {
  return api.put(`/vehiculos/${id}/`, vehiculo);
};

export const deleteVehiculo = (id) => {
  return api.delete(`/vehiculos/${id}/`);
};  
