import { createContext, useState, useEffect } from "react"
import { loginApi, registerApi, getMeApi } from "../apis/auth.api"
import type IUser from "../types/index"

interface AuthContextType {
  user: IUser | null
  token: string | null
  login?: (email: string, password: string) => Promise<any>
  register: (name: string, email: string, password: string) => Promise<any>
  logout: () => void
  loading: boolean
}

export const AuthContext = createContext<AuthContextType | null>(null)

const AuthProvider = ({ children }: { children: any }) => {

  const [user, setUser] = useState<IUser | null>(null)
  const [token, setToken] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  /* ---------- LOGIN ---------- */

  const login = async (email: string, password: string) => {
    try {
      const res = await loginApi(email, password)
      const { user, token } = res.data

      setUser(user)
      setToken(token)
      localStorage.setItem("token", token)

      return res.data
    } catch (error) {
      console.error("Login failed:", error)
      throw error
    }
  }

  /* ---------- REGISTER ---------- */

  const register = async (name: string, email: string, password: string) => {
    try {
      const res = await registerApi(name, email, password)
      const { user, token } = res.data

      setUser(user)
      setToken(token)
      localStorage.setItem("token", token)

      return res.data
    } catch (error) {
      console.error("Register failed:", error)
      throw error
    }
  }

  /* ---------- LOGOUT ---------- */

  const logout = () => {
    setUser(null)
    setToken(null)
    localStorage.removeItem("token")
  }

  /* ---------- AUTO LOGIN ---------- */

  useEffect(() => {
    const storedToken = localStorage.getItem("token")

    if (storedToken) {
      setToken(storedToken)

      // Fetch user profile with stored token
      getMeApi()
        .then(res => {
          setUser(res.data.user)
        })
        .catch(() => {
          logout()
        })
    }

    setLoading(false)
  }, [])

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        login,
        register,
        logout,
        loading
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider