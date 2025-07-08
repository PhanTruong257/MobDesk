// Validation middleware for common operations

const validateRegistration = (req, res, next) => {
    const { name, email, password } = req.body;
    const errors = [];

    // Name validation
    if (!name || name.trim().length < 2) {
        errors.push('Name must be at least 2 characters long');
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
        errors.push('Valid email is required');
    }

    // Password validation
    if (!password || password.length < 6) {
        errors.push('Password must be at least 6 characters long');
    }

    if (errors.length > 0) {
        return res.status(400).json({
            success: false,
            message: 'Validation failed',
            errors
        });
    }

    next();
};

const validateLogin = (req, res, next) => {
    const { email, password } = req.body;
    const errors = [];

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
        errors.push('Valid email is required');
    }

    // Password validation
    if (!password || password.trim().length === 0) {
        errors.push('Password is required');
    }

    if (errors.length > 0) {
        return res.status(400).json({
            success: false,
            message: 'Validation failed',
            errors
        });
    }

    next();
};

const validateProduct = (req, res, next) => {
    const { name, price } = req.body;
    const errors = [];

    // Name validation
    if (!name || name.trim().length < 2) {
        errors.push('Product name must be at least 2 characters long');
    }

    // Price validation
    if (!price || isNaN(price) || price <= 0) {
        errors.push('Valid price greater than 0 is required');
    }

    if (errors.length > 0) {
        return res.status(400).json({
            success: false,
            message: 'Validation failed',
            errors
        });
    }

    next();
};

const validateCategory = (req, res, next) => {
    const { name } = req.body;

    if (!name || name.trim().length < 2) {
        return res.status(400).json({
            success: false,
            message: 'Category name must be at least 2 characters long'
        });
    }

    next();
};

const validateBrand = (req, res, next) => {
    const { name } = req.body;

    if (!name || name.trim().length < 2) {
        return res.status(400).json({
            success: false,
            message: 'Brand name must be at least 2 characters long'
        });
    }

    next();
};

const validateReview = (req, res, next) => {
    const { product_id, rating } = req.body;
    const errors = [];

    // Product ID validation
    if (!product_id || isNaN(product_id)) {
        errors.push('Valid product ID is required');
    }

    // Rating validation
    if (!rating || isNaN(rating) || rating < 1 || rating > 5) {
        errors.push('Rating must be a number between 1 and 5');
    }

    if (errors.length > 0) {
        return res.status(400).json({
            success: false,
            message: 'Validation failed',
            errors
        });
    }

    next();
};

const validatePagination = (req, res, next) => {
    const { page, limit } = req.query;

    if (page && (isNaN(page) || page < 1)) {
        return res.status(400).json({
            success: false,
            message: 'Page must be a positive number'
        });
    }

    if (limit && (isNaN(limit) || limit < 1 || limit > 100)) {
        return res.status(400).json({
            success: false,
            message: 'Limit must be a number between 1 and 100'
        });
    }

    next();
};

module.exports = {
    validateRegistration,
    validateLogin,
    validateProduct,
    validateCategory,
    validateBrand,
    validateReview,
    validatePagination
};
