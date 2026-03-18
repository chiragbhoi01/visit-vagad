import api from "./axiosInstance"

/* ---------- LOGIN ---------- */

export const loginApi = (email: string, password: string) => {
    return api.post("/auth/login", {
        email,
        password
    })
}

/* ---------- REGISTER ---------- */

export const registerApi = (
    name: string,
    email: string,
    password: string
) => {
    return api.post("/auth/register", {
        name,
        email,
        password
    })
}

/* ---------- GET CURRENT USER ---------- */

export const getMeApi = () => {
    return api.get("/auth/me")
}