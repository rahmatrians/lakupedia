import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useToast } from '../../components/ToastContext';
import {
    Row,
    Col,
    Button,
    InputNumber,
    Card,
    Empty,
    Typography,
    Image,
    Space,
    Divider,
    Popconfirm,
    Spin,
    Result,
    Input,
    Form
} from 'antd';
import {
    DeleteOutlined,
    MinusOutlined,
    PlusOutlined,
    ArrowLeftOutlined
} from '@ant-design/icons';
import Menus from '../../components/Menus';
import { Link } from 'react-router';

const { Title, Text } = Typography;

const Cart = () => {
    const userId = parseInt(localStorage.getItem('userId'));
    const [cart, setCart] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [promoCode, setPromoCode] = useState('');
    const { showToast } = useToast();

    useEffect(() => {
        getCart();
    }, []);

    const getCart = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`http://localhost:3002/cart?userId=${userId}`);
            const cartData = response.data;

            // Fetch product details one by one
            const cartWithProducts = await Promise.all(
                cartData.map(async (item) => {
                    const productResponse = await axios.get(`http://localhost:3002/products/${item.productId}`);
                    return { ...item, product: productResponse.data };
                })
            );

            setCart(cartWithProducts);
            // setError(null);
            setLoading(false);
        } catch (err) {
            console.error(err);
            setError("Failed to load cart");
            showToast("Failed to load cart 😢", "error");
        } finally {
            setLoading(false);
        }
    };

    const updateQuantity = async (id, quantity) => {
        if (quantity <= 0) {
            deleteItem(id);
            return;
        }
        try {
            await axios.patch(`http://localhost:3002/cart/${id}`, { quantity });
            getCart();
            showToast("Quantity updated", "success");
        } catch (err) {
            console.error(err);
            showToast("Failed to update quantity", 'error');
        }
    };

    const deleteItem = async (id) => {
        try {
            await axios.delete(`http://localhost:3002/cart/${id}`);
            showToast("Item removed from cart", "success");
            getCart();
        } catch (error) {
            console.log(error);
            showToast("Failed to remove item", "error");
        }
    };

    const totalAmount = cart.reduce(
        (total, item) => total + item.quantity * item.product.price,
        0
    );

    const applyPromoCode = () => {
        // Implement promo code logic here
        showToast("Promo code applied", "success");
    };

    if (loading) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
                <Spin size="large" tip="Loading your cart..." />
            </div>
        );
    }

    if (error) {
        return (
            <Result
                status="error"
                title="Failed to load cart"
                subTitle="Please try again later or contact customer support."
                extra={[
                    <Button type="primary" key="retry" onClick={getCart}>
                        Try Again
                    </Button>,
                ]}
            />
        );
    }

    return (
        <>
            <Menus />

            <div style={{ padding: '20px', background: '#f5f5f7', minHeight: '100vh' }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                    {cart.length === 0 ? (
                        <Card>
                            <Empty
                                image={Empty.PRESENTED_IMAGE_SIMPLE}
                                description="Your cart is empty"
                            >
                                <Link to={"/"}>
                                    <Button type="primary">
                                        Continue Shopping
                                    </Button>
                                </Link>
                            </Empty>
                        </Card>
                    ) : (
                        <Row gutter={24}>
                            <Col xs={24} lg={16}>
                                <Card style={{ marginBottom: '20px' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                                        <Title level={3} style={{ margin: 0 }}>Shopping Cart</Title>
                                        <Text strong>{cart.length} Items</Text>
                                    </div>
                                    <Divider style={{ margin: '12px 0 24px 0' }} />

                                    {/* Column Headers */}
                                    <Row style={{ color: '#8c8c8c', marginBottom: '12px', paddingLeft: '8px', paddingRight: '8px' }}>
                                        <Col span={12}>
                                            <Text style={{ textTransform: 'uppercase', fontSize: '12px' }}>Product Details</Text>
                                        </Col>
                                        <Col span={4} style={{ textAlign: 'center' }}>
                                            <Text style={{ textTransform: 'uppercase', fontSize: '12px' }}>Quantity</Text>
                                        </Col>
                                        <Col span={4} style={{ textAlign: 'center' }}>
                                            <Text style={{ textTransform: 'uppercase', fontSize: '12px' }}>Price</Text>
                                        </Col>
                                        <Col span={4} style={{ textAlign: 'center' }}>
                                            <Text style={{ textTransform: 'uppercase', fontSize: '12px' }}>Total</Text>
                                        </Col>
                                    </Row>

                                    {/* Cart Items */}
                                    {cart.map((item) => (
                                        <div key={item.id}>
                                            <Row align="middle" style={{ marginBottom: '24px' }}>
                                                <Col span={12}>
                                                    <Space size="large">
                                                        <Image
                                                            src={item.product.image}
                                                            alt={item.product.name}
                                                            width={80}
                                                            height={80}
                                                            preview={false}
                                                            style={{ objectFit: 'contain', background: '#f0f0f0' }}
                                                            fallback="data:image/png;base64,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"
                                                        />
                                                        <div>
                                                            <Text strong style={{ fontSize: '16px' }}>{item.product.name}</Text>
                                                            <br />
                                                            <Text type="secondary">PS4</Text>
                                                            <br />
                                                            <Button
                                                                type="text"
                                                                style={{ padding: '0', color: '#8c8c8c', fontSize: '12px' }}
                                                                onClick={() => deleteItem(item.id)}
                                                            >
                                                                Remove
                                                            </Button>
                                                        </div>
                                                    </Space>
                                                </Col>
                                                <Col span={4} style={{ textAlign: 'center' }}>
                                                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                                        <Button
                                                            icon={<MinusOutlined />}
                                                            style={{ border: '1px solid #d9d9d9', borderRadius: '4px 0 0 4px' }}
                                                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                        />
                                                        <InputNumber
                                                            min={1}
                                                            value={item.quantity}
                                                            onChange={(value) => updateQuantity(item.id, value)}
                                                            style={{
                                                                width: '50px',
                                                                borderRadius: 0,
                                                                textAlign: 'center',
                                                                border: '1px solid #d9d9d9',
                                                                borderLeft: 'none',
                                                                borderRight: 'none'
                                                            }}
                                                            controls={false}
                                                        />
                                                        <Button
                                                            icon={<PlusOutlined />}
                                                            style={{ border: '1px solid #d9d9d9', borderRadius: '0 4px 4px 0' }}
                                                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                        />
                                                    </div>
                                                </Col>
                                                <Col span={4} style={{ textAlign: 'center' }}>
                                                    <Text>Rp{item.product.price.toLocaleString('id-ID')}</Text>
                                                </Col>
                                                <Col span={4} style={{ textAlign: 'center' }}>
                                                    <Text strong>Rp{(item.quantity * item.product.price).toLocaleString('id-ID')}</Text>
                                                </Col>
                                            </Row>
                                        </div>
                                    ))}

                                    <Divider style={{ margin: '12px 0 24px 0' }} />
                                    <Link to={"/"}>
                                        <Button
                                            type="link"
                                            icon={<ArrowLeftOutlined />}
                                            style={{ padding: 0, fontWeight: 500, color: '#1677ff' }}
                                        >
                                            Continue Shopping
                                        </Button>
                                    </Link>
                                </Card>
                            </Col>

                            <Col xs={24} lg={8}>
                                <Card title="Order Summary" style={{ marginBottom: '20px' }}>
                                    <div style={{ marginBottom: '16px' }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                                            <Text>ITEMS {cart.length}</Text>
                                            <Text strong>Rp{totalAmount.toLocaleString('id-ID')}</Text>
                                        </div>
                                    </div>

                                    <Divider style={{ margin: '12px 0' }} />

                                    <div style={{ marginBottom: '16px' }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                                            <Text strong style={{ fontSize: '16px' }}>TOTAL COST</Text>
                                            <Text strong style={{ fontSize: '16px' }}>Rp{(totalAmount).toLocaleString('id-ID')}</Text>
                                        </div>
                                    </div>

                                    <Button
                                        type="primary"
                                        block
                                        size="large"
                                        style={{
                                            height: '48px',
                                            // background: '#6a5acd',
                                            marginTop: '16px',
                                            textTransform: 'uppercase',
                                            // fontWeight: 'bold'
                                        }}
                                    >
                                        Checkout
                                    </Button>
                                </Card>
                            </Col>
                        </Row>
                    )}
                </div>
            </div>
        </>
    );
};

export default Cart;