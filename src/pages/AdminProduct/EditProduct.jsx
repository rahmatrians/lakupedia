import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useToast } from "../../components/ToastContext";

function EditProduct() {
    let { id } = useParams();
    let navigate = useNavigate();
    const { showToast } = useToast();

    const [formData, setFormData] = useState({
        image: "",
        name: "",
        categoryId: "",
        price: "",
        stock: "",
        description: "",
    });

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://10.50.0.13:3002/products/${id}`);
                setFormData(response.data);
                setLoading(false);
            } catch (error) {
                console.log(error);
                showToast("Gagal mengambil data produk", "error");
                setLoading(false);
            }
        };
        fetchData();
    }, [id, showToast]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Validasi input kosong
        if (!formData.name || !formData.categoryId || !formData.price || !formData.stock) {
            showToast("Semua kolom wajib diisi!", "error");
            return;
        }

        try {
            await axios.put(`http://10.50.0.13:3002/products/${id}`, formData);
            showToast("Berhasil mengupdate produk!", "success");
            navigate("/list-product");
        } catch (error) {
            console.log(error);
            showToast("Gagal mengupdate produk", "error");
        }
    };

    return (
        <div style={{ maxWidth: "500px", margin: "auto", textAlign: "left" }}>
            <h2>Edit Produk</h2>

            {loading ? (
                <p>Data sedang dimuat...</p>
            ) : (
                <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                    <label htmlFor="image">Image URL:</label>
                    <input
                        type="text"
                        id="image"
                        value={formData.image}
                        onChange={(event) => setFormData({ ...formData, image: event.target.value })}
                        placeholder="Masukkan URL gambar"
                        style={{ width: "100%", padding: "8px" }}
                    />

                    <label htmlFor="name">Nama Produk:</label>
                    <input
                        type="text"
                        id="name"
                        value={formData.name}
                        onChange={(event) => setFormData({ ...formData, name: event.target.value })}
                        required
                        placeholder="Masukkan nama produk"
                        style={{ width: "100%", padding: "8px" }}
                    />

                    <label htmlFor="categoryId">Kategori:</label>
                    <input
                        type="text"
                        id="categoryId"
                        value={formData.categoryId}
                        onChange={(event) => setFormData({ ...formData, categoryId: event.target.value })}
                        required
                        placeholder="Masukkan kategori produk"
                        style={{ width: "100%", padding: "8px" }}
                    />

                    <label htmlFor="price">Harga:</label>
                    <input
                        type="number"
                        id="price"
                        value={formData.price}
                        onChange={(event) => setFormData({ ...formData, price: event.target.value })}
                        required
                        placeholder="Masukkan harga produk"
                        style={{ width: "100%", padding: "8px" }}
                    />

                    <label htmlFor="stock">Stok:</label>
                    <input
                        type="number"
                        id="stock"
                        value={formData.stock}
                        onChange={(event) => setFormData({ ...formData, stock: event.target.value })}
                        required
                        placeholder="Masukkan jumlah stok"
                        style={{ width: "100%", padding: "8px" }}
                    />

                    <label htmlFor="description">Deskripsi:</label>
                    <textarea
                        id="description"
                        value={formData.description}
                        onChange={(event) => setFormData({ ...formData, description: event.target.value })}
                        placeholder="Tambahkan deskripsi produk"
                        rows="4"
                        style={{ width: "100%", padding: "8px" }}
                    ></textarea>

                    <button type="submit" style={{ padding: "10px", backgroundColor: "#007BFF", color: "white", border: "none", cursor: "pointer" }}>
                        ✅ Simpan Perubahan
                    </button>
                </form>
            )}
        </div>
    );
}

export default EditProduct;
