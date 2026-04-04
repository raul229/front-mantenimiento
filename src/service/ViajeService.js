import api from "./AxiosConfig";

export const ViajeService = {
    getAll: async () => {
        return await api.get("/viajes/");
    },
    create: async (viaje) => {
        return await api.post("/viajes/", viaje);
    },
    update: async (id, viaje) => {
        return await api.put(`/viajes/${id}/`, viaje);
    },
    remove: async (id) => {
        return await api.delete(`/viajes/${id}/`);
    }
}