import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import ProductList from './components/ProductList';
import Cart from './pages/Cart';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Admin from './pages/Admin';
import ProductDetails from './pages/ProductDetails';
import styled from 'styled-components';

const AppContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: #f8f9fa;
`;

const MainContent = styled.main`
  flex: 1;
`;

const PageContainer = styled.div`
  margin-top: 80px;
  padding: 20px;
  min-height: calc(100vh - 200px);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  color: #666;
`;

function App() {
  return (
    <Router>
      <AppContainer>
        <Header />
        <MainContent>
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
        </MainContent>
        <Footer />
      </AppContainer>
    </Router>
  );
}

export default App;
