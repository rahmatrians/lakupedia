import React, { useEffect, useState } from "react";
import Menus from "../../components/Menus";
import axios from "axios";
import { Link, useNavigate } from 'react-router';
import { useToast } from "../../components/ToastContext";

function ListProduct() {
    let navigate = useNavigate();
    let accessToken = localStorage.getItem("tokenSession");
    const { showToast } = useToast();
    const [personalData, setPersonalData] = useState(null);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get("http://10.50.0.13:3002/products", {
                headers: { Authorization: `Bearer ${accessToken}` },
            });
            setPersonalData(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    const deletePersonalData = async (id) => {
        if (!window.confirm("Apakah Anda yakin ingin menghapus data ini?")) return;
        
        try {
            await axios.delete(`http://10.50.0.13:3002/products${id}`);
            fetchData();
            showToast("Berhasil hapus data", "success");
        } catch (error) {
            console.log(error);
            showToast("Gagal hapus data", "error");
        }
    };

    return (
        <>
            <h1>List Product</h1>

            <button>
                <Link to={"/create-product"}>➕ Add New Item</Link>
            </button>

            <br />
            <br />

            <div>
                {personalData == null ? (
                    <p>Data sedang dimuat...</p>
                ) : (
                    <table border="1" cellPadding="10" width="100%">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Image</th>
                                <th>Item Name</th>
                                <th>Category</th>
                                <th>Price</th>
                                <th>Stock</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {personalData.map((item) => (
                                <tr key={item.id}>
                                    <td>{item.id}</td>
                                    <td>
                                        {item.image ? (
                                            <img src={item.image} alt={item.name} width="50" />
                                        ) : (
                                            "No Image"
                                        )}
                                    </td>
                                    <td>{item.name}</td>
                                    <td>{item.category}</td>
                                    <td>{item.price}</td>
                                    <td>{item.stock}</td>
                                    <td>
                                        {/* <Link to={`/personal-data/${item.id}`}>🔍 View</Link> |{" "} */}
                                        <Link to={`/personal-data/edit/${item.id}`}> Edit</Link> 
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>

            {/* <br />
            <button>
                <Link to={"/personal-data/tambah"}>➕ Tambah Data</Link>
            </button> */}
{/* 
            <br />
            <Menus /> */}
        </>
    );
}

export default ListProduct;