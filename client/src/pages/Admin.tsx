import React, { useState } from "react";
import styled from "styled-components";

const AdminContainer = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem;
  min-height: 100vh;
`;

const AdminHeader = styled.div`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 2rem;
  border-radius: 20px;
  margin-bottom: 2rem;
  
  h1 {
    margin: 0 0 0.5rem 0;
    font-size: 2.5rem;
  }
  
  p {
    margin: 0;
    opacity: 0.9;
  }
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

const StatCard = styled.div`
  background: white;
  padding: 1.5rem;
  border-radius: 15px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  border-left: 4px solid #667eea;
  
  .stat-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
  }
  
  .stat-title {
    color: #666;
    font-size: 0.9rem;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }
  
  .stat-icon {
    width: 40px;
    height: 40px;
    border-radius: 10px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.2rem;
  }
  
  .stat-number {
    font-size: 2rem;
    font-weight: bold;
    color: #333;
    margin-bottom: 0.5rem;
  }
  
  .stat-change {
    font-size: 0.8rem;
    color: #28a745;
    
    &.negative {
      color: #dc3545;
    }
  }
`;

const AdminTabs = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  border-bottom: 1px solid #e1e5e9;
  
  @media (max-width: 768px) {
    overflow-x: auto;
    scrollbar-width: none;
    -ms-overflow-style: none;
    
    &::-webkit-scrollbar {
      display: none;
    }
  }
`;

const Tab = styled.button<{ active: boolean }>`
  padding: 1rem 1.5rem;
  border: none;
  background: none;
  cursor: pointer;
  font-weight: 600;
  color: ${props => props.active ? "#667eea" : "#666"};
  border-bottom: 2px solid ${props => props.active ? "#667eea" : "transparent"};
  transition: all 0.3s;
  white-space: nowrap;
  
  &:hover {
    color: #667eea;
  }
`;

const TabContent = styled.div`
  background: white;
  border-radius: 15px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  padding: 2rem;
`;

const TableContainer = styled.div`
  overflow-x: auto;
  border-radius: 10px;
  border: 1px solid #e1e5e9;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  
  th, td {
    padding: 1rem;
    text-align: left;
    border-bottom: 1px solid #e1e5e9;
  }
  
  th {
    background: #f8f9fa;
    font-weight: 600;
    color: #333;
  }
  
  tr:hover {
    background: #f8f9fa;
  }
`;

const ActionButton = styled.button<{ variant?: 'primary' | 'danger' | 'success' }>`
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 0.8rem;
  font-weight: 600;
  margin-right: 0.5rem;
  transition: all 0.3s;
  
  ${props => {
        switch (props.variant) {
            case 'danger':
                return `
          background: #dc3545;
          color: white;
          &:hover { background: #c82333; }
        `;
            case 'success':
                return `
          background: #28a745;
          color: white;
          &:hover { background: #218838; }
        `;
            default:
                return `
          background: #667eea;
          color: white;
          &:hover { background: #5a6fd8; }
        `;
        }
    }}
`;

const AddButton = styled.button`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 10px;
  font-weight: 600;
  cursor: pointer;
  margin-bottom: 1.5rem;
  transition: transform 0.2s;
  
  &:hover {
    transform: translateY(-2px);
  }
`;

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-bottom: 1.5rem;
`;

const FormGroup = styled.div`
  label {
    display: block;
    margin-bottom: 0.5rem;
    color: #333;
    font-weight: 500;
  }
  
  input, select, textarea {
    width: 100%;
    padding: 0.75rem;
    border: 2px solid #e1e5e9;
    border-radius: 10px;
    font-size: 1rem;
    transition: border-color 0.3s;
    
    &:focus {
      outline: none;
      border-color: #667eea;
    }
  }
  
  textarea {
    resize: vertical;
    min-height: 100px;
  }
`;

const StatusBadge = styled.span<{ status: string }>`
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
  
  ${props => {
        switch (props.status) {
            case 'active':
                return `
          background: #e8f5e8;
          color: #2e7d2e;
        `;
            case 'inactive':
                return `
          background: #f8d7da;
          color: #721c24;
        `;
            case 'pending':
                return `
          background: #fff3e0;
          color: #f57c00;
        `;
            default:
                return `
          background: #e3f2fd;
          color: #1976d2;
        `;
        }
    }}
`;

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
                    <TabContent>
                        <h3 style={{ marginBottom: "1.5rem" }}>Dashboard Overview</h3>
                        <StatsGrid>
                            {stats.map((stat, index) => (
                                <StatCard key={index}>
                                    <div className="stat-header">
                                        <div className="stat-title">{stat.title}</div>
                                        <div className="stat-icon">{stat.icon}</div>
                                    </div>
                                    <div className="stat-number">{stat.value}</div>
                                    <div className="stat-change">{stat.change}</div>
                                </StatCard>
                            ))}
                        </StatsGrid>
                    </TabContent>
                );

            case "products":
                return (
                    <TabContent>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
                            <h3>Product Management</h3>
                            <AddButton onClick={() => setShowAddProduct(!showAddProduct)}>
                                {showAddProduct ? "Cancel" : "Add Product"}
                            </AddButton>
                        </div>

                        {showAddProduct && (
                            <div style={{ marginBottom: "2rem", padding: "1.5rem", background: "#f8f9fa", borderRadius: "10px" }}>
                                <h4>Add New Product</h4>
                                <FormGrid>
                                    <FormGroup>
                                        <label>Product Name</label>
                                        <input type="text" placeholder="Enter product name" />
                                    </FormGroup>
                                    <FormGroup>
                                        <label>Price</label>
                                        <input type="number" placeholder="0.00" />
                                    </FormGroup>
                                    <FormGroup>
                                        <label>Stock</label>
                                        <input type="number" placeholder="0" />
                                    </FormGroup>
                                    <FormGroup>
                                        <label>Category</label>
                                        <select>
                                            <option>Electronics</option>
                                            <option>Clothing</option>
                                            <option>Books</option>
                                        </select>
                                    </FormGroup>
                                </FormGrid>
                                <FormGroup>
                                    <label>Description</label>
                                    <textarea placeholder="Enter product description"></textarea>
                                </FormGroup>
                                <ActionButton>Save Product</ActionButton>
                            </div>
                        )}

                        <TableContainer>
                            <Table>
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
                                            <td><StatusBadge status={product.status}>{product.status}</StatusBadge></td>
                                            <td>{product.sales}</td>
                                            <td>
                                                <ActionButton>Edit</ActionButton>
                                                <ActionButton variant="danger">Delete</ActionButton>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </TableContainer>
                    </TabContent>
                );

            case "orders":
                return (
                    <TabContent>
                        <h3 style={{ marginBottom: "1.5rem" }}>Order Management</h3>
                        <TableContainer>
                            <Table>
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
                                            <td><StatusBadge status={order.status}>{order.status}</StatusBadge></td>
                                            <td>{order.date}</td>
                                            <td>
                                                <ActionButton>View</ActionButton>
                                                <ActionButton variant="success">Ship</ActionButton>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </TableContainer>
                    </TabContent>
                );

            case "users":
                return (
                    <TabContent>
                        <h3 style={{ marginBottom: "1.5rem" }}>User Management</h3>
                        <TableContainer>
                            <Table>
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
                                            <td><StatusBadge status={user.status}>{user.status}</StatusBadge></td>
                                            <td>{user.joined}</td>
                                            <td>
                                                <ActionButton>Edit</ActionButton>
                                                <ActionButton variant="danger">Block</ActionButton>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </TableContainer>
                    </TabContent>
                );

            default:
                return null;
        }
    };

    return (
        <AdminContainer>
            <AdminHeader>
                <h1>Admin Dashboard</h1>
                <p>Manage your e-commerce store efficiently</p>
            </AdminHeader>

            <AdminTabs>
                <Tab active={activeTab === "dashboard"} onClick={() => setActiveTab("dashboard")}>
                    Dashboard
                </Tab>
                <Tab active={activeTab === "products"} onClick={() => setActiveTab("products")}>
                    Products
                </Tab>
                <Tab active={activeTab === "orders"} onClick={() => setActiveTab("orders")}>
                    Orders
                </Tab>
                <Tab active={activeTab === "users"} onClick={() => setActiveTab("users")}>
                    Users
                </Tab>
            </AdminTabs>

            {renderTabContent()}
        </AdminContainer>
    );
};

export default Admin;
