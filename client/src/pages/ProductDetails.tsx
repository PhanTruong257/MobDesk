import React, { useState } from "react";
import { useParams } from "react-router-dom";
import './ProductDetails.css';

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
            <ul className="feature-list">
              {product.features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
          </div>
        );

      case "specifications":
        return (
          <div>
            <h4>Technical Specifications</h4>
            <table className="specifications-table">
              <tbody>
                {Object.entries(product.specifications).map(([key, value]) => (
                  <tr key={key}>
                    <td className="specification-key">{key}</td>
                    <td className="specification-value">{value}</td>
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
              <div key={index} className="review-card">
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
              </div>
            ))}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="product-container">
      <div className="product-grid">
        <div className="image-section">
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
        </div>

        <div className="product-info">
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

          <div className="options-section">
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
          </div>

          <div className="action-buttons">
            <button className="add-to-cart">Add to Cart</button>
            <button className="buy-now">Buy Now</button>
            <button className="wishlist">♡</button>
          </div>
        </div>
      </div>

      <div className="tab-section">
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
      </div>
    </div>
  );
};

export default ProductDetails;
