require('dotenv').config();
const app = require('./src/app');
const sequelize = require('./src/config/database');

const PORT = process.env.PORT || 5000;

// Database connection and server startup
const startServer = async () => {
    try {
        // Test database connection
        await sequelize.authenticate();
        console.log('✅ Database connection established successfully');

        // Sync database (use { force: true } only in development to reset DB)
        if (process.env.NODE_ENV === 'development') {
            await sequelize.sync({ alter: true });
            console.log('✅ Database synchronized');
        }

        // Start server
        app.listen(PORT, () => {
            console.log(`🚀 Server running on port ${PORT}`);
            console.log(`📖 API Documentation: http://localhost:${PORT}`);
            console.log(`🔗 Health Check: http://localhost:${PORT}/api/v1/health`);

            if (process.env.NODE_ENV === 'development') {
                console.log('\n📋 Available Endpoints:');
                console.log('  Auth:       POST /api/v1/auth/register, /api/v1/auth/login');
                console.log('  Products:   GET  /api/v1/products');
                console.log('  Categories: GET  /api/v1/categories');
                console.log('  Brands:     GET  /api/v1/brands');
                console.log('  Cart:       GET  /api/v1/cart (auth required)');
                console.log('  Orders:     GET  /api/v1/orders (auth required)');
                console.log('  Reviews:    GET  /api/v1/reviews');
            }
        });
    } catch (error) {
        console.error('❌ Unable to start server:', error);
        process.exit(1);
    }
};

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
    console.error('❌ Unhandled Promise Rejection:', err);
    process.exit(1);
});

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
    console.error('❌ Uncaught Exception:', err);
    process.exit(1);
});

// Graceful shutdown
process.on('SIGTERM', async () => {
    console.log('🔄 SIGTERM received, shutting down gracefully...');
    await sequelize.close();
    process.exit(0);
});

process.on('SIGINT', async () => {
    console.log('🔄 SIGINT received, shutting down gracefully...');
    await sequelize.close();
    process.exit(0);
});

// Start the server
startServer();
