import React, { useState, useCallback } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router';
import { useToast } from '../components/ToastContext';
import { Form, Input, Button, Card, Typography, Layout, Space, theme } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

const { Title } = Typography;
const { Content } = Layout;

function Login() {
    const navigate = useNavigate();
    const { showToast } = useToast();
    const [loading, setLoading] = useState(false);
    const [form] = Form.useForm();
    const { token } = theme.useToken();

    const handleSubmit = useCallback(async (values) => {
        setLoading(true);
        try {
            const response = await axios.post("http://localhost:3002/login", {
                email: values.email,
                password: values.password
            });

            console.log("user :" + response.data.role)
            localStorage.setItem("tokenSession", response.data.accessToken);
            localStorage.setItem("userId", response.data.user.id);
            localStorage.setItem("userRole", response.data.user.role);
            showToast("Berhasil login", "success");

            if (response.data.user.role == "admin") {
                console.log("goks")
                navigate("/admin/product")
            } else {
                navigate("/")
            }
        } catch (error) {
            console.error("Login failed:", error);
            showToast("Gagal login", "error");
        } finally {
            setLoading(false);
        }
    }, [navigate, showToast]);

    return (
        <Layout className="layout" style={{ minHeight: '100vh', background: '#f5f5f5' }}>
            <Content style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '50px 20px'
            }}>
                <Card
                    style={{
                        width: 400,
                        maxWidth: '100%',
                        background: '#ffffff',
                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)'
                    }}
                >

                    <center>
                        <h3>🎒 Lakupedia</h3>
                    </center>

                    <Space direction="vertical" size="large" style={{ width: '100%' }}>
                        <div style={{ textAlign: 'center' }}>
                            <Title level={2} style={{ color: token.colorTextHeading, marginBottom: 24 }}>Login</Title>
                        </div>

                        <Form
                            form={form}
                            name="login"
                            layout="vertical"
                            onFinish={handleSubmit}
                            autoComplete="off"
                            requiredMark={false}
                        >
                            <Form.Item
                                name="email"
                                label="Email"
                                rules={[
                                    { required: true, message: 'Please input your email!' },
                                    { type: 'email', message: 'Please enter a valid email!' }
                                ]}
                            >
                                <Input
                                    prefix={<UserOutlined />}
                                    placeholder="Enter your email"
                                    size="large"
                                    style={{ borderRadius: 4 }}
                                />
                            </Form.Item>

                            <Form.Item
                                name="password"
                                label="Password"
                                rules={[{ required: true, message: 'Please input your password!' }]}
                            >
                                <Input.Password
                                    prefix={<LockOutlined />}
                                    placeholder="Enter your password"
                                    size="large"
                                    style={{ borderRadius: 4 }}
                                />
                            </Form.Item>

                            <Form.Item style={{ marginTop: 24 }}>
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    size="large"
                                    block
                                    loading={loading}
                                    style={{
                                        height: 45
                                    }}
                                >
                                    Login
                                </Button>
                                <Link to="/register" style={{ color: '#1890ff', textAlign: 'center', display: 'block', marginTop: 8 }}>Don't have an account? Sign Up</Link>
                            </Form.Item>
                        </Form>
                    </Space>
                </Card>
            </Content>
        </Layout>
    );
}

export default Login;