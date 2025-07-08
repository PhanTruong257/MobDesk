import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

// All-in-one Styled Component
const FooterContainer = styled.footer`
  background: rgb(30, 30, 30);
  color: #fff;
  padding: 3rem 0 1rem;
  margin-top: auto;

  .footer-content {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 1rem;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 2rem;
  }

  .footer-section {
    h3 {
      color: #fff;
      margin-bottom: 1rem;
      font-size: 1.2rem;
      font-weight: bold;
    }

    ul {
      list-style: none;
      padding: 0;
      
      li {
        margin-bottom: 0.5rem;
        
        a {
          color: #ccc;
          text-decoration: none;
          transition: color 0.3s;
          
          &:hover {
            color: #3EA6FF;
          }
        }
      }
    }

    p {
      color: #ccc;
      line-height: 1.6;
      margin-bottom: 1rem;
    }
  }

  .social-links {
    display: flex;
    gap: 1rem;
    margin-top: 1rem;
    
    a {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 40px;
      height: 40px;
      background: rgba(255, 255, 255, 0.1);
      border-radius: 50%;
      color: #fff;
      text-decoration: none;
      transition: all 0.3s;
      
      &:hover {
        background: #3EA6FF;
        transform: translateY(-2px);
      }
      
      svg {
        width: 20px;
        height: 20px;
      }
    }
  }

  .footer-bottom {
    border-top: 1px solid rgba(255, 255, 255, 0.1);
    margin-top: 2rem;
    padding-top: 1rem;
    text-align: center;
    color: #888;
    max-width: 1200px;
    margin-left: auto;
    margin-right: auto;
    padding-left: 1rem;
    padding-right: 1rem;
  }

  @media screen and (max-width: 768px) {
    .footer-content {
      grid-template-columns: 1fr;
      text-align: center;
    }
    
    .social-links {
      justify-content: center;
    }
  }
`;

// Social Media Icons
const FacebookIcon = () => (
    <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
);

const TwitterIcon = () => (
    <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
    </svg>
);

const InstagramIcon = () => (
    <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
);

const Footer: React.FC = () => {
    return (
        <FooterContainer>
            <div className="footer-content">
                <div className="footer-section">
                    <h3>About MERN Shop</h3>
                    <p>
                        Your one-stop destination for the latest electronics, fashion, and lifestyle products.
                        We offer quality products at competitive prices with excellent customer service.
                    </p>
                    <div className="social-links">
                        <a href="#" aria-label="Facebook">
                            <FacebookIcon />
                        </a>
                        <a href="#" aria-label="Twitter">
                            <TwitterIcon />
                        </a>
                        <a href="#" aria-label="Instagram">
                            <InstagramIcon />
                        </a>
                    </div>
                </div>

                <div className="footer-section">
                    <h3>Quick Links</h3>
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/products">Products</Link></li>
                        <li><Link to="/about">About Us</Link></li>
                        <li><Link to="/contact">Contact</Link></li>
                        <li><Link to="/cart">Shopping Cart</Link></li>
                    </ul>
                </div>

                <div className="footer-section">
                    <h3>Categories</h3>
                    <ul>
                        <li><Link to="/category/electronics">Electronics</Link></li>
                        <li><Link to="/category/phones">Phones</Link></li>
                        <li><Link to="/category/laptops">Laptops</Link></li>
                        <li><Link to="/category/fashion">Fashion</Link></li>
                        <li><Link to="/category/books">Books</Link></li>
                    </ul>
                </div>

                <div className="footer-section">
                    <h3>Customer Service</h3>
                    <ul>
                        <li><Link to="/help">Help Center</Link></li>
                        <li><Link to="/shipping">Shipping Info</Link></li>
                        <li><Link to="/returns">Returns</Link></li>
                        <li><Link to="/privacy">Privacy Policy</Link></li>
                        <li><Link to="/terms">Terms of Service</Link></li>
                    </ul>
                </div>
            </div>

            <div className="footer-bottom">
                <p>&copy; 2025 MERN Shop. All rights reserved. Made with ❤️ by Your Team</p>
            </div>
        </FooterContainer>
    );
};

export default Footer;
