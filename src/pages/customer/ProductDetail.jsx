import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams } from 'react-router'
import { useToast } from '../../components/ToastContext'

const ProductDetail = () => {
    let { id } = useParams()
    id = parseInt(id)
    const [productDetail, setProductDetail] = useState(null)
    const { showToast } = useToast()
    const [quantity, setQuantity] = useState(0)
    const userId = parseInt(localStorage.getItem('userId'))

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await axios.get("http://localhost:3002/products/" + id);
                setProductDetail(data.data);
            } catch (error) {
                console.log(error);
            }
        }
        fetchData()
    }, [id])

    const formattedPrice = new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR"
    }).format(productDetail?.price)

    const handleAddToCart = async () => {
        try {
            if (quantity === 0) {
                showToast('Please specify quantity', 'error')
                return
            }
            const response = await axios.post('http://localhost:3002/cart', {
                userId: userId,
                productId: id,
                quantity: quantity
            })

            showToast('Item added to cart 🛒', "success")
        } catch (err) {
            console.error(err)
            showToast('Failed to add item ❌', 'error')
        }
    }

    // Increase Quantity
    const increaseQuantity = () => {
        if (quantity < productDetail.stock) {
            setQuantity(quantity + 1)
        }
    }

    // Decrease Quantity (But not below 1)
    const decreaseQuantity = () => {
        if (quantity > 0) {
            setQuantity(quantity - 1)
        }
    }

    return (
        <div>
            {!productDetail ? (
                <p>Data sedang dimuat</p>
            ) : (
                <div>
                    <h1>{productDetail.name}</h1>
                    <img src={productDetail.image} width={500} />
                    <h2>Price: {formattedPrice}</h2>
                    <h3>Stock: {productDetail.stock}</h3>
                    <div>
                        <button onClick={decreaseQuantity} style={{ margin: "10px", padding: "5px", cursor: "pointer" }}>
                            ➖
                        </button>
                        <span style={{ fontSize: "20px", margin: "0 20px" }}>{quantity}</span>
                        <button onClick={increaseQuantity} style={{ margin: "10px", padding: "5px", cursor: "pointer" }}>
                            ➕
                        </button>
                    </div>
                    <p>{productDetail.description}</p>
                </div>
            )}
            <br />
            <button onClick={(handleAddToCart)}>Add to Cart</button>
        </div>
    )
}

export default ProductDetail