import React, { useEffect, useState } from 'react'
import Menus from '../components/Menus'
import axios from 'axios'
import { Link, useNavigate } from 'react-router';
import { useToast } from '../components/ToastContext';

function PersonalData() {
    let nav = useNavigate()
    let accessToken = null
    const { showToast } = useToast()
    const [personalData, setPersonalData] = useState(null);

    useEffect(() => {
        fetchData()
        accessToken = localStorage.getItem("tokenSession")
        console.log(accessToken);

    }, [])

    const fetchData = async () => {
        try {
            const data = await axios.get("http://10.100.15.186:3000/personaldata",
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    }
                }
            );
            setPersonalData(data.data);
        } catch (error) {
            console.log(error);
        }
    }

    const deletePersonalData = (id) => {
        try {
            axios.delete("http://10.100.15.186:3000/personaldata/" + id)
            fetchData()
            showToast("Berhasil hapus data", "success");
        } catch (error) {
            console.log(error);
            showToast("Gagal hapus data", "error");
        }
    }

    return (
        <>
            <h1>Personal Data Page</h1>

            <br />

            <div>
                {personalData == null ? (
                    <p>Data sedang dimuat</p>
                ) : (
                    <>
                        {personalData.map((item, index) => (
                            <div key={index}>
                                <Link to={`/personal-data/${item.id}`}>{item.name}</Link>
                                <Link to={`/personal-data/edit/${item.id}`}> ✏️</Link>
                                <Link onClick={() => {
                                    if (window.confirm("Are you sure you want to delete this item?")) {
                                        deletePersonalData(item.id)
                                    }
                                }}> 💀</Link>
                            </div>

                        ))}
                        <br />
                        <button>
                            <Link to={"/personal-data/tambah"}>Tambah Data</Link>
                        </button>
                    </>
                )}
            </div>

            <br />

            <Menus />
        </>

    )
}

export default PersonalData