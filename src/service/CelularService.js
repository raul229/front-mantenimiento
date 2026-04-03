import api from "./AxiosConfig";

export const CelularService = {
    getAll(){
        return api.get("/celulares/")
    },
    create(celular){
        return api.post("/celulares/",celular)
    },
    update(id,celular){
        return api.put(`/celulares/${id}/`,celular)
    },
    remove(id){
        return api.delete(`/celulares/${id}/`)
    }
}