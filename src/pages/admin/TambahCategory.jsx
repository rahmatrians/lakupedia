import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';
import { useToast } from '../../components/ToastContext';
import { Form, Input, Button, Card, Typography, ConfigProvider, theme } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

const { Title } = Typography;
const { darkAlgorithm } = theme;

const TambahCategory = () => {
    const nav = useNavigate();
    const { showToast } = useToast();
    const [form] = Form.useForm();
    const userId = parseInt(localStorage.getItem('userId'))


    const [formData, setFormData] = useState({
        name: "",
        userId: userId
    });

    const handleSubmit = async (values) => {
        try {
            await axios.post("http://10.50.0.13:3002/categories", {
                name: values.name,
                userId: formData.userId
            });
            showToast("Successfully saved data", "success");
            form.resetFields();
            nav('/category');
        } catch (error) {
            console.log(error);
            showToast("Failed to save data", "error");
        }
    };

    return (
        <ConfigProvider
            theme={{
                algorithm: darkAlgorithm,
                token: {
                    colorPrimary: '#1890ff',
                    borderRadius: 6,
                },
                components: {
                    Card: {
                        colorBgContainer: '#141414',
                        colorBorderSecondary: '#303030',
                    },
                }
            }}
        >
            <div style={{
                maxWidth: '600px',
                margin: '0 auto',
                padding: '24px'
            }}>
                <Card
                    bordered={true}
                    style={{
                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
                    }}
                >
                    <Title level={3} style={{ color: '#fff', marginBottom: '24px' }}>
                        Add Category
                    </Title>

                    <Form
                        form={form}
                        layout="vertical"
                        onFinish={handleSubmit}
                        initialValues={{ name: '' }}
                    >
                        <Form.Item
                            name="name"
                            label={<span style={{ color: '#rgba(255, 255, 255, 0.85)' }}>Category Name</span>}
                            rules={[
                                {
                                    required: true,
                                    message: 'Please enter a category name',
                                },
                            ]}
                        >
                            <Input
                                placeholder="Enter category name"
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            />
                        </Form.Item>

                        <Form.Item>
                            <Button
                                type="primary"
                                htmlType="submit"
                                icon={<PlusOutlined />}
                                style={{ width: '100%' }}
                            >
                                Add Category
                            </Button>
                        </Form.Item>

                        <Button
                            type="link"
                            onClick={() => nav('/category')}
                            style={{ padding: 0 }}
                        >
                            Back to List
                        </Button>
                    </Form>
                </Card>
            </div>
        </ConfigProvider>
    );
};

export default TambahCategory;