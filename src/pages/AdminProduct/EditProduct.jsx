import React, { useEffect, useState } from "react";
import { Form, Input, InputNumber, Button, Typography, Layout, Card, Space, Select, Spin, ConfigProvider, theme } from "antd";
import { SaveOutlined, ArrowLeftOutlined, LoadingOutlined } from "@ant-design/icons";
import axios from "axios";
import { useNavigate, useParams } from "react-router";
import { useToast } from "../../components/ToastContext";

const { Title } = Typography;
const { Content } = Layout;
const { TextArea } = Input;
const { Option } = Select;

function EditProduct() {
  let { id } = useParams();
  let navigate = useNavigate();
  const { showToast } = useToast();
  const userId = parseInt(localStorage.getItem('userId'));
  const [form] = Form.useForm();

  const [formData, setFormData] = useState({
    image: "",
    name: "",
    categoryId: "",
    price: "",
    stock: "",
    description: "",
    userId: userId
  });

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  // Sample categories - replace with your actual categories
  //   const categories = [
  //     { id: "1", name: "Electronics" },
  //     { id: "2", name: "Clothing" },
  //     { id: "3", name: "Home" },
  //     { id: "4", name: "Books" },
  //   ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3002/products/${id}`);
        setFormData(response.data);
        form.setFieldsValue(response.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        showToast("Gagal mengambil data produk", "error");
        setLoading(false);
      }
    };
    fetchData();
  }, [id, showToast, form]);

  const handleChange = (field, value) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };

  const handleSubmit = async (values) => {
    setSubmitting(true);
    values["userId"] = userId
    try {
      await axios.put(`http://localhost:3002/products/${id}`, values);
      showToast("Berhasil mengupdate produk!", "success");
      navigate("/list-product");
    } catch (error) {
      console.log(error);
      showToast("Gagal mengupdate produk", "error");
    } finally {
      setSubmitting(false);
    }
  };

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
                <Title level={3} style={{ margin: 0, color: '#ffffff' }}>Edit Produk</Title>
                <Button
                  icon={<ArrowLeftOutlined />}
                  onClick={() => navigate("/list-product")}
                >
                  Kembali
                </Button>
              </Space>

              {loading ? (
                <div style={{ textAlign: 'center', padding: '50px' }}>
                  <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} />
                  <p style={{ marginTop: '16px', color: '#ffffff' }}>Data sedang dimuat...</p>
                </div>
              ) : (
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
                    rules={[{ required: false, message: 'Please input image URL!' }]}
                  >
                    <Input
                      placeholder="Masukkan URL gambar"
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
                    rules={[{ required: true, message: 'Please input category ID!' }]}
                  >
                    <InputNumber
                      style={{ width: '100%' }}
                      min={0}
                      placeholder="Enter category ID"
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
                    rules={[{ required: true, message: 'Please input stock quantity!' }]}
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
                    label="Deskripsi"
                  >
                    <TextArea
                      rows={4}
                      placeholder="Enter product description"
                      onChange={(e) => handleChange('description', e.target.value)}
                    />
                  </Form.Item>

                  <Form.Item>
                    <Space size="middle" style={{ width: "100%" }}>
                      <Button
                        type="primary"
                        htmlType="submit"
                        icon={<SaveOutlined />}
                        loading={submitting}
                        block
                      >
                        Simpan Perubahan
                      </Button>
                    </Space>
                  </Form.Item>
                </Form>
              )}
            </Space>
          </Card>
        </Content>
      </Layout>
    </ConfigProvider>
  );
}

export default EditProduct;