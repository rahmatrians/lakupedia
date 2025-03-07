import React, { useEffect, useState } from 'react';
import { Table, Button, Input, Space, Typography, Breadcrumb, Tag, ConfigProvider, theme } from 'antd';
import { PlusOutlined, EditOutlined, DownloadOutlined, SearchOutlined } from '@ant-design/icons';
import Menus from '../../components/Menus';
import axios from 'axios';
import { Link, useNavigate } from 'react-router';
import { useToast } from '../../components/ToastContext';

function ListCategory() {
  const nav = useNavigate();
  const { showToast } = useToast();
  const [personalData, setPersonalData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { Title } = Typography;
  const accessToken = localStorage.getItem("tokenSession");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const data = await axios.get("http://10.100.15.186:3002/categories",
      );
      setPersonalData(data.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  // Define columns matching your original structure
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => (
        <Link to={`/categories/${record.id}`} style={{ color: '#6366F1', textDecoration: 'none' }}>
          {text}
        </Link>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space size="middle">
          <Button
            type="text"
            icon={<EditOutlined />}
            onClick={() => nav(`/categories/${record.id}`)}
          />
        </Space>
      ),
    },
  ];

  // Sample data in case real data is not loaded yet
  const sampleData = [
    { id: 1, name: 'Electronics' },
    { id: 2, name: 'Clothing' },
    { id: 3, name: 'Books' }
  ];

  const DarkCategoryList = () => (
    <div style={{ padding: '20px', background: '#141414', minHeight: '100vh' }}>
      <Typography.Title level={4} style={{ margin: 0, color: '#fff' }}>Category</Typography.Title>

      <Breadcrumb style={{ margin: '8px 0 24px' }}>
        <Breadcrumb.Item>
          <Link to="/" style={{ color: '#6366F1' }}>CMS</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item style={{ color: 'rgba(255, 255, 255, 0.65)' }}>Category</Breadcrumb.Item>
      </Breadcrumb>

      <div style={{ background: '#1f1f1f', padding: '24px', borderRadius: '8px', boxShadow: '0 1px 2px rgba(0,0,0,0.2)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <Typography.Title level={5} style={{ margin: 0, color: '#fff' }}>Daftar Category</Typography.Title>

          <div style={{ display: 'flex', gap: '16px' }}>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              style={{ backgroundColor: '#6366F1' }}
              onClick={() => nav('/categories/add')}
            >
              Add Category
            </Button>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '20px' }}>
          <Input
            placeholder="Search"
            suffix={<SearchOutlined />}
            style={{ width: '240px', background: '#141414', borderColor: '#303030' }}
          />
        </div>

        <Table
          columns={columns}
          dataSource={personalData || sampleData}
          rowKey="id"
          pagination={{ pageSize: 10 }}
          bordered={false}
          loading={loading}
          style={{
            borderRadius: '8px',
            overflow: 'hidden'
          }}
        />
      </div>
    </div>
  );

  return (
    <ConfigProvider
      theme={{
        algorithm: theme.darkAlgorithm,
        token: {
          colorPrimary: '#6366F1',
          borderRadius: 8,
          colorBgContainer: '#1f1f1f',
          colorBgElevated: '#1f1f1f',
          colorText: 'rgba(255, 255, 255, 0.85)',
          colorTextSecondary: 'rgba(255, 255, 255, 0.65)',
        },
        components: {
          Table: {
            colorBgContainer: '#1f1f1f',
            headerBg: '#141414',
            rowHoverBg: '#303030',
          },
          Button: {
            colorPrimary: '#6366F1',
            colorPrimaryHover: '#4F46E5',
          },
          Input: {
            colorBgContainer: '#141414',
            colorBorder: '#303030',
          }
        }
      }}
    >
      <DarkCategoryList />
    </ConfigProvider>
  );
}

export default ListCategory;