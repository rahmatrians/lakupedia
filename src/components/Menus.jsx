import React, { useState } from 'react';
import {
    Layout,
    Menu,
    Input,
    Badge,
    Dropdown,
    Button,
    Space,
    Drawer,
    Avatar
} from 'antd';
import {
    ShoppingCartOutlined,
    UserOutlined,
    SearchOutlined,
    HeartOutlined,
    MenuOutlined,
    DownOutlined
} from '@ant-design/icons';
import { Link, useLocation, useNavigate } from 'react-router';

const { Header } = Layout;
const { Search } = Input;

const Menus = () => {
    const [mobileMenuVisible, setMobileMenuVisible] = useState(false);
    const nav = useNavigate()
    const token = localStorage.getItem("tokenSession");
    const userRole = localStorage.getItem("userRole");
    const path = useLocation()


    // Sample categories for dropdown
    const categories = [
        { key: '1', label: 'Clothing' },
        { key: '2', label: 'Electronics' },
        { key: '3', label: 'Home & Kitchen' },
        { key: '4', label: 'Beauty' },
        { key: '5', label: 'Sports' },
    ];

    // User menu items
    const userMenuItems = [
        // { key: 'profile', label: 'My Profile' },
        // { key: 'orders', label: 'My Orders' },
        // { key: 'wishlist', label: 'Wishlist' },
        // { key: 'settings', label: 'Settings' },
        { key: 'logout', label: 'Logout', onClick: () => onLogOut() },
    ];

    const categoriesMenu = {
        items: categories,
    };

    const userMenu = {
        items: userMenuItems,
    };

    // Mobile menu drawer
    const showMobileMenu = () => {
        setMobileMenuVisible(true);
    };

    const onCloseMobileMenu = () => {
        setMobileMenuVisible(false);
    };

    const onLogOut = () => {
        localStorage.clear();
        nav("/")
    };

    return (
        <Layout className="layout">
            <Header style={{
                background: '#fff',
                padding: '0 20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                position: 'fixed',
                zIndex: 1000,
                width: '100%',
                top: 0,
                left: 0
            }}>
                {/* Mobile menu button (only visible on small screens) */}
                <Button
                    type="text"
                    icon={<MenuOutlined />}
                    onClick={showMobileMenu}
                    style={{
                        display: 'none',
                        '@media (maxWidth: 768px)': {
                            display: 'inline-flex',
                        }
                    }}
                />

                {/* Logo */}
                <a className="logo" style={{
                    fontSize: '24px',
                    fontWeight: 'bold',
                    color: 'black',
                    margin: '0 24px 0 0'
                }}
                    onClick={() => nav(userRole == 'admin' ? "/admin/product" : "/")}
                >
                    🎒Lakupedia
                </a>

                {/* Categories Dropdown - Hide on mobile */}
                {/* <div style={{
                    display: 'flex',
                    '@media (maxWidth: 768px)': {
                        display: 'none',
                    }
                }}>
                    <Dropdown menu={categoriesMenu} placement="bottomLeft">
                        <a onClick={(e) => e.preventDefault()}>
                            <Space>
                                Categories
                                <DownOutlined />
                            </Space>
                        </a>
                    </Dropdown>
                </div> */}

                {/* Main navigation - Hide on mobile */}

                {userRole == "admin" && (

                    <Menu
                        mode="horizontal"
                        style={{
                            flex: 1,
                            minWidth: 0,
                            border: 'none',
                            '@media (maxWidth: 768px)': {
                                display: 'none',
                            }
                        }}
                        items={[
                            { key: 'category', label: 'Category', onClick: () => nav("/admin/category"), style: ['/admin/category'].includes(path.pathname) && { fontWeight: 'bold', color: '#1890ff', borderBottom: '2px solid #1890ff' } },
                            { key: 'product', label: 'Product', onClick: () => nav("/admin/product"), style: ['/admin/product'].includes(path.pathname) && { fontWeight: 'bold', color: '#1890ff', borderBottom: '2px solid #1890ff' } }
                        ]}
                    />

                )}


                {/* Search bar */}
                {/* <Search
                    placeholder="Search products..."
                    style={{
                        width: 300,
                        margin: '0 16px',
                        '@media (maxWidth: 768px)': {
                            display: 'none',
                        }
                    }}
                /> */}

                {/* Mobile search icon */}
                <Button
                    type="text"
                    icon={<SearchOutlined />}
                    style={{
                        display: 'none',
                        '@media (maxWidth: 768px)': {
                            display: 'inline-flex',
                        }
                    }}
                />

                {/* Right side icons */}
                <Space size="large">
                    {/* <Badge count={2}>
                        <HeartOutlined style={{ fontSize: '24px' }} />
                    </Badge> */}

                    {userRole == "customer" && (

                        <Link to={"/cart"}>
                            <Badge count={0}>
                                <ShoppingCartOutlined style={{ fontSize: '24px', paddingRight: '20px', marginTop: '25px' }} />
                            </Badge>
                        </Link>

                    )}


                    {token ? (
                        <Dropdown menu={userMenu} placement="bottomRight">
                            <span onClick={(e) => e.preventDefault()}>
                                <Avatar icon={<UserOutlined />} />
                            </span>
                        </Dropdown>
                    ) : (
                        <Button onClick={() => nav("/login")}>Login</Button>
                    )}
                </Space>

                {/* Mobile Menu Drawer */}
                <Drawer
                    title="Menu"
                    placement="left"
                    onClose={onCloseMobileMenu}
                    open={mobileMenuVisible}
                >
                    <Search
                        placeholder="Search products..."
                        style={{ marginBottom: 16 }}
                    />
                    <Menu mode="vertical" style={{ border: 'none' }}>
                        <Menu.SubMenu key="categories" title="Categories">
                            {categories.map(category => (
                                <Menu.Item key={category.key}>{category.label}</Menu.Item>
                            ))}
                        </Menu.SubMenu>
                        {/* <Menu.Item key="new">New Arrivals</Menu.Item>
                        <Menu.Item key="deals">Deals</Menu.Item>
                        <Menu.Item key="popular">Popular</Menu.Item> */}
                        <Menu.Divider />
                        {/* <Menu.Item key="profile">My Profile</Menu.Item> */}
                        {/* <Menu.Item key="orders">My Orders</Menu.Item> */}
                        {/* <Menu.Item key="wishlist">Wishlist</Menu.Item> */}
                        {/* <Menu.Item key="settings">Settings</Menu.Item> */}
                        <Menu.Item key="logout">Logout</Menu.Item>
                    </Menu>
                </Drawer>
            </Header>

            {/* This div creates space below the fixed header */}
            <div style={{ height: '64px' }} />
        </Layout>
    );
};

export default Menus;