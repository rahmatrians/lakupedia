import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import { useToast } from "../../components/ToastContext";

function CreateProduct() {
    let navigate = useNavigate();
    let accessToken = localStorage.getItem("tokenSession");
    let userId = localStorage.getItem("userId");
    const { showToast } = useToast();

    // State untuk menyimpan data input
    const [formData, setFormData] = useState({
        image: "",
        name: "",
        categoryId: "",
        price: "",
        stock: "",
        description: "",
    });

    // Handle perubahan input
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    // Handle submit form
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await axios.post(
                "http://localhost:3002/products", {
                name: formData.name,
                price: formData.price,
                categoryId: formData.categoryId,
                image: formData.image,
                description: formData.description,
                stock: formData.stock,
                userId: userId
            }
            );

            showToast("Produk berhasil ditambahkan!", "success");
            navigate("/list-product"); // Redirect ke halaman list product
        } catch (error) {
            console.log(error);
            showToast("Gagal menambahkan produk", "error");
        }
    };

    return (
        <div style={{ maxWidth: "600px", margin: "auto", textAlign: "left" }}>
            <h1>Tambah Produk Baru</h1>
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                <label>Image URL:</label>
                <input type="text" name="image" value={formData.image} onChange={handleChange} required style={{ width: "100%", padding: "8px" }} />

                <label>Item Name:</label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} required style={{ width: "100%", padding: "8px" }} />

                <label>Category:</label>
                <input type="text" name="categoryId" value={formData.categoryId} onChange={handleChange} required style={{ width: "100%", padding: "8px" }} />

                <label>Price:</label>
                <input type="number" name="price" value={formData.price} onChange={handleChange} required style={{ width: "100%", padding: "8px" }} />

                <label>Stock:</label>
                <input type="number" name="stock" value={formData.stock} onChange={handleChange} required style={{ width: "100%", padding: "8px" }} />

                <label>Description:</label>
                <textarea name="description" value={formData.description} onChange={handleChange} required style={{ width: "100%", padding: "8px", height: "100px" }} />

                <button type="submit" style={{ padding: "10px", backgroundColor: "#007BFF", color: "white", border: "none", cursor: "pointer" }}>
                    ➕ Tambah Produk
                </button>
            </form>
        </div>
    );
}

export default CreateProduct;
