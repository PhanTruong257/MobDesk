const User = require('./User');
const Category = require('./Category');
const Brand = require('./Brand');
const Product = require('./Product');
const ProductSpec = require('./ProductSpec');
const Order = require('./Order');
const OrderItem = require('./OrderItem');
const Payment = require('./Payment');
const Review = require('./Review');
const Cart = require('./Cart');
const CartItem = require('./CartItem');

// Define associations/relationships

// User relationships
User.hasMany(Order, { foreignKey: 'user_id', as: 'orders' });
User.hasMany(Review, { foreignKey: 'user_id', as: 'reviews' });
User.hasOne(Cart, { foreignKey: 'user_id', as: 'cart' });

// Category relationships
Category.hasMany(Product, { foreignKey: 'category_id', as: 'products' });

// Brand relationships
Brand.hasMany(Product, { foreignKey: 'brand_id', as: 'products' });

// Product relationships
Product.belongsTo(Category, { foreignKey: 'category_id', as: 'category' });
Product.belongsTo(Brand, { foreignKey: 'brand_id', as: 'brand' });
Product.hasMany(ProductSpec, { foreignKey: 'product_id', as: 'specs' });
Product.hasMany(Review, { foreignKey: 'product_id', as: 'reviews' });
Product.hasMany(OrderItem, { foreignKey: 'product_id', as: 'orderItems' });
Product.hasMany(CartItem, { foreignKey: 'product_id', as: 'cartItems' });

// ProductSpec relationships
ProductSpec.belongsTo(Product, { foreignKey: 'product_id', as: 'product' });

// Order relationships
Order.belongsTo(User, { foreignKey: 'user_id', as: 'user' });
Order.hasMany(OrderItem, { foreignKey: 'order_id', as: 'items' });
Order.hasOne(Payment, { foreignKey: 'order_id', as: 'payment' });

// OrderItem relationships
OrderItem.belongsTo(Order, { foreignKey: 'order_id', as: 'order' });
OrderItem.belongsTo(Product, { foreignKey: 'product_id', as: 'product' });

// Payment relationships
Payment.belongsTo(Order, { foreignKey: 'order_id', as: 'order' });

// Review relationships
Review.belongsTo(User, { foreignKey: 'user_id', as: 'user' });
Review.belongsTo(Product, { foreignKey: 'product_id', as: 'product' });

// Cart relationships
Cart.belongsTo(User, { foreignKey: 'user_id', as: 'user' });
Cart.hasMany(CartItem, { foreignKey: 'cart_id', as: 'items' });

// CartItem relationships
CartItem.belongsTo(Cart, { foreignKey: 'cart_id', as: 'cart' });
CartItem.belongsTo(Product, { foreignKey: 'product_id', as: 'product' });

module.exports = {
    User,
    Category,
    Brand,
    Product,
    ProductSpec,
    Order,
    OrderItem,
    Payment,
    Review,
    Cart,
    CartItem
};
