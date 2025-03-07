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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:3002/products", {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      console.log(response.data);
      setPersonalData(response.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
      showToast("Gagal memuat data", "error");
    }
  };

  const deletePersonalData = async (id) => {
    try {
      await axios.delete(`http://localhost:3002/products/${id}`);
      fetchData();
      showToast("Berhasil hapus data", "success");
    } catch (error) {
      console.log(error);
      showToast("Gagal hapus data", "error");
    }
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      sorter: (a, b) => a.id - b.id,
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
            type="primary"
            icon={<EditOutlined />}
            size="small"
          >
            <Link to={`/edit-product/${record.id}`} style={{ color: 'white' }}>Edit</Link>
          </Button>
          <Popconfirm
            title="Apakah Anda yakin ingin menghapus data ini?"
            onConfirm={() => deletePersonalData(record.id)}
            okText="Ya"
            cancelText="Tidak"
          >
            <Button
              type="primary"
              danger
              icon={<DeleteOutlined />}
              size="small"
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
        algorithm: theme.darkAlgorithm,
        token: {
          colorPrimary: '#1890ff',
          colorBgBase: '#141414',
          colorTextBase: '#ffffff',
          colorBgContainer: '#1f1f1f',
          colorBgElevated: '#272727',
          colorBorder: '#303030',
        },
        components: {
          Table: {
            colorBgContainer: '#1f1f1f',
            headerBg: '#141414',
          },
          Card: {
            colorBgContainer: '#1f1f1f',
          },
          Button: {
            colorPrimaryHover: '#40a9ff',
          }
        }
      }}
    >
      <Layout style={{ minHeight: "100vh", background: '#141414' }}>
        <Content style={{ padding: "24px" }}>
          <Card
            bordered={false}
            style={{ borderRadius: "8px", marginBottom: "16px" }}
          >
            <Space direction="vertical" size="large" style={{ width: "100%" }}>
              <Space direction="horizontal" align="center" style={{ justifyContent: "space-between", width: "100%" }}>
                <Title level={3} style={{ margin: 0, color: '#ffffff' }}>List Product</Title>
                <Button
                  type="primary"
                  icon={<PlusOutlined />}
                >
                  <Link to="/create-product" style={{ color: 'white' }}>Add New Item</Link>
                </Button>
              </Space>

              {loading ? (
                <div style={{ textAlign: 'center', padding: '50px' }}>
                  <Spin size="large" />
                  <p style={{ marginTop: '16px', color: '#ffffff' }}>Data sedang dimuat...</p>
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
                  bordered
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