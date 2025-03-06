import axios from 'axios'
import React, { useState } from 'react'
import { useToast } from '../components/ToastContext';
import { useNavigate } from 'react-router';

function Login() {
    let nav = useNavigate();
    const { showToast } = useToast();
    const [formData, xetFormData] = useState({
        username: "",
        password: ""
    })


    const handleSubmit = async () => {
        event.preventDefault()
        try {
            axios.post("http://localhost:3000/auth/login", {
                username: formData.username,
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
                <label htmlFor='username'>Username: </label>
                <input type="text" id="username" onChange={(event) => {
                    xetFormData({ ...formData, username: event.target.value })
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