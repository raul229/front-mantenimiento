import api from "./AxiosConfig";

export const SedeService = {
    getAll() {
        return api.get("/sedes/")
    },
    create(sede){
        return api.post("/sedes/",sede)
    },
    update(id,sede){
        return api.put(`/sedes/${id}/`,sede)
    },
    remove(id){
        return api.delete(`/sedes/${id}/`)
    }
}   