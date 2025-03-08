import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router';
import { useToast } from '../components/ToastContext';
import { Form, Input, Button, Card, Typography, Layout, Space } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

const { Title } = Typography;
const { Content } = Layout;

const Register = () => {
    const navigate = useNavigate();
    const { showToast } = useToast();
    const [loading, setLoading] = useState(false);
    const [form] = Form.useForm();

    const handleSubmit = async (values) => {
        setLoading(true);
        try {
            const response = await axios.post("http://localhost:3002/register", {
                email: values.email,
                password: values.password,
                role: "customer"
            });

            localStorage.setItem("tokenSession", response.data.accessToken);
            localStorage.setItem("userId", response.data.user.id);
            showToast("Berhasil register", "success");
            navigate("/");
        } catch (error) {
            console.log(error);
            showToast("Gagal register", "error");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Layout className="layout" style={{ minHeight: '100vh', background: '#141414' }}>
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
                        background: '#1f1f1f',
                        borderRadius: 8,
                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.5)'
                    }}
                >
                    <Space direction="vertical" size="large" style={{ width: '100%' }}>
                        <div style={{ textAlign: 'center' }}>
                            <Title level={2} style={{ color: '#fff', marginBottom: 24 }}>Sign Up</Title>
                        </div>

                        <Form
                            form={form}
                            name="register"
                            layout="vertical"
                            onFinish={handleSubmit}
                            autoComplete="off"
                            requiredMark={false}
                        >
                            <Form.Item
                                name="email"
                                label={<span style={{ color: '#d9d9d9' }}>Email</span>}
                                rules={[
                                    { required: true, message: 'Please input your email!' },
                                    { type: 'email', message: 'Please enter a valid email!' }
                                ]}
                            >
                                <Input
                                    prefix={<UserOutlined />}
                                    placeholder="Enter your email"
                                    size="large"
                                    style={{ background: '#303030', border: '1px solid #434343', color: '#fff' }}
                                />
                            </Form.Item>

                            <Form.Item
                                name="password"
                                label={<span style={{ color: '#d9d9d9' }}>Password</span>}
                                rules={[{ required: true, message: 'Please input your password!' }]}
                            >
                                <Input.Password
                                    prefix={<LockOutlined />}
                                    placeholder="Enter your password"
                                    size="large"
                                    style={{ background: '#303030', border: '1px solid #434343', color: '#fff' }}
                                />
                            </Form.Item>

                            <Form.Item
                                name="confirmPassword"
                                label={<span style={{ color: '#d9d9d9' }}>Confirm Password</span>}
                                dependencies={['password']} // This makes it watch the password field
                                rules={[
                                    { required: true, message: 'Please confirm your password!' },
                                    ({ getFieldValue }) => ({
                                    validator(_, value) {
                                        if (!value || getFieldValue('password') === value) {
                                        return Promise.resolve()
                                        }
                                        return Promise.reject(new Error('Passwords do not match!'))
                                    },
                                    }),
                                ]}
                                >
                                <Input.Password
                                    prefix={<LockOutlined />}
                                    placeholder="Confirm your password"
                                    size="large"
                                    style={{ background: '#303030', border: '1px solid #434343', color: '#fff' }}
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
                                        height: 45,
                                        background: '#1890ff',
                                        borderColor: '#1890ff'
                                    }}
                                >
                                    Register
                                </Button>
                                <Link to="/login" style={{ color: '#1890ff', textAlign: 'center', display: 'block', marginTop: 8 }}>Already have an account? Sign In</Link>
                            </Form.Item>
                        </Form>
                    </Space>
                </Card>
            </Content>
        </Layout>
    );
}
export default Register