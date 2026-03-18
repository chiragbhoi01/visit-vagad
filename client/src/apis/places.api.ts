import api from "./axiosInstance"

/* ---------- GET ALL PLACES ---------- */

export const getAllPlacesApi = (district?: string, category?: string) => {
    return api.get("/places", {
        params: {
            district,
            category
        }
    })
}

/* ---------- GET PLACE BY ID ---------- */

export const getPlaceByIdApi = (id: string) => {
    return api.get(`/places/${id}`)
}