const express = require('express');
const { CategoryController } = require('../controllers');
const { authenticateToken, requireAdmin, validateCategory, asyncHandler } = require('../middleware');

const router = express.Router();

// Public routes
router.get('/', asyncHandler(CategoryController.getAllCategories));
router.get('/stats', asyncHandler(CategoryController.getCategoriesWithProductCount));
router.get('/:id', asyncHandler(CategoryController.getCategoryById));

// Admin routes
router.post('/', authenticateToken, requireAdmin, validateCategory, asyncHandler(CategoryController.createCategory));
router.put('/:id', authenticateToken, requireAdmin, asyncHandler(CategoryController.updateCategory));
router.delete('/:id', authenticateToken, requireAdmin, asyncHandler(CategoryController.deleteCategory));

module.exports = router;
