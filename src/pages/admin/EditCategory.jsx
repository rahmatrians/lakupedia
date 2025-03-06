import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams, useNavigate } from 'react-router'
import { useToast } from '../../components/ToastContext';

const EditCategory = () => {
    let{ id } = useParams()
    const nav = useNavigate()
    const { showToast } = useToast()

    const [formData, setFormData] = useState({
        name: "",
    })

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await axios.get("http://10.50.0.13:3002/categories/" + id);
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
                axios.put("http://10.50.0.13:3002/categories/" + id, {
                    name: formData.name
                })
                showToast("Berhasil ubah data", "success");
            } catch (error) {
                console.log(error);
                showToast("Gagal ubah data", "error");
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
        </>
    )
}

export default EditCategory