import { createContext, useState, useEffect, useContext } from "react"
import { loginApi, registerApi, getMeApi } from "../apis/auth.api"
import type IUser from "../types/index"

interface AuthContextType {
  user: IUser | null
  token: string | null
  login: (email: string, password: string) => Promise<any>
  register: (name: string, email: string, password: string) => Promise<any>
  logout: () => void
  loading: boolean
}

export const AuthContext = createContext<AuthContextType | null>(null)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider")
  }
  return context
}

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<IUser | null>(null)
  const [token, setToken] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  /* ---------- LOGIN ---------- */

  const login = async (email: string, password: string) => {
    const res = await loginApi(email, password)
    const { user, token } = res.data

    setUser(user)
    setToken(token)
    localStorage.setItem("token", token)

    return res.data
  }

  /* ---------- REGISTER ---------- */

  const register = async (name: string, email: string, password: string) => {
    const res = await registerApi(name, email, password)
    const { user, token } = res.data

    setUser(user)
    setToken(token)
    localStorage.setItem("token", token)

    return res.data
  }

  /* ---------- LOGOUT ---------- */

  const logout = () => {
    setUser(null)
    setToken(null)
    localStorage.removeItem("token")
  }

  /* ---------- AUTO LOGIN (FIXED) ---------- */

  useEffect(() => {
    const initAuth = async () => {
      const storedToken = localStorage.getItem("token")

      if (!storedToken) {
        setLoading(false)
        return
      }

      try {
        setToken(storedToken)

        const res = await getMeApi()
        setUser(res.data.user)
      } catch (error) {
        logout()
      } finally {
        setLoading(false)
      }
    }

    initAuth()
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