import api from "./AxiosConfig";

export const RutaService = {
    getAll: async () => {
        return await api.get("/rutas/");
    },
    create: async (ruta) => {
        return await api.post("/rutas/", ruta);
    },
    update: async (id, ruta) => {
        return await api.put(`/rutas/${id}/`, ruta);
    },
    remove: async (id) => {
        return await api.delete(`/rutas/${id}/`);
    }
}

