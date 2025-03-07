import { createContext, useEffect } from "react";
import { useLocation, useNavigate } from "react-router";

export const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
    const isAuthenticated = !!localStorage.getItem("tokenSession")

    const path = useLocation()
    const nav = useNavigate()



    useEffect(() => {
        if (path.pathname == "/") {
            nav(path.pathname)
        } else if (path.pathname != "/login" && !isAuthenticated) {
            nav('/login')
        }
    }, [path])

    return <AuthContext.Provider value={{ isAuthenticated }}>{children}</AuthContext.Provider>
}