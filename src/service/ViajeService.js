import api from "./AxiosConfig";

export const ViajeService = {
    getAll() {
        return api.get("/viajes/");
    },
    create(viaje) {
        return api.post("/viajes/", viaje);
    },
    update(id, viaje) {
        return api.put(`/viajes/${id}/`, viaje);
    },
    remove(id) {
        return api.delete(`/viajes/${id}/`);
    }
}