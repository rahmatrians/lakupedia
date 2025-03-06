import React, { useState } from "react";
import { Form, Input, InputNumber, Button, Typography, Layout, Card, Space, Select, Upload, message, ConfigProvider, theme } from "antd";
import { PlusOutlined, UploadOutlined, SaveOutlined, ArrowLeftOutlined } from "@ant-design/icons";
import axios from "axios";
import { useNavigate } from "react-router";
import { useToast } from "../../components/ToastContext";

const { Title } = Typography;
const { Content } = Layout;
const { TextArea } = Input;
const { Option } = Select;

function CreateProduct() {
  let navigate = useNavigate();
  let accessToken = localStorage.getItem("tokenSession");
  const { showToast } = useToast();
  const userId = parseInt(localStorage.getItem('userId'));
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  // State untuk menyimpan data input
  const [formData, setFormData] = useState({
    image: "",
    name: "",
    categoryId: "",
    price: "",
    stock: "",
    description: "",
    userId: userId
  });

  // Handle perubahan input
  const handleChange = (field, value) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };

  // Handle form submission
  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      await axios.post(
        "http://10.50.0.13:3002/products", {
          name: values.name,
          price: values.price,
          categoryId: values.categoryId,
          image: values.image,
          description: values.description,
          stock: values.stock,
          userId: userId
        }
      );
      showToast("Produk berhasil ditambahkan!", "success");
      navigate("/list-product"); // Redirect ke halaman list product
    } catch (error) {
      console.log(error);
      showToast("Gagal menambahkan produk", "error");
    } finally {
      setLoading(false);
    }
  };

  // Sample categories - replace with your actual categories
//   const categories = [
//     { id: "1", name: "Electronics" },
//     { id: "2", name: "Clothing" },
//     { id: "3", name: "Home" },
//     { id: "4", name: "Books" },
//   ];

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
          Card: {
            colorBgContainer: '#1f1f1f',
          },
          Button: {
            colorPrimaryHover: '#40a9ff',
          },
          Input: {
            colorBgContainer: '#141414',
            colorBorder: '#434343',
          }
        }
      }}
    >
      <Layout style={{ minHeight: "100vh", background: '#141414' }}>
        <Content style={{ padding: "24px" }}>
          <Card 
            bordered={false} 
            style={{ borderRadius: "8px", maxWidth: "800px", margin: "0 auto" }}
          >
            <Space direction="vertical" size="large" style={{ width: "100%" }}>
              <Space direction="horizontal" align="center" style={{ justifyContent: "space-between", width: "100%" }}>
                <Title level={3} style={{ margin: 0, color: '#ffffff' }}>Tambah Produk Baru</Title>
                <Button 
                  icon={<ArrowLeftOutlined />}
                  onClick={() => navigate("/list-product")}
                >
                  Kembali
                </Button>
              </Space>
              
              <Form
                form={form}
                layout="vertical"
                onFinish={handleSubmit}
                initialValues={formData}
                style={{ width: "100%" }}
              >
                <Form.Item
                  name="image"
                  label="Image URL"
                  rules={[{ required: true, message: 'Please input image URL!' }]}
                >
                  <Input 
                    placeholder="Enter image URL"
                    prefix={<UploadOutlined />}
                    onChange={(e) => handleChange('image', e.target.value)}
                  />
                </Form.Item>

                <Form.Item
                  name="name"
                  label="Item Name"
                  rules={[{ required: true, message: 'Please input item name!' }]}
                >
                  <Input 
                    placeholder="Enter item name"
                    onChange={(e) => handleChange('name', e.target.value)}
                  />
                </Form.Item>

                <Form.Item
                  name="categoryId"
                  label="Category"
                  rules={[{ required: true, message: 'Please select category!' }]}
                >
                   <InputNumber
                    style={{ width: '100%' }}
                    min={0}
                    placeholder="Enter category"
                    onChange={(value) => handleChange('category', value)}
                  />
                </Form.Item>

                <Form.Item
                  name="price"
                  label="Price"
                  rules={[{ required: true, message: 'Please input price!' }]}
                >
                  <InputNumber
                    style={{ width: '100%' }}
                    min={0}
                    placeholder="Enter price"
                    formatter={value => `Rp ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                    parser={value => value.replace(/\Rp\s?|(,*)/g, '')}
                    onChange={(value) => handleChange('price', value)}
                  />
                </Form.Item>

                <Form.Item
                  name="stock"
                  label="Stock"
                  rules={[{ required: true, message: 'Please input stock!' }]}
                >
                  <InputNumber
                    style={{ width: '100%' }}
                    min={0}
                    placeholder="Enter stock quantity"
                    onChange={(value) => handleChange('stock', value)}
                  />
                </Form.Item>

                <Form.Item
                  name="description"
                  label="Description"
                  rules={[{ required: true, message: 'Please input description!' }]}
                >
                  <TextArea
                    rows={4}
                    placeholder="Enter product description"
                    onChange={(e) => handleChange('description', e.target.value)}
                  />
                </Form.Item>

                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    icon={<SaveOutlined />}
                    loading={loading}
                    block
                  >
                    Tambah Produk
                  </Button>
                </Form.Item>
              </Form>
            </Space>
          </Card>
        </Content>
      </Layout>
    </ConfigProvider>
  );
}

export default CreateProduct;