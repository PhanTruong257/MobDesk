import React, { useState } from "react";
import styled from "styled-components";

const ProfileContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  min-height: 100vh;
`;

const ProfileHeader = styled.div`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 2rem;
  border-radius: 20px;
  margin-bottom: 2rem;
  display: flex;
  align-items: center;
  gap: 2rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
  }
`;

const Avatar = styled.div`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3rem;
  font-weight: bold;
  position: relative;
  
  .upload-btn {
    position: absolute;
    bottom: 0;
    right: 0;
    width: 35px;
    height: 35px;
    border-radius: 50%;
    background: #fff;
    color: #667eea;
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.2rem;
  }
`;

const UserInfo = styled.div`
  flex: 1;
  
  h1 {
    margin: 0 0 0.5rem 0;
    font-size: 2rem;
  }
  
  p {
    margin: 0;
    opacity: 0.9;
  }
  
  .member-since {
    margin-top: 0.5rem;
    font-size: 0.9rem;
    opacity: 0.8;
  }
`;

const ProfileTabs = styled.div`
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

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
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

const SaveButton = styled.button`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  padding: 0.75rem 2rem;
  border-radius: 10px;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.2s;
  
  &:hover {
    transform: translateY(-2px);
  }
`;

const OrderCard = styled.div`
  border: 1px solid #e1e5e9;
  border-radius: 15px;
  padding: 1.5rem;
  margin-bottom: 1rem;
  
  .order-header {
    display: flex;
    justify-content: between;
    align-items: center;
    margin-bottom: 1rem;
    
    @media (max-width: 768px) {
      flex-direction: column;
      align-items: flex-start;
      gap: 0.5rem;
    }
  }
  
  .order-id {
    font-weight: 600;
    color: #333;
  }
  
  .order-status {
    padding: 0.25rem 0.75rem;
    border-radius: 20px;
    font-size: 0.8rem;
    font-weight: 600;
    
    &.delivered {
      background: #e8f5e8;
      color: #2e7d2e;
    }
    
    &.shipped {
      background: #e3f2fd;
      color: #1976d2;
    }
    
    &.processing {
      background: #fff3e0;
      color: #f57c00;
    }
  }
  
  .order-items {
    display: flex;
    gap: 1rem;
    margin-bottom: 1rem;
    
    img {
      width: 60px;
      height: 60px;
      object-fit: cover;
      border-radius: 8px;
    }
  }
  
  .order-total {
    text-align: right;
    font-weight: 600;
    font-size: 1.1rem;
    color: #667eea;
  }
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

const StatCard = styled.div`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 1.5rem;
  border-radius: 15px;
  text-align: center;
  
  .stat-number {
    font-size: 2rem;
    font-weight: bold;
    margin-bottom: 0.5rem;
  }
  
  .stat-label {
    opacity: 0.9;
  }
`;

const Profile: React.FC = () => {
    const [activeTab, setActiveTab] = useState("profile");
    const [formData, setFormData] = useState({
        name: "John Doe",
        email: "john.doe@example.com",
        phone: "+1 (555) 123-4567",
        address: "123 Main St",
        city: "New York",
        state: "NY",
        zipCode: "10001",
        bio: "Tech enthusiast and avid shopper"
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSave = () => {
        console.log("Saving profile data:", formData);
    };

    const orders = [
        {
            id: "ORD-2024-001",
            status: "delivered",
            date: "2024-01-15",
            total: 299.99,
            items: [
                { name: "Wireless Headphones", image: "/api/placeholder/60/60" },
                { name: "Phone Case", image: "/api/placeholder/60/60" }
            ]
        },
        {
            id: "ORD-2024-002",
            status: "shipped",
            date: "2024-01-20",
            total: 149.99,
            items: [
                { name: "Smart Watch", image: "/api/placeholder/60/60" }
            ]
        }
    ];

    const renderTabContent = () => {
        switch (activeTab) {
            case "profile":
                return (
                    <TabContent>
                        <h3 style={{ marginBottom: "1.5rem" }}>Personal Information</h3>
                        <FormGrid>
                            <FormGroup>
                                <label>Full Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                />
                            </FormGroup>
                            <FormGroup>
                                <label>Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                />
                            </FormGroup>
                            <FormGroup>
                                <label>Phone</label>
                                <input
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleInputChange}
                                />
                            </FormGroup>
                            <FormGroup>
                                <label>Address</label>
                                <input
                                    type="text"
                                    name="address"
                                    value={formData.address}
                                    onChange={handleInputChange}
                                />
                            </FormGroup>
                            <FormGroup>
                                <label>City</label>
                                <input
                                    type="text"
                                    name="city"
                                    value={formData.city}
                                    onChange={handleInputChange}
                                />
                            </FormGroup>
                            <FormGroup>
                                <label>State</label>
                                <input
                                    type="text"
                                    name="state"
                                    value={formData.state}
                                    onChange={handleInputChange}
                                />
                            </FormGroup>
                            <FormGroup>
                                <label>ZIP Code</label>
                                <input
                                    type="text"
                                    name="zipCode"
                                    value={formData.zipCode}
                                    onChange={handleInputChange}
                                />
                            </FormGroup>
                            <FormGroup>
                                <label>Bio</label>
                                <textarea
                                    name="bio"
                                    value={formData.bio}
                                    onChange={handleInputChange}
                                    placeholder="Tell us about yourself"
                                />
                            </FormGroup>
                        </FormGrid>
                        <SaveButton onClick={handleSave} style={{ marginTop: "2rem" }}>
                            Save Changes
                        </SaveButton>
                    </TabContent>
                );

            case "orders":
                return (
                    <TabContent>
                        <h3 style={{ marginBottom: "1.5rem" }}>Order History</h3>
                        {orders.map(order => (
                            <OrderCard key={order.id}>
                                <div className="order-header">
                                    <div>
                                        <div className="order-id">Order {order.id}</div>
                                        <div style={{ color: "#666", fontSize: "0.9rem" }}>{order.date}</div>
                                    </div>
                                    <span className={`order-status ${order.status}`}>
                                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                                    </span>
                                </div>
                                <div className="order-items">
                                    {order.items.map((item, index) => (
                                        <div key={index} style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                                            <img src={item.image} alt={item.name} />
                                            <span>{item.name}</span>
                                        </div>
                                    ))}
                                </div>
                                <div className="order-total">
                                    Total: ${order.total}
                                </div>
                            </OrderCard>
                        ))}
                    </TabContent>
                );

            case "stats":
                return (
                    <TabContent>
                        <h3 style={{ marginBottom: "1.5rem" }}>Account Statistics</h3>
                        <StatsGrid>
                            <StatCard>
                                <div className="stat-number">24</div>
                                <div className="stat-label">Total Orders</div>
                            </StatCard>
                            <StatCard>
                                <div className="stat-number">$2,847</div>
                                <div className="stat-label">Total Spent</div>
                            </StatCard>
                            <StatCard>
                                <div className="stat-number">12</div>
                                <div className="stat-label">Wishlist Items</div>
                            </StatCard>
                            <StatCard>
                                <div className="stat-number">4.8</div>
                                <div className="stat-label">Avg Rating</div>
                            </StatCard>
                        </StatsGrid>
                    </TabContent>
                );

            default:
                return null;
        }
    };

    return (
        <ProfileContainer>
            <ProfileHeader>
                <Avatar>
                    JD
                    <button className="upload-btn">📷</button>
                </Avatar>
                <UserInfo>
                    <h1>{formData.name}</h1>
                    <p>{formData.email}</p>
                    <div className="member-since">Member since January 2023</div>
                </UserInfo>
            </ProfileHeader>

            <ProfileTabs>
                <Tab active={activeTab === "profile"} onClick={() => setActiveTab("profile")}>
                    Profile
                </Tab>
                <Tab active={activeTab === "orders"} onClick={() => setActiveTab("orders")}>
                    Orders
                </Tab>
                <Tab active={activeTab === "stats"} onClick={() => setActiveTab("stats")}>
                    Statistics
                </Tab>
            </ProfileTabs>

            {renderTabContent()}
        </ProfileContainer>
    );
};

export default Profile;
