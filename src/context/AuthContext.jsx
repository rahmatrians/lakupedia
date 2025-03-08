import { createContext, useEffect } from "react";
import { useLocation, useNavigate } from "react-router";

export const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
    const isAuthenticated = !!localStorage.getItem("tokenSession")

    const path = useLocation()
    const nav = useNavigate()


    const publicRoutes = [
        "/login",
        "/register",
        "/",
        "/products"
    ]


    useEffect(() => {
        if (!publicRoutes.includes(path.pathname) && !isAuthenticated) {
            nav('/login')
        }
    }, [path])

    return <AuthContext.Provider value={{ isAuthenticated }}>{children}</AuthContext.Provider>
}