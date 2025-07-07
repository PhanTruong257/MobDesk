import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<div style={{ marginTop: '80px', padding: '20px' }}>Home Page</div>} />
          <Route path="/cart" element={<div style={{ marginTop: '80px', padding: '20px' }}>Cart Page</div>} />
          <Route path="/login" element={<div style={{ marginTop: '80px', padding: '20px' }}>Login Page</div>} />
          <Route path="/profile" element={<div style={{ marginTop: '80px', padding: '20px' }}>Profile Page</div>} />
          <Route path="/admin/product-list" element={<div style={{ marginTop: '80px', padding: '20px' }}>Admin Products</div>} />
          <Route path="/admin/order-list" element={<div style={{ marginTop: '80px', padding: '20px' }}>Admin Orders</div>} />
          <Route path="/admin/user-list" element={<div style={{ marginTop: '80px', padding: '20px' }}>Admin Users</div>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
