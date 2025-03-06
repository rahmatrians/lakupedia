import React, { useEffect, useState } from 'react';
import { Carousel, Row, Col, Typography, Card, Button, Input, Divider } from 'antd';
import { ShoppingCartOutlined, FireFilled, StarFilled } from '@ant-design/icons';
import axios from 'axios';
import './ListProduct.css'; // Create this CSS file for custom styles

const { Title, Text } = Typography;
const { Search } = Input;

const ListProduct = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productsResponse = await axios.get("http://10.50.0.13:3002/products");
        const categoriesResponse = await axios.get("http://10.50.0.13:3002/categories");
        
        setFeaturedProducts(productsResponse.data);
        setCategories(categoriesResponse.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);

  // Hero carousel content
  const heroContent = [
    {
      title: "New Season Collection",
      subtitle: "Discover our latest arrivals",
      image: "https://source.unsplash.com/random/800x600?fashion",
    },
    {
      title: "Summer Sale",
      subtitle: "Up to 50% off selected items",
      image: "https://source.unsplash.com/random/800x601?shopping",
    }
  ];

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <Carousel autoplay effect="fade">
          {heroContent.map((slide, index) => (
            <div key={index} className="hero-slide">
              <img 
                src={slide.image} 
                alt={slide.title}
                className="hero-image"
              />
              <div className="hero-content">
                <Title level={1} className="hero-title">{slide.title}</Title>
                <Text className="hero-subtitle">{slide.subtitle}</Text>
                <Button 
                  type="primary" 
                  size="large"
                  icon={<ShoppingCartOutlined />}
                  className="hero-cta"
                >
                  Shop Now
                </Button>
              </div>
            </div>
          ))}
        </Carousel>
      </section>

      {/* Featured Products */}
      <section className="featured-products">
        <Divider orientation="left">
          <Title level={3}>Featured Products</Title>
        </Divider>

        <Row gutter={[24, 24]}>
          {featuredProducts.map(product => (
            <Col key={product.id} xs={24} sm={12} md={8} lg={6}>
              <Card
                hoverable
                cover={
                  <img
                    alt={product.name}
                    src={product.image}
                    className="product-image"
                  />
                }
                actions={[
                  <Button 
                    type="primary" 
                    icon={<ShoppingCartOutlined />}
                    block
                  >
                    Add to Cart
                  </Button>
                ]}
              >
                <Card.Meta
                  title={product.name}
                  description={
                    <div className="product-meta">
                      <Text strong className="price-text">Rp{product.price}</Text>
                      <div className="product-details">
                        <Text type="secondary">{product.category}</Text>
                        <div className="rating">
                          <StarFilled className="star-icon" />
                          <Text>{product.rating}</Text>
                        </div>
                      </div>
                    </div>
                  }
                />
              </Card>
            </Col>
          ))}
        </Row>
      </section>

      {/* Newsletter Section */}
      <section className="newsletter-section">
        <Divider>
          <Title level={4}>Subscribe to Our Newsletter</Title>
        </Divider>
        
        <div className="newsletter-content">
          <Text>Get updates about new products and special offers</Text>
          <Search
            placeholder="Enter your email"
            enterButton="Subscribe"
            size="large"
            className="newsletter-input"
            onSearch={value => console.log(value)}
          />
        </div>
      </section>
    </div>
  );
};

export default ListProduct;