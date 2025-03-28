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
        "/admin/product",
        "/admin/product/add",
        "/admin/product",
        "/admin/category",
        "/admin/category",
        "/admin/category/add"
    ]

    const customerRoutes = [
        "/cart",
        "/products"
    ]



    useEffect(() => {

        if (!publicRoutes.includes(path.pathname) && !isAuthenticated) {
            nav('/login')
        } else if (isAuthenticated && adminRoutes.includes(path.pathname) && userRole == "customer") {
            console.log("customer gabisa akses")
            nav("/")
        } else if (isAuthenticated && customerRoutes.includes(path.pathname) && userRole == "admin") {
            console.log("admin gabisa akses")
            nav("/")
            // } else {
            //     nav("/")
        }
    }, [path])

    return <AuthContext.Provider value={{ isAuthenticated }}>{children}</AuthContext.Provider>
}