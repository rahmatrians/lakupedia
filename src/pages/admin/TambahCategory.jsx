import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router'
import { useToast } from '../../components/ToastContext'

const TambahCategory = () => {
    let nav = useNavigate()
    const { showToast } = useToast()

    const [formData, setFormData] = useState({
        name: "",
        userId: 4
    })

    const handleSubmit = () => {
        event.preventDefault()
        try {
            axios.post("http://10.50.0.13:3002/categories", {
                name: formData.name,
                userId: formData.userId
            })
            showToast("Berhasil simpan data", "success");
        } catch (error) {
            console.log(error);
            showToast("Gagal simpan data", "error");
        }
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <label htmlFor='name'>Name: </label>
                <input type="text" id="name" placeholder='Nama Kategori' onChange={(event) => {
                    setFormData({ ...formData, name: event.target.value })
                }} />
                <br />
                <button type='submit'>Add Category</button>

            </form>
        </>
    )
}

export default TambahCategory