import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const ProductsContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
  margin-top: 1rem; /* Account for fixed header */

  .products-header {
    text-align: center;
    margin-bottom: 3rem;
    
    h1 {
      font-size: 2.5rem;
      color: #333;
      margin-bottom: 1rem;
    }
    
    p {
      font-size: 1.1rem;
      color: #666;
    }
  }

  .products-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 2rem;
    margin-bottom: 3rem;
  }

  .product-card {
    background: #fff;
    border-radius: 12px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    transition: all 0.3s ease;
    cursor: pointer;
    
    &:hover {
      transform: translateY(-8px);
      box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
    }

    .product-image {
      width: 100%;
      height: 200px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      overflow: hidden;
      
      &.electronics {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      }
      
      &.fashion {
        background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
      }
      
      &.books {
        background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
      }
      
      &.gaming {
        background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%);
      }

      .product-icon {
        font-size: 4rem;
        color: rgba(255, 255, 255, 0.9);
      }
      
      .sale-badge {
        position: absolute;
        top: 10px;
        right: 10px;
        background: #ff4757;
        color: white;
        padding: 0.3rem 0.8rem;
        border-radius: 15px;
        font-size: 0.8rem;
        font-weight: bold;
      }
    }

    .product-info {
      padding: 1.5rem;
      
      .product-category {
        color: #666;
        font-size: 0.9rem;
        text-transform: uppercase;
        letter-spacing: 1px;
        margin-bottom: 0.5rem;
      }
      
      .product-name {
        font-size: 1.3rem;
        font-weight: bold;
        color: #333;
        margin-bottom: 0.8rem;
        line-height: 1.4;
      }
      
      .product-description {
        color: #666;
        font-size: 0.95rem;
        line-height: 1.5;
        margin-bottom: 1rem;
      }
      
      .product-price {
        display: flex;
        align-items: center;
        gap: 0.8rem;
        margin-bottom: 1.5rem;
        
        .current-price {
          font-size: 1.4rem;
          font-weight: bold;
          color: rgb(204, 48, 48);
        }
        
        .original-price {
          font-size: 1rem;
          color: #999;
          text-decoration: line-through;
        }
      }
      
      .product-rating {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        margin-bottom: 1rem;
        
        .stars {
          color: #ffc107;
          font-size: 1rem;
        }
        
        .rating-text {
          color: #666;
          font-size: 0.9rem;
        }
      }

      .add-to-cart-btn {
        width: 100%;
        background: rgb(204, 48, 48);
        color: white;
        border: none;
        padding: 0.8rem 1.5rem;
        border-radius: 8px;
        font-size: 1rem;
        font-weight: bold;
        cursor: pointer;
        transition: all 0.3s;
        
        &:hover {
          background: rgb(180, 40, 40);
          transform: translateY(-2px);
        }
        
        &:active {
          transform: translateY(0);
        }
      }
    }
  }

  @media screen and (max-width: 768px) {
    padding: 1rem;
    margin-top: 80px;
    
    .products-header h1 {
      font-size: 2rem;
    }
    
    .products-grid {
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 1.5rem;
    }
  }
`;

// Product data
const products = [
    {
        id: 1,
        name: "iPhone 15 Pro Max",
        category: "Electronics",
        description: "Latest iPhone with A17 Pro chip, titanium design, and advanced camera system.",
        currentPrice: 1199,
        originalPrice: 1299,
        rating: 4.8,
        reviews: 1247,
        icon: "📱",
        imageClass: "electronics",
        onSale: true
    },
    {
        id: 2,
        name: "MacBook Pro 16\"",
        category: "Electronics",
        description: "Powerful laptop with M3 Max chip, perfect for professionals and creators.",
        currentPrice: 2499,
        originalPrice: 2699,
        rating: 4.9,
        reviews: 892,
        icon: "💻",
        imageClass: "electronics",
        onSale: true
    },
    {
        id: 3,
        name: "AirPods Pro 2",
        category: "Electronics",
        description: "Active noise cancellation, spatial audio, and all-day battery life.",
        currentPrice: 249,
        originalPrice: 279,
        rating: 4.7,
        reviews: 2156,
        icon: "🎧",
        imageClass: "electronics",
        onSale: false
    },
    {
        id: 4,
        name: "Designer Jacket",
        category: "Fashion",
        description: "Premium quality winter jacket with modern design and comfortable fit.",
        currentPrice: 89,
        originalPrice: 129,
        rating: 4.5,
        reviews: 534,
        icon: "🧥",
        imageClass: "fashion",
        onSale: true
    },
    {
        id: 5,
        name: "Running Sneakers",
        category: "Fashion",
        description: "Comfortable athletic shoes perfect for running and daily activities.",
        currentPrice: 159,
        originalPrice: 199,
        rating: 4.6,
        reviews: 1893,
        icon: "👟",
        imageClass: "fashion",
        onSale: true
    },
    {
        id: 6,
        name: "Programming Book Set",
        category: "Books",
        description: "Complete collection of modern programming languages and frameworks.",
        currentPrice: 79,
        originalPrice: 99,
        rating: 4.8,
        reviews: 756,
        icon: "📚",
        imageClass: "books",
        onSale: false
    },
    {
        id: 7,
        name: "Gaming Mouse",
        category: "Gaming",
        description: "High-precision gaming mouse with RGB lighting and customizable buttons.",
        currentPrice: 69,
        originalPrice: 89,
        rating: 4.7,
        reviews: 1124,
        icon: "🖱️",
        imageClass: "gaming",
        onSale: true
    },
    {
        id: 8,
        name: "Mechanical Keyboard",
        category: "Gaming",
        description: "RGB mechanical keyboard with blue switches for ultimate gaming experience.",
        currentPrice: 129,
        originalPrice: 159,
        rating: 4.9,
        reviews: 987,
        icon: "⌨️",
        imageClass: "gaming",
        onSale: true
    }
];

const ProductList: React.FC = () => {
    const navigate = useNavigate();

    const handleAddToCart = (product: any) => {
        console.log('Added to cart:', product.name);
        alert(`${product.name} added to cart!`);
    };

    const handleProductClick = (productId: number) => {
        navigate(`/product/${productId}`);
    };

    const renderStars = (rating: number) => {
        const stars = [];
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 !== 0;

        for (let i = 0; i < fullStars; i++) {
            stars.push('⭐');
        }
        if (hasHalfStar) {
            stars.push('⭐');
        }

        return stars.join('');
    };

    return (
        <ProductsContainer>
            <div className="products-header">
                <h1>Featured Products</h1>
                <p>Discover our amazing collection of products at unbeatable prices</p>
            </div>

            <div className="products-grid">
                {products.map((product) => (
                    <div key={product.id} className="product-card">
                        <div
                            className={`product-image ${product.imageClass}`}
                            onClick={() => handleProductClick(product.id)}
                            style={{ cursor: 'pointer' }}
                        >
                            <div className="product-icon">{product.icon}</div>
                            {product.onSale && <div className="sale-badge">SALE</div>}
                        </div>

                        <div className="product-info">
                            <div className="product-category">{product.category}</div>
                            <h3
                                className="product-name"
                                onClick={() => handleProductClick(product.id)}
                                style={{ cursor: 'pointer' }}
                            >
                                {product.name}
                            </h3>
                            <p className="product-description">{product.description}</p>

                            <div className="product-rating">
                                <span className="stars">{renderStars(product.rating)}</span>
                                <span className="rating-text">
                                    {product.rating} ({product.reviews} reviews)
                                </span>
                            </div>

                            <div className="product-price">
                                <span className="current-price">${product.currentPrice}</span>
                                {product.onSale && (
                                    <span className="original-price">${product.originalPrice}</span>
                                )}
                            </div>

                            <button
                                className="add-to-cart-btn"
                                onClick={() => handleAddToCart(product)}
                            >
                                Add to Cart
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </ProductsContainer>
    );
};

export default ProductList;
