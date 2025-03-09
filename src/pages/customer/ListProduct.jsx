import React, { useEffect, useState } from 'react';
import { Carousel, Row, Col, Typography, Card, Button, Input, Divider, ConfigProvider, theme } from 'antd';
import { ShoppingCartOutlined, FireFilled, StarFilled } from '@ant-design/icons';
import axios from 'axios';
import './ListProduct.css';
import { Link, useNavigate } from 'react-router';
import Menus from '../../components/Menus';

const { Title, Text } = Typography;
const { Search } = Input;

const ListProduct = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const nav = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productsResponse = await axios.get("http://localhost:3002/products");
        const categoriesResponse = await axios.get("http://localhost:3002/categories");

        setFeaturedProducts(productsResponse.data);
        setCategories(categoriesResponse.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);


  const formattedPrice = (price) => {
    return price ? new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR"
    }).format(price) : '';
  }


  const heroContent = [
    {
      title: "Ramadhan Sale",
      subtitle: "Up to 50% off selected items",
      image: "https://im.uniqlo.com/global-cms/spa/res1efd33a287dfa740365158758fd8c06efr.jpg",
    },
    {
      title: "New Season Collection",
      subtitle: "Discover our latest arrivals",
      image: "https://admin.debzofficial.com/uploads/images_banner/banner1.jpg",
    }
  ];

  return (
    <ConfigProvider
      theme={{
        algorithm: theme.defaultAlgorithm,
        token: {
          colorPrimary: '#1890ff',
          colorLink: '#1890ff',
          colorBgContainer: '#ffffff',
          borderRadius: 8,
        },
        components: {
          Card: {
            colorBorderSecondary: '#f0f0f0',
            boxShadowTertiary: '0 1px 3px rgba(0,0,0,0.05)'
          },
          Button: {
            colorPrimaryHover: '#40a9ff',
          }
        }
      }}
    >

      <Menus />

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
                <div className="hero-content" style={{ background: 'rgba(255, 255, 255, 0.11)' }}>
                  <Title level={1} className="hero-title">{slide.title}</Title>
                  <Text className="hero-subtitle" style={{ color: 'white' }}>{slide.subtitle}</Text>
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
            <Title level={3} style={{ color: '#262626' }}>Featured Products</Title>
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
                      // block
                      style={{
                        height: '42px',
                        margin: '0 20px', minWidth: '90%'
                      }}
                    >
                      Detail
                    </Button>
                  ]}

                  onClick={() => {
                    nav(`/products/${product.id}`);
                  }}
                >
                  <Card.Meta
                    title={product.name}
                    description={
                      <div className="product-meta">
                        <Text strong className="price-text">
                          {formattedPrice(product.price)}
                        </Text>
                        <div className="product-details">
                          <Text type="secondary">{product.category}</Text>
                          <div className="rating">
                            {/* <StarFilled className="star-icon" /> */}
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
            <Title level={4} style={{ color: '#262626' }}>Subscribe to Our Newsletter</Title>
          </Divider>

          <div className="newsletter-content">
            <Text style={{ color: '#595959' }}>Get updates about new products and special offers</Text>
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
    </ConfigProvider>
  );
};

export default ListProduct;