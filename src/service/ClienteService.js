import api from "./AxiosConfig";

export const ClienteService = {
    getAll() {
        return api.get("/clientes/");
    },
    create(cliente) {
        return api.post("/clientes/", cliente);
    },
    update(id, cliente) {
        return api.put(`/clientes/${id}/`, cliente);
    },
    remove(id) {
        return api.delete(`/clientes/${id}/`);
    }
}   
