import React, { useState } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";

const ProductContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  min-height: 100vh;
`;

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  margin-bottom: 3rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

const ImageSection = styled.div`
  .main-image {
    width: 100%;
    height: 500px;
    object-fit: cover;
    border-radius: 15px;
    margin-bottom: 1rem;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  }
  
  .thumbnail-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 0.5rem;
    
    img {
      width: 100%;
      height: 80px;
      object-fit: cover;
      border-radius: 8px;
      cursor: pointer;
      border: 2px solid transparent;
      transition: border-color 0.3s;
      
      &:hover, &.active {
        border-color: #667eea;
      }
    }
  }
`;

const ProductInfo = styled.div`
  .breadcrumb {
    color: #666;
    margin-bottom: 1rem;
    font-size: 0.9rem;
    
    a {
      color: #667eea;
      text-decoration: none;
      
      &:hover {
        text-decoration: underline;
      }
    }
  }
  
  .product-title {
    font-size: 2.5rem;
    font-weight: bold;
    color: #333;
    margin-bottom: 1rem;
    line-height: 1.2;
  }
  
  .rating-section {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 1.5rem;
    
    .stars {
      color: #ffd700;
      font-size: 1.2rem;
    }
    
    .rating-text {
      color: #666;
    }
  }
  
  .price-section {
    margin-bottom: 2rem;
    
    .current-price {
      font-size: 2rem;
      font-weight: bold;
      color: #667eea;
    }
    
    .original-price {
      font-size: 1.2rem;
      color: #999;
      text-decoration: line-through;
      margin-left: 1rem;
    }
    
    .discount {
      background: #e8f5e8;
      color: #2e7d2e;
      padding: 0.25rem 0.75rem;
      border-radius: 20px;
      font-size: 0.8rem;
      font-weight: 600;
      margin-left: 1rem;
    }
  }
  
  .description {
    color: #666;
    line-height: 1.6;
    margin-bottom: 2rem;
  }
`;

const OptionsSection = styled.div`
  margin-bottom: 2rem;
  
  .option-group {
    margin-bottom: 1.5rem;
    
    label {
      display: block;
      margin-bottom: 0.5rem;
      font-weight: 600;
      color: #333;
    }
    
    .color-options {
      display: flex;
      gap: 0.5rem;
      
      .color-option {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        cursor: pointer;
        border: 3px solid transparent;
        transition: border-color 0.3s;
        
        &.active {
          border-color: #667eea;
        }
      }
    }
    
    .size-options {
      display: flex;
      gap: 0.5rem;
      
      .size-option {
        padding: 0.5rem 1rem;
        border: 2px solid #e1e5e9;
        border-radius: 8px;
        cursor: pointer;
        transition: all 0.3s;
        background: white;
        
        &:hover, &.active {
          border-color: #667eea;
          background: #667eea;
          color: white;
        }
      }
    }
  }
  
  .quantity-section {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 1.5rem;
    
    label {
      font-weight: 600;
      color: #333;
    }
    
    .quantity-controls {
      display: flex;
      align-items: center;
      border: 2px solid #e1e5e9;
      border-radius: 8px;
      
      button {
        background: none;
        border: none;
        padding: 0.5rem 1rem;
        cursor: pointer;
        font-size: 1.2rem;
        color: #667eea;
        
        &:hover {
          background: #f8f9fa;
        }
      }
      
      input {
        border: none;
        width: 60px;
        text-align: center;
        padding: 0.5rem;
        font-size: 1rem;
        
        &:focus {
          outline: none;
        }
      }
    }
  }
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
  
  .add-to-cart {
    flex: 1;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    border: none;
    padding: 1rem 2rem;
    border-radius: 10px;
    font-size: 1.1rem;
    font-weight: 600;
    cursor: pointer;
    transition: transform 0.2s;
    
    &:hover {
      transform: translateY(-2px);
    }
  }
  
  .buy-now {
    flex: 1;
    background: #28a745;
    color: white;
    border: none;
    padding: 1rem 2rem;
    border-radius: 10px;
    font-size: 1.1rem;
    font-weight: 600;
    cursor: pointer;
    transition: transform 0.2s;
    
    &:hover {
      transform: translateY(-2px);
    }
  }
  
  .wishlist {
    background: white;
    border: 2px solid #e1e5e9;
    padding: 1rem;
    border-radius: 10px;
    cursor: pointer;
    transition: all 0.3s;
    
    &:hover {
      border-color: #667eea;
      color: #667eea;
    }
  }
`;

const FeatureList = styled.ul`
  list-style: none;
  padding: 0;
  margin-bottom: 2rem;
  
  li {
    padding: 0.5rem 0;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    color: #666;
    
    &::before {
      content: "✓";
      color: #28a745;
      font-weight: bold;
    }
  }
`;

const TabSection = styled.div`
  .tab-nav {
    display: flex;
    border-bottom: 1px solid #e1e5e9;
    margin-bottom: 2rem;
    
    button {
      background: none;
      border: none;
      padding: 1rem 2rem;
      cursor: pointer;
      font-weight: 600;
      color: #666;
      border-bottom: 2px solid transparent;
      transition: all 0.3s;
      
      &.active {
        color: #667eea;
        border-bottom-color: #667eea;
      }
      
      &:hover {
        color: #667eea;
      }
    }
  }
  
  .tab-content {
    background: white;
    border-radius: 15px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
    padding: 2rem;
  }
`;

const ReviewCard = styled.div`
  border-bottom: 1px solid #e1e5e9;
  padding: 1.5rem 0;
  
  &:last-child {
    border-bottom: none;
  }
  
  .review-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
    
    .reviewer-info {
      display: flex;
      align-items: center;
      gap: 1rem;
      
      .avatar {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        background: #667eea;
        color: white;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: bold;
      }
      
      .name {
        font-weight: 600;
        color: #333;
      }
    }
    
    .review-rating {
      color: #ffd700;
    }
  }
  
  .review-text {
    color: #666;
    line-height: 1.6;
  }
`;

const ProductDetails: React.FC = () => {
    const { id } = useParams();
    const [selectedImage, setSelectedImage] = useState(0);
    const [selectedColor, setSelectedColor] = useState("blue");
    const [selectedSize, setSelectedSize] = useState("M");
    const [quantity, setQuantity] = useState(1);
    const [activeTab, setActiveTab] = useState("description");

    // Mock product data - in real app, this would come from API
    const product = {
        id: parseInt(id || "1"),
        name: "Premium Wireless Headphones",
        price: 299,
        originalPrice: 399,
        discount: 25,
        rating: 4.8,
        reviewCount: 156,
        description: "Experience premium sound quality with these wireless headphones featuring active noise cancellation, 30-hour battery life, and premium comfort design.",
        images: [
            "/api/placeholder/500/500",
            "/api/placeholder/500/500",
            "/api/placeholder/500/500",
            "/api/placeholder/500/500"
        ],
        colors: [
            { name: "Blue", value: "#667eea" },
            { name: "Black", value: "#333" },
            { name: "White", value: "#fff" },
            { name: "Red", value: "#dc3545" }
        ],
        sizes: ["S", "M", "L", "XL"],
        features: [
            "Active Noise Cancellation",
            "30-hour battery life",
            "Quick charge (15 min = 3 hours)",
            "Premium leather headband",
            "Wireless & wired connectivity",
            "Built-in microphone"
        ],
        specifications: {
            "Driver Size": "40mm",
            "Frequency Response": "20Hz - 20kHz",
            "Impedance": "32 ohms",
            "Battery Life": "30 hours",
            "Charging Time": "2 hours",
            "Weight": "250g"
        },
        reviews: [
            {
                name: "John Doe",
                rating: 5,
                text: "Amazing sound quality and comfort. The noise cancellation works perfectly for my daily commute."
            },
            {
                name: "Jane Smith",
                rating: 4,
                text: "Great headphones overall. Battery life is excellent, though I wish they were a bit lighter."
            },
            {
                name: "Mike Johnson",
                rating: 5,
                text: "Best headphones I've ever owned. Worth every penny for the premium experience."
            }
        ]
    };

    const handleQuantityChange = (delta: number) => {
        setQuantity(Math.max(1, quantity + delta));
    };

    const renderTabContent = () => {
        switch (activeTab) {
            case "description":
                return (
                    <div>
                        <h4>Product Description</h4>
                        <p>{product.description}</p>
                        <h4>Key Features</h4>
                        <FeatureList>
                            {product.features.map((feature, index) => (
                                <li key={index}>{feature}</li>
                            ))}
                        </FeatureList>
                    </div>
                );

            case "specifications":
                return (
                    <div>
                        <h4>Technical Specifications</h4>
                        <table style={{ width: "100%", borderCollapse: "collapse" }}>
                            <tbody>
                                {Object.entries(product.specifications).map(([key, value]) => (
                                    <tr key={key} style={{ borderBottom: "1px solid #e1e5e9" }}>
                                        <td style={{ padding: "1rem", fontWeight: "600", color: "#333" }}>{key}</td>
                                        <td style={{ padding: "1rem", color: "#666" }}>{value}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                );

            case "reviews":
                return (
                    <div>
                        <h4>Customer Reviews ({product.reviewCount})</h4>
                        {product.reviews.map((review, index) => (
                            <ReviewCard key={index}>
                                <div className="review-header">
                                    <div className="reviewer-info">
                                        <div className="avatar">{review.name.charAt(0)}</div>
                                        <div className="name">{review.name}</div>
                                    </div>
                                    <div className="review-rating">
                                        {"★".repeat(review.rating)}{"☆".repeat(5 - review.rating)}
                                    </div>
                                </div>
                                <div className="review-text">{review.text}</div>
                            </ReviewCard>
                        ))}
                    </div>
                );

            default:
                return null;
        }
    };

    return (
        <ProductContainer>
            <ProductGrid>
                <ImageSection>
                    <img
                        src={product.images[selectedImage]}
                        alt={product.name}
                        className="main-image"
                    />
                    <div className="thumbnail-grid">
                        {product.images.map((image, index) => (
                            <img
                                key={index}
                                src={image}
                                alt={`${product.name} ${index + 1}`}
                                className={selectedImage === index ? "active" : ""}
                                onClick={() => setSelectedImage(index)}
                            />
                        ))}
                    </div>
                </ImageSection>

                <ProductInfo>
                    <div className="breadcrumb">
                        <a href="/">Home</a> / <a href="/products">Products</a> / {product.name}
                    </div>

                    <h1 className="product-title">{product.name}</h1>

                    <div className="rating-section">
                        <div className="stars">
                            {"★".repeat(Math.floor(product.rating))}{"☆".repeat(5 - Math.floor(product.rating))}
                        </div>
                        <div className="rating-text">
                            {product.rating} ({product.reviewCount} reviews)
                        </div>
                    </div>

                    <div className="price-section">
                        <span className="current-price">${product.price}</span>
                        <span className="original-price">${product.originalPrice}</span>
                        <span className="discount">{product.discount}% OFF</span>
                    </div>

                    <p className="description">{product.description}</p>

                    <OptionsSection>
                        <div className="option-group">
                            <label>Color:</label>
                            <div className="color-options">
                                {product.colors.map((color) => (
                                    <div
                                        key={color.name}
                                        className={`color-option ${selectedColor === color.name.toLowerCase() ? "active" : ""}`}
                                        style={{ backgroundColor: color.value }}
                                        onClick={() => setSelectedColor(color.name.toLowerCase())}
                                        title={color.name}
                                    />
                                ))}
                            </div>
                        </div>

                        <div className="option-group">
                            <label>Size:</label>
                            <div className="size-options">
                                {product.sizes.map((size) => (
                                    <div
                                        key={size}
                                        className={`size-option ${selectedSize === size ? "active" : ""}`}
                                        onClick={() => setSelectedSize(size)}
                                    >
                                        {size}
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="quantity-section">
                            <label>Quantity:</label>
                            <div className="quantity-controls">
                                <button onClick={() => handleQuantityChange(-1)}>-</button>
                                <input type="number" value={quantity} readOnly />
                                <button onClick={() => handleQuantityChange(1)}>+</button>
                            </div>
                        </div>
                    </OptionsSection>

                    <ActionButtons>
                        <button className="add-to-cart">Add to Cart</button>
                        <button className="buy-now">Buy Now</button>
                        <button className="wishlist">♡</button>
                    </ActionButtons>
                </ProductInfo>
            </ProductGrid>

            <TabSection>
                <div className="tab-nav">
                    <button
                        className={activeTab === "description" ? "active" : ""}
                        onClick={() => setActiveTab("description")}
                    >
                        Description
                    </button>
                    <button
                        className={activeTab === "specifications" ? "active" : ""}
                        onClick={() => setActiveTab("specifications")}
                    >
                        Specifications
                    </button>
                    <button
                        className={activeTab === "reviews" ? "active" : ""}
                        onClick={() => setActiveTab("reviews")}
                    >
                        Reviews
                    </button>
                </div>

                <div className="tab-content">
                    {renderTabContent()}
                </div>
            </TabSection>
        </ProductContainer>
    );
};

export default ProductDetails;
