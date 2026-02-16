import api from "./AxiosConfig";

export const getFallas = () => {
  return api.get("/fallas");
};
