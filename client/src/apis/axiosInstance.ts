import axios from "axios"

const api = axios.create({
    baseURL: `${import.meta.env.VITE_API_URL}/api`,
    headers: {
        "Content-Type": "application/json"
    }
})

/* ---------- REQUEST INTERCEPTOR ---------- */

api.interceptors.request.use(
    (config) => {

        const token = localStorage.getItem("token")

        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }

        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)


/* ---------- RESPONSE INTERCEPTOR ---------- */

api.interceptors.response.use(
    (response) => {
        return response
    },
    (error) => {

        if (error.response && error.response.status === 401) {

            // remove invalid token
            localStorage.removeItem("token")

            // redirect to login
            window.location.href = "/login"
        }

        return Promise.reject(error)
    }
)

export default api