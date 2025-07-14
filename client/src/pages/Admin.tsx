import React, { useState } from "react";
import './Admin.css';

const Admin: React.FC = () => {
    const [activeTab, setActiveTab] = useState("dashboard");
    const [showAddProduct, setShowAddProduct] = useState(false);

    const stats = [
        { title: "Total Sales", value: "$12,847", change: "+12.5%", icon: "💰" },
        { title: "Total Orders", value: "1,247", change: "+8.2%", icon: "📦" },
        { title: "Total Users", value: "3,521", change: "+15.3%", icon: "👥" },
        { title: "Total Products", value: "156", change: "+2.1%", icon: "📱" }
    ];

    const products = [
        { id: 1, name: "iPhone 15 Pro", price: "$999", stock: 45, status: "active", sales: 234 },
        { id: 2, name: "MacBook Air M3", price: "$1299", stock: 23, status: "active", sales: 156 },
        { id: 3, name: "AirPods Pro", price: "$249", stock: 0, status: "inactive", sales: 89 },
        { id: 4, name: "iPad Pro", price: "$799", stock: 67, status: "active", sales: 198 }
    ];

    const orders = [
        { id: "ORD-001", customer: "John Doe", total: "$299.99", status: "pending", date: "2024-01-20" },
        { id: "ORD-002", customer: "Jane Smith", total: "$149.99", status: "shipped", date: "2024-01-19" },
        { id: "ORD-003", customer: "Bob Johnson", total: "$89.99", status: "delivered", date: "2024-01-18" }
    ];

    const users = [
        { id: 1, name: "John Doe", email: "john@example.com", orders: 12, status: "active", joined: "2023-06-15" },
        { id: 2, name: "Jane Smith", email: "jane@example.com", orders: 8, status: "active", joined: "2023-08-22" },
        { id: 3, name: "Bob Johnson", email: "bob@example.com", orders: 3, status: "inactive", joined: "2023-12-01" }
    ];

    const renderTabContent = () => {
        switch (activeTab) {
            case "dashboard":
                return (
                    <div className="tab-content">
                        <h3 style={{ marginBottom: "1.5rem" }}>Dashboard Overview</h3>
                        <div className="stats-grid">
                            {stats.map((stat, index) => (
                                <div className="stat-card" key={index}>
                                    <div className="stat-header">
                                        <div className="stat-title">{stat.title}</div>
                                        <div className="stat-icon">{stat.icon}</div>
                                    </div>
                                    <div className="stat-number">{stat.value}</div>
                                    <div className="stat-change">{stat.change}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                );

            case "products":
                return (
                    <div className="tab-content">
                        <div className="header-actions">
                            <h3>Product Management</h3>
                            <button className="add-button" onClick={() => setShowAddProduct(!showAddProduct)}>
                                {showAddProduct ? "Cancel" : "Add Product"}
                            </button>
                        </div>

                        {showAddProduct && (
                            <div className="add-product-form">
                                <h4>Add New Product</h4>
                                <div className="form-grid">
                                    <div className="form-group">
                                        <label>Product Name</label>
                                        <input type="text" placeholder="Enter product name" />
                                    </div>
                                    <div className="form-group">
                                        <label>Price</label>
                                        <input type="number" placeholder="0.00" />
                                    </div>
                                    <div className="form-group">
                                        <label>Stock</label>
                                        <input type="number" placeholder="0" />
                                    </div>
                                    <div className="form-group">
                                        <label>Category</label>
                                        <select>
                                            <option>Electronics</option>
                                            <option>Clothing</option>
                                            <option>Books</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label>Description</label>
                                    <textarea placeholder="Enter product description"></textarea>
                                </div>
                                <button className="action-button">Save Product</button>
                            </div>
                        )}

                        <div className="table-container">
                            <table className="product-table">
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Name</th>
                                        <th>Price</th>
                                        <th>Stock</th>
                                        <th>Status</th>
                                        <th>Sales</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {products.map(product => (
                                        <tr key={product.id}>
                                            <td>{product.id}</td>
                                            <td>{product.name}</td>
                                            <td>{product.price}</td>
                                            <td>{product.stock}</td>
                                            <td><span className={`status-badge ${product.status}`}>{product.status}</span></td>
                                            <td>{product.sales}</td>
                                            <td>
                                                <button className="action-button">Edit</button>
                                                <button className="action-button danger">Delete</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                );

            case "orders":
                return (
                    <div className="tab-content">
                        <h3 style={{ marginBottom: "1.5rem" }}>Order Management</h3>
                        <div className="table-container">
                            <table className="order-table">
                                <thead>
                                    <tr>
                                        <th>Order ID</th>
                                        <th>Customer</th>
                                        <th>Total</th>
                                        <th>Status</th>
                                        <th>Date</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {orders.map(order => (
                                        <tr key={order.id}>
                                            <td>{order.id}</td>
                                            <td>{order.customer}</td>
                                            <td>{order.total}</td>
                                            <td><span className={`status-badge ${order.status}`}>{order.status}</span></td>
                                            <td>{order.date}</td>
                                            <td>
                                                <button className="action-button">View</button>
                                                <button className="action-button success">Ship</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                );

            case "users":
                return (
                    <div className="tab-content">
                        <h3 style={{ marginBottom: "1.5rem" }}>User Management</h3>
                        <div className="table-container">
                            <table className="user-table">
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Orders</th>
                                        <th>Status</th>
                                        <th>Joined</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {users.map(user => (
                                        <tr key={user.id}>
                                            <td>{user.id}</td>
                                            <td>{user.name}</td>
                                            <td>{user.email}</td>
                                            <td>{user.orders}</td>
                                            <td><span className={`status-badge ${user.status}`}>{user.status}</span></td>
                                            <td>{user.joined}</td>
                                            <td>
                                                <button className="action-button">Edit</button>
                                                <button className="action-button danger">Block</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                );

            default:
                return null;
        }
    };

    return (
        <div className="admin-container">
            <div className="admin-header">
                <h1>Admin Dashboard</h1>
                <p>Manage your e-commerce store efficiently</p>
            </div>

            <div className="admin-tabs">
                <button className={`tab ${activeTab === "dashboard" ? "active" : ""}`} onClick={() => setActiveTab("dashboard")}>
                    Dashboard
                </button>
                <button className={`tab ${activeTab === "products" ? "active" : ""}`} onClick={() => setActiveTab("products")}>
                    Products
                </button>
                <button className={`tab ${activeTab === "orders" ? "active" : ""}`} onClick={() => setActiveTab("orders")}>
                    Orders
                </button>
                <button className={`tab ${activeTab === "users" ? "active" : ""}`} onClick={() => setActiveTab("users")}>
                    Users
                </button>
            </div>

            {renderTabContent()}
        </div>
    );
};

export default Admin;
