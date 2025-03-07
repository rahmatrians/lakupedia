import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router';
import { useToast } from '../components/ToastContext';

function EditPersonalData() {
    let { id } = useParams()
    let nav = useNavigate()
    const { showToast } = useToast()

    const [formData, xetFormData] = useState({
        id: "",
        name: "",
        email: ""
    })


    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await axios.get("http://10.100.15.186:3000/personaldata/" + id);
                console.log(data);
                xetFormData(data.data);
            } catch (error) {
                console.log(error);
            }
        }
        fetchData()
    }, [id])


    const handleSubmit = (event) => {
        event.preventDefault()
        try {
            axios.put("http://10.100.15.186:3000/personaldata/" + id, {
                name: formData.name,
                email: formData.email
            })

            showToast("Berhasil ubah data", "success");
            nav("/personal-data");
        } catch (error) {
            console.log(error);
            showToast("Gagal ubah data", "error");
        }
    }



    return (
        <>
            {formData == null ? (
                <p>Data sedang dimuat</p>
            ) : (
                <form onSubmit={handleSubmit}>
                    <label htmlFor='name'>Name: </label>
                    <input type="text" id="name" value={formData.name} onChange={(event) => {
                        xetFormData({ ...formData, name: event.target.value })
                    }} />
                    <br />
                    <label htmlFor='email'>Email: </label>
                    <input type="email" id="email" value={formData.email} onChange={(event) => {
                        xetFormData({ ...formData, email: event.target.value })
                    }} />
                    <br />
                    <br />
                    <button type='submit'>Submit</button>

                </form>
            )}
        </>
    )
}

export default EditPersonalData