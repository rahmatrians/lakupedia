import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useToast } from '../../components/ToastContext'

const Cart = () => {
    const userId = parseInt(localStorage.getItem('userId'))
    const [cart, setCart] = useState([])
    const { showToast } = useToast()

    useEffect(() => {
        getCart()
    }, [])

    const getCart = async () => {
        try {
            const response = await axios.get(`http://10.50.0.13:3002/cart?userId=${userId}`)
            const cartData = response.data
                
            // Fetch product details one by one
            const cartWithProducts = await Promise.all(
                cartData.map(async (item) => {
                const productResponse = await axios.get(`http://10.50.0.13:3002/products/${item.productId}`)
                return { ...item, product: productResponse.data }
                })
            )
    
            setCart(cartWithProducts)
        } catch (err) {
            console.error(err)
            showToast("Failed to load cart 😢", "error")
        }
    }

    const updateQuantity = async (id, quantity) => {
        if (quantity <= 0) {
            deleteItem(id)
            return
        }
        try {
            await axios.patch(`http://10.50.0.13:3002/cart/${id}`, { quantity })
            getCart()
        } catch (err) {
            console.error(err)
            showToast("Failed to update quantity", 'error')
        }
    }

    const deleteItem = async (id) => {
        if (!window.confirm("Apakah Anda yakin ingin menghapus data ini?")) return;
        try {
            await axios.delete(`http://10.50.0.13:3002/cart/${id}`)
            showToast("Berhasil hapus barang", "success");
            getCart()
        } catch (error) {
            console.log(error);
            showToast("Gagal hapus barang", "error");
        }
    }

    return (
        <div>
        <h1>Your Cart 🛒</h1>
        {cart.length === 0 ? (
            <h3>Your cart is empty 😢</h3>
        ) : (
            cart.map((item, index) => (
            <div key={index} style={{ display: "flex", gap: "20px", alignItems: "center", marginBottom: "20px" }}>
                <img src={item.product.image} width="100px" alt={item.product.name} />
                <h3>{item.product.name}</h3>
                <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                <span>{item.quantity}</span>
                <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                <button style={{ backgroundColor: "red", color: "white" }} onClick={() => deleteItem(item.id)}>Delete 🗑️</button>
            </div>
            ))
        )}
        {cart.length > 0 && (
            <h2>Total: Rp{cart.reduce((total, item) => total + item.quantity * item.product.price, 0).toLocaleString("id-ID")}</h2>
        )}
        </div>
    )
}

export default Cart