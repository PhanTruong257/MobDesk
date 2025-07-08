const express = require('express');
const { BrandController } = require('../controllers');
const { authenticateToken, requireAdmin, validateBrand, asyncHandler } = require('../middleware');

const router = express.Router();

// Public routes
router.get('/', asyncHandler(BrandController.getAllBrands));
router.get('/stats', asyncHandler(BrandController.getBrandsWithProductCount));
router.get('/:id', asyncHandler(BrandController.getBrandById));

// Admin routes
router.post('/', authenticateToken, requireAdmin, validateBrand, asyncHandler(BrandController.createBrand));
router.put('/:id', authenticateToken, requireAdmin, asyncHandler(BrandController.updateBrand));
router.delete('/:id', authenticateToken, requireAdmin, asyncHandler(BrandController.deleteBrand));

module.exports = router;
