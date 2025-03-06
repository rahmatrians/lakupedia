import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter, Route, Routes } from "react-router";
import App from './App.jsx'
import Profile from '../src/pages/Profile.jsx';
import WorkExperience from '../src/pages/WorkExperience.jsx';
import Education from '../src/pages/Education.jsx';
import PersonalData from '../src/pages/PersonalData.jsx';
import DetailPersonalData from '../src/pages/DetailPersonalData.jsx';
import TambahPersonalData from '../src/pages/TambahPersonalData.jsx';
import { ToastProvider } from './components/ToastContext.jsx';
import { Toaster } from 'react-hot-toast';
import EditPersonalData from './pages/EditPersonalData.jsx';
import Login from './pages/Login.jsx';
import { AuthProvider } from './context/AuthContext.jsx';
import axios from 'axios';
import EditCategory from './pages/admin/EditCategory.jsx';


const token = localStorage.getItem("tokenSession");

if (token) {
  axios.defaults.headers["Authorization"] = `Bearer ${token}`;
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>

      <AuthProvider>

        {/* <Menus /> */}

        <ToastProvider>

          <Routes>
            <Route path="/" element={<App />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/work" element={<WorkExperience />} />
            <Route path="/education" element={<Education />} />
            <Route path="/personal-data" element={<PersonalData />} />
            <Route path="/personal-data/:id" element={<DetailPersonalData />} />
            <Route path="/personal-data/tambah" element={<TambahPersonalData />} />
            <Route path="/personal-data/edit/:id" element={<EditPersonalData />} />
            <Route path="/login" element={<Login />} />
            <Route path="/categories/:id" element={<EditCategory />} />
          </Routes>

          <Toaster />
        </ToastProvider>
      </AuthProvider>

    </BrowserRouter>
  </StrictMode>,
)
