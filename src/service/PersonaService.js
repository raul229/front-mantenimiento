import api from "./AxiosConfig"

export const PersonaService = {
    getAll() {
        return api.get("/personas/");
    },
    create(persona) {
        return api.post("/personas/", persona);
    },
    update(id, persona) {
        return api.put(`/personas/${id}/`, persona);
    },
    remove(id) {
        return api.delete(`/personas/${id}/`);
    }
}