import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import styled from 'styled-components';
import { toast } from 'react-toastify';
import SearchBox from './SearchBox';
import { useLogoutMutation, useGetUserProfileQuery } from '../slices/userApiSlice';
import { useAppSelector } from '../hooks/useAppSelector';
import { StoredUser, parseUserFromStorage } from '../types/StoreUser';
import { setCredentials } from '../slices/authSlice';

// All-in-one Styled Component
const HeaderContainer = styled.div`
  /* Header Wrapper */
  .header {
    background: rgb(204, 48, 48);
    color: #fff;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1000;
    padding: 1rem 0;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
  }

  /* Container */
  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 2rem;
  }

  /* Brand */
  .brand {
    font-size: 1.5rem;
    font-weight: bold;
    color: #fff;
    text-decoration: none;
    transition: color 0.3s;
  }
  .brand:hover {
    color: #3EA6FF;
  }

  /* Logo Button */
  .logo {
    background: rgb(148, 41, 41);
    border: none;
    color: #fff;
    cursor: pointer;
    padding: 0.5rem;
    border-radius: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background 0.3s;
    gap: 0.2rem;
    position: relative;
  }
  .logo:hover {
    background: rgba(255, 255, 255, 0.1);
  }
  .logo:hover .category-dropdown {
    display: block;
  }

  /* Category Dropdown */
  .category-dropdown {
    display: none;
    position: absolute;
    top: 100%;
    left: 0;
    background: white;
    border: 1px solid #ddd;
    border-radius: 8px;
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
    z-index: 1001;
    min-width: 280px;
    padding: 1rem 0;
    margin-top: 0.5rem;
    color: #333;
    
    .dropdown-section {
      padding: 0.5rem 0;
      border-bottom: 1px solid #f0f0f0;
      
      &:last-child {
        border-bottom: none;
      }
      
      .section-title {
        padding: 0.5rem 1rem;
        font-weight: bold;
        color: rgb(204, 48, 48);
        font-size: 0.9rem;
        text-transform: uppercase;
        letter-spacing: 1px;
      }
      
      .dropdown-item {
        padding: 0.6rem 1.5rem;
        cursor: pointer;
        transition: all 0.2s;
        display: flex;
        align-items: center;
        gap: 0.8rem;
        
        &:hover {
          background: #f8f9fa;
          color: rgb(204, 48, 48);
          padding-left: 2rem;
        }
        
        .item-icon {
          font-size: 1.2rem;
          width: 20px;
        }
        
        .item-details {
          flex: 1;
          
          .item-name {
            font-weight: 500;
            margin-bottom: 0.2rem;
          }
          
          .item-desc {
            font-size: 0.8rem;
            color: #666;
          }
        }
        
        .item-count {
          font-size: 0.8rem;
          color: #999;
          background: #f0f0f0;
          padding: 0.2rem 0.5rem;
          border-radius: 10px;
        }
      }
    }
  }

  /* Navigation */
  .nav-links {
    display: flex;
    align-items: center;
    gap: 1.5rem;
  }

  .nav-link {
    color: #fff;
    text-decoration: none;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem 1rem;
    border-radius: 8px;
    transition: all 0.3s;
    position: relative;
    background: rgba(0, 0, 0, 0.1);
    border: 0.2px solid rgba(255, 255, 255, 0.2);
  }
  .nav-link:hover {
    background: rgba(255, 255, 255, 0.2);
    color: #3EA6FF;
    border-color: rgba(255, 255, 255, 0.3);
  }

  /* Cart Badge */
  .cart-badge {
    background: #ffc107;
    color: #000;
    border-radius: 50%;
    padding: 0.2rem 0.5rem;
    font-size: 0.8rem;
    font-weight: bold;
    position: absolute;
    top: -5px;
    right: -5px;
    min-width: 20px;
    text-align: center;
  }

  /* User Dropdown */
  .user-dropdown {
    cursor: pointer;
    position: relative;
        padding: 0.5rem 1rem;

    
  }
 
  .user-dropdown:hover .dropdown-menu {
  opacity: 1;
  visibility: visible;
  transform: translateY(0);
}

 

  .dropdown-menu {
    position: absolute;
    top: 100%;
    right: 0;
    background:rgb(194, 49, 49);
    border: 1px solid #303030;
    border-radius: 8px;
    min-width: 150px;
    box-shadow: 0 4px 20px rgba(204, 112, 112, 0.3);
    opacity: 0;
    visibility: hidden;
    transform: translateY(-10px);
    transition: all 0.3s;
  }
  .dropdown-menu.show {
    opacity: 1;
    visibility: visible;
    transform: translateY(0);
  }
  .dropdown-menu a, .dropdown-menu button {
    display: block;
    width: 100%;
    padding: 0.75rem 1rem;
    background: transparent;
    border: none;
    color: #fff;
    text-decoration: none;
    text-align: left;
    cursor: pointer;
    transition: background 0.3s;
    margin: 0;
    box-sizing: border-box;
  }
  .dropdown-menu a:hover, .dropdown-menu button:hover {
    background: rgb(99, 32, 32);
        border-radius: 8px;

  }

  /* Mobile Toggle */
  .mobile-toggle {
    display: none;
    background: transparent;
    border: none;
    color: #fff;
    font-size: 1.5rem;
    cursor: pointer;
  }

  /* Mobile Overlay */
  .mobile-overlay {
    display: none;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 999;
  }

  /* Mobile Styles */
  @media screen and (max-width: 768px) {
    .container {
      flex-direction: column; /* Sắp xếp theo chiều dọc */
      align-items: center;
      gap: 1rem; /* Thêm khoảng cách giữa các phần tử */
    }

    .brand {
      font-size: 1.2rem; /* Giảm kích thước chữ */
    }

    .logo {
      display: none; /* Ẩn logo trên mobile */
    }
    .nav-links {
      display: none;  
  }

    .nav-links {
      flex-direction: column; /* Sắp xếp các link theo chiều dọc */
      gap: 1rem; /* Thêm khoảng cách giữa các link */
    }

    .mobile-toggle {
      display: none; /* Hiển thị nút toggle */
      margin-top: 1rem;
    }

    .mobile-overlay {
      display: block;
      opacity: 0;
      visibility: hidden;
      transition: all 0.3s;
    }

    .mobile-overlay.active {
      opacity: 1;
      visibility: visible;
    }
  }
`;

// Types for user and cart data 



// Custom SVG Icons
const ShoppingCartIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M7 18c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12L8.1 13h7.45c.75 0 1.41-.41 1.75-1.03L19.7 4H5.21l-.94-2H1z" />
  </svg>
);

const UserIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z" />
  </svg>
);

const BarsIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
  </svg>
);

const TimesIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
  </svg>
);
const HamburgerIcon = ({ className, onClick }: { className?: string; onClick?: () => void }) => (
  <svg className={className} onClick={onClick} viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
    <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
  </svg>
);

const Header: React.FC = () => {
  const [logoutApiCall] = useLogoutMutation();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  let storedUser: StoredUser | null;

  storedUser = parseUserFromStorage();
  useEffect(() => {
    console.log('Stored user:', storedUser);
  }, []);
  const categories = [
    {
      title: "Electronics",
      items: [
        { name: "Smartphones", desc: "Latest mobile devices", icon: "📱", count: 245 },
        { name: "Laptops", desc: "Business & Gaming", icon: "💻", count: 189 },
        { name: "Headphones", desc: "Audio accessories", icon: "🎧", count: 156 },
        { name: "Cameras", desc: "Photography gear", icon: "📷", count: 89 },
        { name: "Smart Watches", desc: "Wearable tech", icon: "⌚", count: 134 }
      ]
    },
    {
      title: "Fashion",
      items: [
        { name: "Men's Clothing", desc: "Shirts, pants, suits", icon: "👔", count: 356 },
        { name: "Women's Clothing", desc: "Dresses, tops, skirts", icon: "👗", count: 498 },
        { name: "Shoes", desc: "Sneakers, boots, heels", icon: "👟", count: 287 },
        { name: "Accessories", desc: "Bags, jewelry, belts", icon: "👜", count: 164 }
      ]
    },
    {
      title: "Gaming",
      items: [
        { name: "Gaming Mice", desc: "High precision gaming", icon: "🖱️", count: 87 },
        { name: "Keyboards", desc: "Mechanical & wireless", icon: "⌨️", count: 69 },
        { name: "Gaming Chairs", desc: "Ergonomic seating", icon: "🪑", count: 43 }
      ]
    }
  ];

  const logoutHandler = async (): Promise<void> => {
    try {
      await logoutApiCall({}).unwrap();

      // Clear localStorage
      localStorage.removeItem('user');
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');

      // Clear local state

      navigate('/login');
      toast.success('Logout successful');
    } catch (error: any) {
      console.error('Logout error:', error);
      // Even if logout API fails, clear local storage
      localStorage.removeItem('user');
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      navigate('/login');
      toast.error(error?.data?.message || error.message || 'Logout failed');
    }
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };



  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  const handleCategoryClick = (category: string) => {
    console.log('Category selected:', category);
    navigate(`/category/${category.toLowerCase().replace(/\s+/g, '-')}`);
  };

  return (
    <HeaderContainer>
      <header className="header">
        <div className="container">
          <Link to="/" className="brand">MERN Shop</Link>
          <button className="logo">
            <HamburgerIcon className="toggle-navhandler" />
            <span className="text-white">Category</span>
            <div className="category-dropdown">
              {categories.map((section) => (
                <div key={section.title} className="dropdown-section">
                  <div className="section-title">{section.title}</div>
                  {section.items.map((item) => (
                    <div
                      key={item.name}
                      className="dropdown-item"
                      onClick={() => handleCategoryClick(item.name)}
                    >
                      <span className="item-icon">{item.icon}</span>
                      <div className="item-details">
                        <div className="item-name">{item.name}</div>
                        <div className="item-desc">{item.desc}</div>
                      </div>
                      <span className="item-count">{item.count}</span>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </button>
          <SearchBox />

          <nav className={`nav-links ${mobileMenuOpen ? 'active' : ''}`}>
            <Link to="/cart" onClick={closeMobileMenu} className="nav-link">
              <ShoppingCartIcon />
              Cart

              <span className="cart-badge">
                3
              </span>

            </Link>

            {storedUser ? (
              <div className="user-dropdown">

                Hello👋 {storedUser.name}

                <div className="dropdown-menu ">
                  <Link to="/profile" onClick={closeMobileMenu}>Profile</Link>
                  <button onClick={logoutHandler}>Logout</button>
                  {(storedUser.role === "admin" || storedUser.isAdmin) && (
                    <>
                      <Link to="/admin/product-list" onClick={closeMobileMenu}>Products</Link>
                      <Link to="/admin/order-list" onClick={closeMobileMenu}>Orders</Link>
                      <Link to="/admin/user-list" onClick={closeMobileMenu}>Users</Link>
                    </>
                  )}
                </div>
              </div>
            ) : (
              <Link to="/login" onClick={closeMobileMenu} className="nav-link">
                <UserIcon />
                Sign In
              </Link>
            )}
          </nav>

          <button className="mobile-toggle" onClick={toggleMobileMenu}>
            {mobileMenuOpen ? <TimesIcon /> : <BarsIcon />}
          </button>
        </div>
      </header>

      <div
        className={`mobile-overlay ${mobileMenuOpen ? 'active' : ''}`}
        onClick={closeMobileMenu}
      />
    </HeaderContainer>
  );
};

export default Header;