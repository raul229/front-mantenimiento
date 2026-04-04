import api from "./AxiosConfig"

export const PersonaService = {
    getAll: async () => {
        return await api.get("/personas/");
    },
    create: async (persona) => {
        return await api.post("/personas/", persona);
    },
    update: async (id, persona) => {
        return await api.put(`/personas/${id}/`, persona);
    },
    remove: async (id) => {
        return await api.delete(`/personas/${id}/`);
    }
}