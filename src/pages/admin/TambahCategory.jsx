import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';
import { useToast } from '../../components/ToastContext';
import { Form, Input, Button, Card, Typography, ConfigProvider, theme, Layout, Spin } from 'antd';
import { LeftOutlined, PlusOutlined, SaveOutlined } from '@ant-design/icons';
import Menus from '../../components/Menus';
import { Content } from 'antd/es/layout/layout';

const { Title } = Typography;
const { darkAlgorithm } = theme;

const TambahCategory = () => {
    const nav = useNavigate();
    const { showToast } = useToast();
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const userId = parseInt(localStorage.getItem('userId'))


    const [formData, setFormData] = useState({
        name: "",
        userId: userId
    });


    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };


    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await axios.post(
                "http://localhost:3002/categories", {
                name: formData.name,
                userId: userId
            }
            );

            showToast("Successfully saved data", "success");
            nav("/admin/category");
        } catch (error) {
            console.log(error);
            showToast("Failed to save data", "error");
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
                    }
                }
            }}
        >

            <Menus />

            <Layout style={{ minHeight: "100vh", background: '#f0f2f5' }}>
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
                            onClick={() => nav("/admin/category")}
                        >
                            Back
                        </Button>

                        <div style={{ textAlign: "center", marginBottom: "24px" }}>
                            <Title level={3}>Add New Category</Title>
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

                                <Form.Item label="Item Name:">
                                    <Input
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                        placeholder="Enter item name"
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
                                        Save Category
                                    </Button>
                                </Form.Item>
                            </Form>
                        )}
                    </Card>
                </Content>
            </Layout>
        </ConfigProvider>
    );
};

export default TambahCategory;