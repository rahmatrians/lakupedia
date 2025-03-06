import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams } from 'react-router'
import { useToast } from '../../components/ToastContext'

const ProductDetail = () => {
    let { id } = useParams()
    const [productDetail, setProductDetail] = useState(null)
    const { showToast } = useToast()
    const [quantity, setQuantity] = useState(0)
    const userId = localStorage.getItem('user')

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await axios.get("http://10.50.0.13:3002/products/" + id);
                setProductDetail(data.data);
            } catch (error) {
                console.log(error);
            }
        }
        fetchData()
    }, [id])

    const handleAddToCart = async () => {
        try {
            const response = await axios.post('http://localhost:5000/cart', {
              userId: userId,
              productId: productId,
              quantity: quantity
            })
            console.log(response.data)
            showToast('Item added to cart 🛒', "success")
          } catch (err) {
            console.error(err)
            showToast('Failed to add item ❌', 'error')
          }
    }

    return (
        <div>
            {!productDetail ? (
                <p>Data sedang dimuat</p>
            ) : (
                <div>
                    <h1>{productDetail.name}</h1>
                    <img src={productDetail.image} width={500}/>
                    <h2>Price: {productDetail.price}</h2>
                    <h3>Stock: {productDetail.stock}</h3>
                    <p>{productDetail.description}</p>
                </div>
            )}
            <br/>
            <button onClick={(handleAddToCart)}>Add to Cart</button>
        </div>
    )
}

export default ProductDetail