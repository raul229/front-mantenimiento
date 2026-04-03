import api from "./AxiosConfig";

export const CiudadService = {
    getAll(){
        return api.get("/ciudades/")
    },
    create(ciudad){
        return api.post("/ciudades/",ciudad)
    },
    update(id,ciudad){
        return api.put(`/ciudades/${id}/`,ciudad)
    },
    remove(id){
        return api.delete(`/ciudades/${id}/`)
    }
}