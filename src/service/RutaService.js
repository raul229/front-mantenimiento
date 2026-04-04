import api from "./AxiosConfig";

export const RutaService = {
    getAll() {
        return api.get("/rutas/");
    },
    create(ruta) {
        return api.post("/rutas/", ruta);
    },
    update(id, ruta) {
        return api.put(`/rutas/${id}/`, ruta);
    },
    remove(id) {
        return api.delete(`/rutas/${id}/`);
    }
}

