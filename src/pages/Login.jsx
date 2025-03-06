import axios from 'axios'
import React, { useState } from 'react'
import { useToast } from '../components/ToastContext';
import { useNavigate } from 'react-router';

function Login() {
    let nav = useNavigate();
    const { showToast } = useToast();
    const [formData, xetFormData] = useState({
        email: "",
        password: ""
    })


    const handleSubmit = async () => {
        event.preventDefault()
        try {
            axios.post("http://10.50.0.13:3002/login", {
                email: formData.email,
                password: formData.password
            }).then(res => {
                localStorage.setItem("tokenSession", res.data.accessToken)
                showToast("Berhasil login", "success")
                nav("/")
            })
        } catch (error) {
            console.log(error);
            showToast("Gagal login", "error");
        }
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <label htmlFor='email'>Email: </label>
                <input type="text" id="email" onChange={(event) => {
                    xetFormData({ ...formData, email: event.target.value })
                }} />
                <br />
                <label htmlFor='password'>Password: </label>
                <input type="password" id="password" onChange={(event) => {
                    xetFormData({ ...formData, password: event.target.value })
                }} />
                <br />
                <br />
                <button type='submit'>Login</button>

            </form>
        </>
    )
}

export default Login