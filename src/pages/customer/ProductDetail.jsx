import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router';
import { useToast } from '../../components/ToastContext';
import { 
  Typography, 
  Card, 
  Button, 
  Image, 
  InputNumber, 
  Spin, 
  Divider, 
  Row, 
  Col, 
  Tag, 
  Space, 
  Descriptions,
  ConfigProvider,
  theme
} from 'antd';
import { 
  ShoppingCartOutlined, 
  MinusOutlined, 
  PlusOutlined,
  SafetyCertificateOutlined
} from '@ant-design/icons';

const { Title, Paragraph, Text } = Typography;
const { defaultAlgorithm } = theme;

const ProductDetail = () => {
  let { id } = useParams();
  id = parseInt(id);
  const [productDetail, setProductDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const { showToast } = useToast();
  const [quantity, setQuantity] = useState(0);
  const userId = parseInt(localStorage.getItem('userId'));

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await axios.get("http://localhost:3002/products/" + id);
        setProductDetail(data.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
        showToast('Failed to load product details', 'error');
      }
    };
    fetchData();
  }, [id]);

  const formattedPrice = productDetail?.price 
    ? new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR"
      }).format(productDetail.price)
    : '';

  const handleAddToCart = async () => {
    try {
      if (quantity === 0) {
        showToast('Please specify quantity', 'error');
        return;
      }
      await axios.post('http://localhost:3002/cart', {
        userId: userId,
        productId: id,
        quantity: quantity
      });
      showToast('Item added to cart 🛒', "success");
    } catch (err) {
      console.error(err);
      showToast('Failed to add item ❌', 'error');
    }
  };

  // Increase Quantity
  const increaseQuantity = () => {
    if (quantity < productDetail.stock) {
      setQuantity(quantity + 1);
    }
  };

  // Decrease Quantity (But not below 0)
  const decreaseQuantity = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
    }
  };

  // Handle direct input change
  const handleQuantityChange = (value) => {
    if (value !== null) {
      const newValue = Math.min(Math.max(0, value), productDetail.stock);
      setQuantity(newValue);
    } else {
      setQuantity(0);
    }
  };

  // Determine stock status and color
  const getStockStatus = (stock) => {
    if (stock > 10) return { status: 'In Stock', color: 'success' };
    if (stock > 0) return { status: 'Low Stock', color: 'warning' };
    return { status: 'Out of Stock', color: 'error' };
  };

  if (loading) {
    return (
      <ConfigProvider
        theme={{
          algorithm: defaultAlgorithm,
          token: {
            colorBgContainer: '#ffffff',
            colorTextBase: '#000000',
          },
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '400px', background: '#f5f5f5' }}>
          <Spin size="large" tip="Loading product details..." />
        </div>
      </ConfigProvider>
    );
  }

  if (!productDetail) {
    return (
      <ConfigProvider
        theme={{
          algorithm: defaultAlgorithm,
          token: {
            colorBgContainer: '#ffffff',
            colorTextBase: '#000000',
          },
        }}
      >
        <Card style={{ width: '100%', textAlign: 'center', padding: '30px', background: '#ffffff' }}>
          <Text type="danger">Product not found or unavailable</Text>
        </Card>
      </ConfigProvider>
    );
  }

  const stockStatus = getStockStatus(productDetail.stock);

  return (
    <ConfigProvider
      theme={{
        algorithm: defaultAlgorithm,
        token: {
          colorBgContainer: '#ffffff',
          colorTextBase: '#000000',
        },
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '24px', background: '#f5f5f5' }}>
        <Card 
          bordered={false} 
          style={{ 
            borderRadius: '8px', 
            boxShadow: '0 1px 2px rgba(0,0,0,0.03)',
            background: '#ffffff'
          }}
        >
          <Row gutter={[32, 16]}>
            <Col xs={24} md={12}>
              <Image
                src={productDetail.image}
                alt={productDetail.name}
                style={{ width: '100%', borderRadius: '8px' }}
                fallback="data:image/png;base64,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"
              />
            </Col>
            
            <Col xs={24} md={12}>
              <Space direction="vertical" size="large" style={{ width: '100%' }}>
                <div>
                  <Title level={2} style={{ margin: 0, color: '#333333' }}>{productDetail.name}</Title>
                  <Tag color={stockStatus.color} style={{ marginTop: '8px' }}>
                    {stockStatus.status}
                  </Tag>
                </div>
                
                <Divider style={{ margin: '16px 0' }} />
                
                <Title level={3} style={{ color: '#1890ff', margin: 0 }}>
                  {formattedPrice}
                </Title>
                
                <Descriptions column={1} size="small">
                  <Descriptions.Item label="Availability" labelStyle={{ color: '#333333' }}>
                    <Text strong style={{ color: '#333333' }}>{productDetail.stock}</Text> units available
                  </Descriptions.Item>
                  {productDetail.categoryId && (
                    <Descriptions.Item label="Category" labelStyle={{ color: '#333333' }}>
                      <Tag color="blue">{productDetail.categoryId}</Tag>
                    </Descriptions.Item>
                  )}
                </Descriptions>
                
                <Divider style={{ margin: '16px 0' }} />
                
                <div>
                  <Text strong style={{ color: '#333333' }}>Quantity:</Text>
                  <div style={{ display: 'flex', alignItems: 'center', marginTop: '8px' }}>
                    <Button 
                      icon={<MinusOutlined />} 
                      onClick={decreaseQuantity}
                      disabled={quantity <= 0}
                    />
                    <InputNumber
                      min={0}
                      max={productDetail.stock}
                      value={quantity}
                      onChange={handleQuantityChange}
                      style={{ margin: '0 8px', width: '60px', textAlign: 'center' }}
                    />
                    <Button 
                      icon={<PlusOutlined />} 
                      onClick={increaseQuantity}
                      disabled={quantity >= productDetail.stock}
                    />
                  </div>
                </div>
                
                <Button
                  type="primary"
                  icon={<ShoppingCartOutlined />}
                  size="large"
                  onClick={handleAddToCart}
                  disabled={quantity <= 0 || productDetail.stock <= 0}
                  style={{ width: '100%', height: '45px' }}
                >
                  Add to Cart
                </Button>
                
                {productDetail.description && (
                  <>
                    <Divider orientation="left">Description</Divider>
                    <Paragraph style={{ color: '#333333' }}>{productDetail.description}</Paragraph>
                  </>
                )}
              </Space>
            </Col>
          </Row>
        </Card>
      </div>
    </ConfigProvider>
  );
};

export default ProductDetail;