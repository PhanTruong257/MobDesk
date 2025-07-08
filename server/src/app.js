const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const morgan = require('morgan');
const path = require('path');

// Import routes and middleware
const routes = require('./routes');
const { errorHandler, notFound, generalLimiter } = require('./middleware');

// Create Express app
const app = express();

// Security middleware
app.use(helmet());
app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    credentials: true
}));

// Rate limiting
app.use(generalLimiter);

// Compression middleware
app.use(compression());

// Logging middleware
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
} else {
    app.use(morgan('combined'));
}

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Static files
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// API routes
app.use('/api/v1', routes);

// Health check endpoint
app.get('/', (req, res) => {
    res.json({
        success: true,
        message: 'E-commerce API Server',
        version: '1.0.0',
        endpoints: {
            auth: '/api/v1/auth',
            products: '/api/v1/products',
            categories: '/api/v1/categories',
            brands: '/api/v1/brands',
            cart: '/api/v1/cart',
            orders: '/api/v1/orders',
            reviews: '/api/v1/reviews'
        }
    });
});

// 404 handler
app.use(notFound);

// Error handling middleware (must be last)
app.use(errorHandler);

module.exports = app;
