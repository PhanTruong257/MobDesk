import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ProductList from '../components/ProductList';
import Cart from '../pages/Cart';
import Login from '../pages/Login';
import Profile from '../pages/Profile';
import Admin from '../pages/Admin';
import ProductDetails from '../pages/ProductDetails';
import styled from 'styled-components';

const PageContainer = styled.div`
  padding: 20px;
  min-height: calc(100vh - 200px);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  color: #666;
`;

const AppRoutes: React.FC = () => {
    return (
        <Routes>
            <Route path="/" element={<ProductList />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/admin/product-list" element={<Admin />} />
            <Route path="/admin/order-list" element={<Admin />} />
            <Route path="/admin/user-list" element={<Admin />} />
            <Route path="/products" element={<ProductList />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/about" element={<PageContainer>About Us - Coming Soon</PageContainer>} />
            <Route path="/contact" element={<PageContainer>Contact - Coming Soon</PageContainer>} />
            <Route path="/help" element={<PageContainer>Help Center - Coming Soon</PageContainer>} />
            <Route path="/category/:category" element={<PageContainer>Category Page - Coming Soon</PageContainer>} />
        </Routes>
    );
};

export default AppRoutes;
