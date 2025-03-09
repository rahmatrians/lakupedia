import React, { useEffect, useState } from "react";
import { Table, Button, Space, Typography, Layout, Card, Image, Tag, Popconfirm, Spin, ConfigProvider, theme } from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import Menus from "../../components/Menus";
import axios from "axios";
import { Link, useNavigate } from 'react-router';
import { useToast } from "../../components/ToastContext";

const { Title } = Typography;
const { Content } = Layout;

function ListProduct() {
  let navigate = useNavigate();
  let accessToken = localStorage.getItem("tokenSession");
  const { showToast } = useToast();
  const [personalData, setPersonalData] = useState(null);
  const [categories, setCategories] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {

      await axios.get("http://localhost:3002/categories", {
        headers: { Authorization: `Bearer ${accessToken}` },
      }).then(async (categories) => {
        await axios.get("http://localhost:3002/products", {
          headers: { Authorization: `Bearer ${accessToken}` },
        }).then(async (products) => {
          products.data.map((product) => {
            categories.data.map((category) => {
              if (product.categoryId == category.id) {
                product.categoryId = category.name;
              }
            })
          })
          setPersonalData(products.data);
        })
      });


      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
      showToast("Gagal memuat data", "error");
    }
  };

  const fetchCategoriesData = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:3002/categories", {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      console.log("categoriess " + JSON.stringify(response.data))
      setCategories(response.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      showToast("Gagal memuat data", "error");
    }
  };

  const deletePersonalData = async (id) => {
    try {
      await axios.delete(`http://localhost:3002/products/${id}`);
      fetchData();
      showToast("Data deleted successfully", "success");
    } catch (error) {
      console.log(error);
      showToast("Failed to delete data", "error");
    }
  };

  const columns = [
    {
      title: 'No',
      dataIndex: 'id',
      key: 'id',
      sorter: (a, b) => a.id - b.id,
      render: (text, record, index) => index + 1
    },
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (image, record) => (
        image ? (
          <Image
            src={image}
            alt={record.name}
            width={50}
            height={50}
            style={{ objectFit: "cover" }}
            preview={true}
          />
        ) : (
          <Tag color="default">No Image</Tag>
        )
      ),
    },
    {
      title: "Item Name",
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: "Category",
      dataIndex: "categoryId",
      key: "categoryId",
      render: (categoryId) => (
        <Tag color="blue">{categoryId}</Tag>
      ),
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      sorter: (a, b) => a.price - b.price,
      render: (price) => (
        <span>Rp {price.toLocaleString()}</span>
      ),
    },
    {
      title: "Stock",
      dataIndex: "stock",
      key: "stock",
      sorter: (a, b) => a.stock - b.stock,
      render: (stock) => (
        <Tag color={stock > 10 ? "green" : stock > 0 ? "orange" : "red"}>
          {stock}
        </Tag>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button
            type="dashed"
            icon={<EditOutlined />}
            onClick={() => navigate(`/edit-product/${record.id}`)}
          >
            Edit
          </Button>
          <Popconfirm
            title="Are you sure you want to delete this data?"
            onConfirm={() => deletePersonalData(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button
              type="primary"
              danger
              icon={<DeleteOutlined />}
            >
              Delete
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <ConfigProvider
      theme={{
        algorithm: theme.defaultAlgorithm,
        token: {
          colorPrimary: '#1890ff',
          colorBgBase: '#ffffff',
          colorTextBase: '#000000',
          colorBgContainer: '#ffffff',
          colorBgElevated: '#f0f2f5',
          colorBorder: '#d9d9d9',
        },
        components: {
          Table: {
            colorBgContainer: '#ffffff',
            headerBg: '#fafafa',
          },
          Card: {
            colorBgContainer: '#ffffff',
          },
          Button: {
            colorPrimaryHover: '#40a9ff',
          }
        }
      }}
    >
      <Layout style={{ minHeight: "100vh", background: '#f0f2f5' }}>

        <Menus />

        <Content style={{ padding: "24px" }}>
          <Card
            style={{ borderRadius: "8px", marginBottom: "16px" }}
          >
            <Space direction="vertical" size="large" style={{ width: "100%" }}>
              <Space direction="horizontal" align="center" style={{ justifyContent: "space-between", width: "100%" }}>
                <Title level={3} style={{ margin: 0, color: '#000000' }}>List Product</Title>
                <Button
                  type="primary"
                  icon={<PlusOutlined />}
                  style={{ padding: '20px' }}
                  onClick={() => navigate('/create-product')}
                >
                  Add New Item
                </Button>
              </Space>

              {loading ? (
                <div style={{ textAlign: 'center', padding: '50px' }}>
                  <Spin size="large" />
                  <p style={{ marginTop: '16px', color: '#000000' }}>Loading...</p>
                </div>
              ) : (
                <Table
                  columns={columns}
                  dataSource={personalData}
                  rowKey="id"
                  pagination={{
                    defaultPageSize: 10,
                    showSizeChanger: true,
                    pageSizeOptions: ['10', '20', '50'],
                    showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`
                  }}
                  size="middle"
                  scroll={{ x: 'max-content' }}
                />
              )}
            </Space>
          </Card>
        </Content>
      </Layout>
    </ConfigProvider>
  );
}

export default ListProduct;