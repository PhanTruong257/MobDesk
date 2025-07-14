import React, { useState } from "react";
import './Cart.css';

// Icons
const TrashIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
  </svg>
);

const ShieldIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M12,1L3,5V11C3,16.55 6.84,21.74 12,23C17.16,21.74 21,16.55 21,11V5L12,1M12,7C13.4,7 14.8,8.6 14.8,10V11H15.5C16.4,11 17,11.4 17,12V16C17,16.6 16.6,17 16,17H8C7.4,17 7,16.6 7,16V12C7,11.4 7.4,11 8,11H8.5V10C8.5,8.6 9.9,7 12,7M12,8.2C10.2,8.2 9.2,9.2 9.2,10V11H14.8V10C14.8,9.2 13.8,8.2 12,8.2Z" />
  </svg>
);

const CartIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M7 18c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12L8.1 13h7.45c.75 0 1.41-.41 1.75-1.03L21.7 4H5.21l-.94-2H1zm16 16c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
  </svg>
);

interface CartItem {
  id: number;
  name: string;
  brand: string;
  price: number;
  originalPrice?: number;
  image: string;
  quantity: number;
  specs: string;
}

const Cart: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: 1,
      name: "iPhone 15 Pro Max",
      brand: "Apple",
      price: 1199,
      originalPrice: 1299,
      image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400",
      quantity: 1,
      specs: "256GB, Natural Titanium"
    },
    {
      id: 2,
      name: "MacBook Air M2",
      brand: "Apple",
      price: 1099,
      image: "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=400",
      quantity: 1,
      specs: "13-inch, 8GB RAM, 256GB SSD"
    },
    {
      id: 3,
      name: "AirPods Pro 2nd Gen",
      brand: "Apple",
      price: 249,
      image: "https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=400",
      quantity: 2,
      specs: "USB-C, Active Noise Cancellation"
    }
  ]);

  const [promoCode, setPromoCode] = useState("");

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeItem(id);
      return;
    }

    setCartItems(items =>
      items.map(item =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeItem = (id: number) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = subtotal > 100 ? 0 : 9.99;
  const tax = subtotal * 0.08;
  const discount = promoCode === "SAVE10" ? subtotal * 0.1 : 0;
  const total = subtotal + shipping + tax - discount;

  const handleCheckout = () => {
    if (cartItems.length > 0) {
      alert("Proceeding to checkout...");
    }
  };

  const applyPromoCode = () => {
    if (promoCode === "SAVE10") {
      alert("Promo code applied! 10% discount");
    } else {
      alert("Invalid promo code");
    }
  };

  return (
    <div className="cart-wrapper">
      <div className="cart-header">
        <h1>Shopping Cart</h1>
        <span className="cart-count">{cartItems.length} items</span>
      </div>

      <div className="cart-content">
        <div className="cart-items">
          {cartItems.length === 0 ? (
            <div className="empty-cart">
              <div className="empty-icon">
                <CartIcon />
              </div>
              <h3>Your cart is empty</h3>
              <p>Add some products to get started!</p>
              <button onClick={() => window.history.back()}>
                Continue Shopping
              </button>
            </div>
          ) : (
            cartItems.map(item => (
              <div key={item.id} className="cart-item">
                <img src={item.image} alt={item.name} className="item-image" />

                <div className="item-info">
                  <h3>{item.name}</h3>
                  <div className="item-brand">{item.brand}</div>
                  <div className="item-specs">{item.specs}</div>

                  <div className="mobile-controls">
                    <div className="quantity-controls">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                      >
                        -
                      </button>
                      <span className="quantity">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        +
                      </button>
                    </div>
                    <div className="item-price">${item.price}</div>
                    <button
                      className="remove-btn"
                      onClick={() => removeItem(item.id)}
                    >
                      <TrashIcon />
                    </button>
                  </div>
                </div>

                <div className="quantity-controls">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    disabled={item.quantity <= 1}
                  >
                    -
                  </button>
                  <span className="quantity">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  >
                    +
                  </button>
                </div>

                <div className="item-price">${item.price}</div>

                <button
                  className="remove-btn"
                  onClick={() => removeItem(item.id)}
                >
                  <TrashIcon />
                </button>
              </div>
            ))
          )}
        </div>

        {cartItems.length > 0 && (
          <div className="cart-summary">
            <h3>Order Summary</h3>

            <div className="summary-row">
              <span>Subtotal:</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>

            <div className="summary-row">
              <span>Shipping:</span>
              <span>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
            </div>

            <div className="summary-row">
              <span>Tax:</span>
              <span>${tax.toFixed(2)}</span>
            </div>

            {discount > 0 && (
              <div className="summary-row">
                <span>Discount:</span>
                <span>-${discount.toFixed(2)}</span>
              </div>
            )}

            <div className="promo-code">
              <input
                type="text"
                placeholder="Enter promo code"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
              />
              <button onClick={applyPromoCode}>Apply Code</button>
            </div>

            <div className="summary-row total">
              <span>Total:</span>
              <span>${total.toFixed(2)}</span>
            </div>

            <button
              className="checkout-btn"
              onClick={handleCheckout}
              disabled={cartItems.length === 0}
            >
              Proceed to Checkout
            </button>

            <div className="secure-checkout">
              <ShieldIcon />
              Secure Checkout
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
