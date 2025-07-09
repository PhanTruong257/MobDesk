export const BASE_URL = process.env.NODE_ENV === 'development' 
  ? 'http://localhost:5000' 
  : '';

export const USERS_URL = '/api/v1/auth';
export const PRODUCTS_URL = '/api/v1/products';
export const CATEGORIES_URL = '/api/v1/categories';
export const BRANDS_URL = '/api/v1/brands';
export const ORDERS_URL = '/api/v1/orders';
export const CART_URL = '/api/v1/cart';
export const REVIEWS_URL = '/api/v1/reviews';
export const UPLOAD_URL = '/api/v1/upload';