import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import styled from 'styled-components';
import { toast } from 'react-toastify';
import SearchBox from './SearchBox';

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
  }
  .nav-link:hover {
    background: #303030;
    color: #3EA6FF;
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
    position: relative;
  }
  .dropdown-toggle {
    background: transparent;
    border: none;
    color: #fff;
    padding: 0.5rem 1rem;
    border-radius: 8px;
    cursor: pointer;
    transition: background 0.3s;
  }
  .dropdown-toggle:hover {
    background: #303030;
  }
  .dropdown-menu {
    position: absolute;
    top: 100%;
    right: 0;
    background: #1a1a1a;
    border: 1px solid #303030;
    border-radius: 8px;
    min-width: 150px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
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
  }
  .dropdown-menu a:hover, .dropdown-menu button:hover {
    background: #303030;
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
    .nav-links {
      position: fixed;
      top: 0;
      right: -100%;
      width: 300px;
      height: 100vh;
      background: #1a1a1a;
      flex-direction: column;
      justify-content: flex-start;
      padding: 5rem 2rem 2rem;
      transition: right 0.3s;
    }
    .nav-links.active {
      right: 0;
    }
    .mobile-toggle {
      display: block;
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
        .logo {
   flex: 1; 
    display: flex;
    align-items: center;
    flex-shrink: 0;
    gap: 1rem;
  }
  }
`;

// Types for fake data
interface CartItem {
    id: string;
    name: string;
    price: number;
    qty: number;
    image: string;
}

interface UserInfo {
    id: string;
    name: string;
    email: string;
    isAdmin: boolean;
}

interface AppState {
    cart: {
        cartItems: CartItem[];
    };
    auth: {
        userInfo: UserInfo | null;
    };
}

// Mock Redux hooks with fake data
const useSelector = (selector: (state: AppState) => any) => {
    const fakeState: AppState = {
        cart: {
            cartItems: [
                { id: '1', name: 'iPhone 15', price: 999, qty: 2, image: 'iphone.jpg' },
                { id: '2', name: 'MacBook Pro', price: 1999, qty: 1, image: 'macbook.jpg' },
            ]
        },
        auth: {
            userInfo: {
                id: '1',
                name: 'John Doe',
                email: 'john@example.com',
                isAdmin: false
            }
        }
    };
    return selector(fakeState);
};

const useDispatch = () => {
    return (action: any) => {
        console.log('Dispatching action:', action);
    };
};

// Mock API hook
const useLogoutMutation = () => {
    const logoutApiCall = async () => {
        return new Promise((resolve) => {
            setTimeout(() => {
                console.log('Logout API call successful');
                resolve({ success: true });
            }, 1000);
        });
    };

    return [logoutApiCall];
};

// Mock actions
const logout = () => ({
    type: 'auth/logout',
    payload: null
});

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
    const { cartItems } = useSelector((state: AppState) => state.cart);
    const { userInfo } = useSelector((state: AppState) => state.auth);
    const [logoutApiCall] = useLogoutMutation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
    const [userDropdownOpen, setUserDropdownOpen] = React.useState(false);

    const logoutHandler = async (): Promise<void> => {
        try {
            await logoutApiCall();
            dispatch(logout());
            navigate('/login');
            toast.success('Logout successful');
            setUserDropdownOpen(false);
        } catch (error: any) {
            toast.error(error?.data?.message || error.error || 'Logout failed');
        }
    };

    const toggleMobileMenu = () => {
        setMobileMenuOpen(!mobileMenuOpen);
    };

    const toggleUserDropdown = () => {
        setUserDropdownOpen(!userDropdownOpen);
    };

    const closeMobileMenu = () => {
        setMobileMenuOpen(false);
    };

    return (
        <HeaderContainer>
            <header className="header">
                <div className="container">
                    <Link to="/" className="brand">MERN Shop</Link>
                    <div className="logo">
                        <HamburgerIcon className="toggle-navhandler" />
                    </div>
                    <SearchBox />

                    <nav className={`nav-links ${mobileMenuOpen ? 'active' : ''}`}>
                        <Link to="/cart" onClick={closeMobileMenu} className="nav-link">
                            <ShoppingCartIcon />
                            Cart
                            {cartItems.length > 0 && (
                                <span className="cart-badge">
                                    {cartItems.reduce((acc: number, item: CartItem) => acc + item.qty, 0)}
                                </span>
                            )}
                        </Link>

                        {userInfo ? (
                            <div className="user-dropdown">
                                <button
                                    className="dropdown-toggle"
                                    onClick={toggleUserDropdown}
                                >
                                    Hello👋, {userInfo.name}
                                </button>
                                <div className={`dropdown-menu ${userDropdownOpen ? 'show' : ''}`}>
                                    <Link to="/profile" onClick={closeMobileMenu}>Profile</Link>
                                    <button onClick={logoutHandler}>Logout</button>
                                    {userInfo.isAdmin && (
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