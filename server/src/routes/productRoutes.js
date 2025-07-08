const express = require('express');
const { ProductController } = require('../controllers');
const { authenticateToken, requireAdmin, validateProduct, validatePagination, asyncHandler } = require('../middleware');

const router = express.Router();

// Public routes
router.get('/', validatePagination, asyncHandler(ProductController.getAllProducts));
router.get('/search', validatePagination, asyncHandler(ProductController.searchProducts));
router.get('/featured', asyncHandler(ProductController.getFeaturedProducts));
router.get('/:id', asyncHandler(ProductController.getProductById));

// Admin routes
router.post('/', authenticateToken, requireAdmin, validateProduct, asyncHandler(ProductController.createProduct));
router.put('/:id', authenticateToken, requireAdmin, asyncHandler(ProductController.updateProduct));
router.put('/:id/stock', authenticateToken, requireAdmin, asyncHandler(ProductController.updateStock));
router.delete('/:id', authenticateToken, requireAdmin, asyncHandler(ProductController.deleteProduct));

module.exports = router;
