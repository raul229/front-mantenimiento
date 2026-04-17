import api from "./AxiosConfig";

export const RecojoService = {
    getAll() {
        return api.get("/recojos/");
    },
    create(recojo) {
        return api.post("/recojos/", recojo);
    },
    update(id, recojo) {
        return api.put(`/recojos/${id}/`, recojo);
    },
    remove(id) {
        return api.delete(`/recojos/${id}/`);
    },
};
