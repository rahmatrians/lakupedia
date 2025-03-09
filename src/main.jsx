import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import App from './App.jsx'
import { ToastProvider } from './components/ToastContext.jsx';
import { Toaster } from 'react-hot-toast';
import Login from './pages/Login.jsx';
import { AuthProvider } from './context/AuthContext.jsx';
import axios from 'axios';
import ListProduct from './pages/AdminProduct/ListProduct.jsx';
import CustomerListProduct from './pages/customer/ListProduct.jsx';
import CreateProduct from './pages/AdminProduct/CreateProduct.jsx';
import EditProduct from './pages/AdminProduct/EditProduct.jsx';
import TambahCategory from './pages/admin/TambahCategory.jsx';
import EditCategory from './pages/admin/EditCategory.jsx';
import ListCategory from './pages/admin/ListCategory.jsx';
import ProductDetail from './pages/customer/ProductDetail.jsx';
import { ConfigProvider, theme } from 'antd';
import Cart from './pages/customer/Cart.jsx';
import Register from './pages/Register.jsx';
import Menus from './components/Menus.jsx';



const token = localStorage.getItem("tokenSession");
const userId = localStorage.getItem("userId");

if (token) {
  axios.defaults.headers["Authorization"] = `Bearer ${token}`;

}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>

      <AuthProvider>

        <ConfigProvider
        // theme={{
        //   algorithm: theme.darkAlgorithm,
        // }}
        >
          {/* <Menus /> */}

          <ToastProvider>

            {/* <Menus /> */}

            <Routes>



              {/* public routes */}
              <Route path="/" element={<CustomerListProduct />} />
              <Route path="/login" element={<Login />} />
              <Route path='/register' element={<Register />} />
              <Route path="/products/:id" element={<ProductDetail />} />

              {/* customer routes */}
              <Route path="/cart" element={userId ? <Cart /> : <Navigate to="/" />} />

              {/* admin routes */}
              <Route path="/admin/product" element={<ListProduct />} />
              <Route path="/admin/product/add" element={<CreateProduct />} />
              <Route path="/admin/product/:id" element={<EditProduct />} />
              <Route path="/admin/category" element={<ListCategory />} />
              <Route path="/admin/category/add" element={<TambahCategory />} />
              <Route path="/admin/category/:id" element={<EditCategory />} />

            </Routes>


            <Toaster />
          </ToastProvider>
        </ConfigProvider>
      </AuthProvider>

    </BrowserRouter>
  </StrictMode>,
)
