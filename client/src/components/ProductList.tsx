import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ProductList.css';

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
    <div className="products-container">
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
    </div>
  );
};

export default ProductList;
