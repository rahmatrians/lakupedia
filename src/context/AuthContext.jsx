import { createContext, useEffect } from "react";
import { useLocation, useNavigate } from "react-router";

export const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
    const isAuthenticated = !!localStorage.getItem("tokenSession")
    const userRole = localStorage.getItem("userRole")

    const path = useLocation()
    const nav = useNavigate()

    const publicRoutes = [
        "/login",
        "/register",
        "/",
        "/products"
    ]

    const adminRoutes = [
        "/list-product",
        "/create-product",
        "/edit-product",
        "/categories",
        "/category",
        "/categories/add"
    ]

    const customerRoutes = [
        "/cart",
        "/products/"
    ]



    useEffect(() => {
        if (!publicRoutes.includes(path.pathname) && !isAuthenticated) {
            nav('/login')
        } else if (isAuthenticated && adminRoutes.includes(path.pathname) && userRole == "customer") {
            nav("/")
        } else if (isAuthenticated && !adminRoutes.includes(path.pathname) && !publicRoutes.includes(path.pathname) && userRole == "admin") {
            nav("/")
        } else {
            nav("/")
        }
    }, [])

    return <AuthContext.Provider value={{ isAuthenticated }}>{children}</AuthContext.Provider>
}