import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router';
import { useToast } from '../components/ToastContext';

function TambahPersonalData() {
    let nav = useNavigate();
    const { showToast } = useToast();


    const [formData, xetFormData] = useState({
        name: "",
        email: ""
    })

    const handleSubmit = () => {
        event.preventDefault()
        try {
            axios.post("http://localhost:3000/personaldata", {
                name: formData.name,
                email: formData.email
            })

            showToast("Berhasil simpan data", "success");

            nav("/personal-data");
        } catch (error) {
            console.log(error);
            showToast("Gagal simpan data", "error");
        }
    }



    return (
        <>
            <form onSubmit={handleSubmit}>
                <label htmlFor='name'>Name: </label>
                <input type="text" id="name" onChange={(event) => {
                    xetFormData({ ...formData, name: event.target.value })
                }} />
                <br />
                <label htmlFor='email'>Email: </label>
                <input type="text" id="email" onChange={(event) => {
                    xetFormData({ ...formData, email: event.target.value })
                }} />
                <br />
                <button type='submit'>Submit</button>

            </form>
        </>
    )
}

export default TambahPersonalData