import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams, useNavigate, Link } from 'react-router'
import { useToast } from '../../components/ToastContext';

const EditCategory = () => {
    let { id } = useParams()
    const nav = useNavigate()
    const { showToast } = useToast()
    const userId = parseInt(localStorage.getItem('userId'))

    const [formData, setFormData] = useState({
        name: "",
        userId: userId
    })

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await axios.get("http://10.100.15.186:3002/categories/" + id);
                console.log(data);
                setFormData(data.data);
            } catch (error) {
                console.log(error);
            }
        }
        fetchData()
    }, [id])

    const handleSubmit = (event) => {
        event.preventDefault()
        try {
            axios.put("http://10.100.15.186:3002/categories/" + id, {
                name: formData.name,
                userId: formData.userId
            })
            showToast("Berhasil ubah data", "success");
            nav("/category")
        } catch (error) {
            console.log(error);
            showToast("Gagal ubah data", "error");
        }
    }

    const deleteCategory = (id) => {
        try {
            axios.delete("http://10.100.15.186:3002/categories/" + id)
            showToast("Berhasil hapus data", "success");

        } catch (error) {
            console.log(error);
            showToast("Gagal hapus data", "error");
        }
    }
    return (
        <>
            {!formData ? (
                <p>Data sedang dimuat</p>
            ) : (
                <form onSubmit={handleSubmit}>
                    <label htmlFor='name'>Name: </label>
                    <input type="text" id="name" value={formData.name} onChange={(event) => {
                        setFormData({ ...formData, name: event.target.value })
                    }} />
                    <br />
                    <button type='submit'>Update</button>
                </form>
            )}
            <Link onClick={() => {
                if (window.confirm("Are you sure you want to delete this item?")) {
                    deleteCategory(id)
                }
            }}> 💀</Link>
        </>
    )
}

export default EditCategory