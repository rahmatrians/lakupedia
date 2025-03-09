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
        "/products"
    ]



    useEffect(() => {
        console.log("test1 : ", isAuthenticated)
        console.log("test2 : ", !adminRoutes.includes(path.pathname))
        console.log("test3 : ", customerRoutes.includes(path.pathname))
        console.log("test4 : ", userRole == "admin")
        console.log("test5 : ", path.pathname)

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

        if (userRole == "admin") {
            nav("/list-product")
        } else {
            nav("/")
        }
    }, [])

    return <AuthContext.Provider value={{ isAuthenticated }}>{children}</AuthContext.Provider>
}