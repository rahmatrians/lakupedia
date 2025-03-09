import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import { useToast } from "../../components/ToastContext";
import {
    Form,
    Input,
    InputNumber,
    Button,
    Typography,
    Layout,
    Card,
    Select,
    ConfigProvider,
    theme,
    Spin
} from "antd";
import { LeftOutlined, SaveOutlined } from "@ant-design/icons";
import Menus from "../../components/Menus";

const { Title } = Typography;
const { Content } = Layout;
const { TextArea } = Input;
const { Option } = Select;

function CreateProduct() {
    let navigate = useNavigate();
    let accessToken = localStorage.getItem("tokenSession");
    let userId = parseInt(localStorage.getItem("userId"));
    const { showToast } = useToast();
    const [categories, setCategories] = useState(null);
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        fetchData();
    }, []);


    const fetchData = async () => {
        setLoading(true);
        try {
            const response = await axios.get("http://localhost:3002/categories", {
                headers: { Authorization: `Bearer ${accessToken}` },
            });
            setCategories(response.data);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            showToast("Gagal memuat data", "error");
        }
    };


    const [formData, setFormData] = useState({
        image: "",
        name: "",
        categoryId: "",
        price: "",
        stock: "",
        description: "",
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleCategoryChange = (value) => {
        setFormData({
            ...formData,
            categoryId: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await axios.post(
                "http://localhost:3002/products", {
                name: formData.name,
                price: formData.price,
                categoryId: formData.categoryId,
                image: formData.image,
                description: formData.description,
                stock: formData.stock,
                userId: userId
            }
            );

            showToast("Product saved successfully", "success");
            navigate("/admin/product");
        } catch (error) {
            console.log(error);
            showToast("Failed to save product", "error");
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
                        colorPrimaryHover: '#1890ff',
                    }
                }
            }}
        >
            <Layout style={{ minHeight: "100vh", background: '#f0f2f5' }}>

                <Menus />

                <Content style={{ padding: "50px 0" }}>
                    <Card
                        style={{
                            maxWidth: 600,
                            margin: "0 auto",
                            borderRadius: "16px",
                            boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.05)",
                            padding: "32px"
                        }}
                    >

                        <Button
                            icon={<LeftOutlined />}
                            onClick={() => navigate("/admin/product")}
                        >
                            Back
                        </Button>

                        <div style={{ textAlign: "center", marginBottom: "24px" }}>
                            <Title level={3}>Add New Product</Title>
                        </div>

                        {loading ? (
                            <div style={{ textAlign: 'center', padding: '50px' }}>
                                <Spin size="large" />
                                <p style={{ marginTop: '16px', color: '#000000' }}>Loading...</p>
                            </div>
                        ) : (
                            <Form
                                layout="vertical"
                                onSubmit={handleSubmit}
                                initialValues={formData}
                            >
                                <Form.Item label="Image URL:">
                                    <Input
                                        name="image"
                                        value={formData.image}
                                        onChange={handleChange}
                                        required
                                        placeholder="Enter image URL"
                                    />
                                </Form.Item>

                                <Form.Item label="Item Name:">
                                    <Input
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                        placeholder="Enter item name"
                                    />
                                </Form.Item>

                                <Form.Item label="Category:">
                                    <Select
                                        style={{ width: '100%' }}
                                        placeholder="Select a category"
                                        value={formData.categoryId || undefined}
                                        onChange={handleCategoryChange}
                                    >
                                        {categories.map(category => (
                                            <Option key={category.id} value={category.id}>
                                                {category.name}
                                            </Option>
                                        ))}
                                    </Select>
                                </Form.Item>

                                <Form.Item label="Price:">
                                    <InputNumber
                                        style={{ width: '100%' }}
                                        name="price"
                                        value={formData.price}
                                        onChange={(value) => setFormData({ ...formData, price: value })}
                                        required
                                        placeholder="Enter price"
                                        formatter={value => `Rp ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                        parser={value => value.replace(/Rp\s?|(,*)/g, '')}
                                    />
                                </Form.Item>

                                <Form.Item label="Stock:">
                                    <InputNumber
                                        style={{ width: '100%' }}
                                        name="stock"
                                        value={formData.stock}
                                        onChange={(value) => setFormData({ ...formData, stock: value })}
                                        required
                                        placeholder="Enter stock"
                                    />
                                </Form.Item>

                                <Form.Item label="Description:">
                                    <TextArea
                                        name="description"
                                        value={formData.description}
                                        onChange={handleChange}
                                        required
                                        placeholder="Enter description"
                                        rows={4}
                                    />
                                </Form.Item>

                                <Form.Item>
                                    <Button
                                        type="primary"
                                        htmlType="submit"
                                        onClick={handleSubmit}
                                        icon={<SaveOutlined />}
                                        style={{ width: '100%', height: '48px' }}
                                    >
                                        Save Product
                                    </Button>
                                </Form.Item>
                            </Form>
                        )}
                    </Card>
                </Content>
            </Layout>
        </ConfigProvider>
    );
}

export default CreateProduct;