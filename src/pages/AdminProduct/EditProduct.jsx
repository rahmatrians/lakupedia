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

  // Sample category options - same as in CreateProduct
  const categoryOptions = [
    "Electronics",
    "Clothing",
    "Home & Kitchen",
    "Books",
    "Beauty",
    "Sports",
    "Toys",
    "Food & Beverage",
    "Health",
    "Furniture"
  ];

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
      algorithm: theme.defaultAlgorithm,
      token: {
          colorPrimary: '#1890ff',
          colorBgBase: '#ffffff',
          colorTextBase: '#000000',
          borderRadius: 8,
      },
      components: {
          Card: {
              colorBgContainer: '#ffffff',
          },
          Button: {
              colorPrimaryHover: '#1890ff', // Same as primary to eliminate hover effect
          }}
      }}
    >
      <Layout style={{ minHeight: "100vh", background: '#f0f2f5' }}>
        <Content style={{ padding: "50px 0" }}>
          <Card
            style={{ 
              maxWidth: 600, 
              margin: "0 auto", 
              borderRadius: "16px",
              boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.05)",
            }}
            bodyStyle={{ padding: "32px" }}
          >
            <Space direction="vertical" size="large" style={{ width: "100%" }}>
              {/* <Space direction="horizontal" align="center" style={{ justifyContent: "space-between", width: "100%" }}>
                
                {/* <Button
                  icon={<ArrowLeftOutlined />}
                  onClick={() => navigate("/list-product")}
                >
                  Kembali
                </Button> */}
              {/* </Space> */} 
              <div>
                  <Title level={3} style={{ textAlign: "center" }}>Edit Product</Title>
              </div>

              {loading ? (
                <div style={{ textAlign: 'center', padding: '50px' }}>
                  <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} />
                  <p style={{ marginTop: '16px' }}>Data sedang dimuat...</p>
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
                    label="Image URL:"
                    rules={[{ required: false, message: 'Please input image URL!' }]}
                  >
                    <Input
                      placeholder="Enter image URL"
                      onChange={(e) => handleChange('image', e.target.value)}
                    />
                  </Form.Item>

                  <Form.Item
                    name="name"
                    label="Item Name:"
                    rules={[{ required: true, message: 'Please input item name!' }]}
                  >
                    <Input
                      placeholder="Enter item name"
                      onChange={(e) => handleChange('name', e.target.value)}
                    />
                  </Form.Item>

                  <Form.Item
                    name="categoryId"
                    label="Category:"
                    rules={[{ required: true, message: 'Please select a category!' }]}
                  >
                    <Select
                      style={{ width: '100%' }}
                      placeholder="Select a category"
                      onChange={(value) => handleChange('categoryId', value)}
                    >
                      {categoryOptions.map(category => (
                        <Option key={category} value={category}>
                          {category}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>

                  <Form.Item
                    name="price"
                    label="Price:"
                    rules={[{ required: true, message: 'Please input price!' }]}
                  >
                    <InputNumber
                      style={{ width: '100%' }}
                      min={0}
                      placeholder="Enter price"
                      formatter={value => `Rp ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                      parser={value => value.replace(/Rp\s?|(,*)/g, '')}
                      onChange={(value) => handleChange('price', value)}
                    />
                  </Form.Item>

                  <Form.Item
                    name="stock"
                    label="Stock:"
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
                    label="Description:"
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
                      loading={submitting}
                      style={{ width: '100%', height: '40px', borderRadius: '20px' }}
                    >
                      Simpan Perubahan
                    </Button>
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