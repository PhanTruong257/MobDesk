const express = require('express');
const { OrderController } = require('../controllers');
const { authenticateToken, requireAdmin, validatePagination, asyncHandler } = require('../middleware');

const router = express.Router();

// User routes (require authentication)
router.get('/user', authenticateToken, validatePagination, asyncHandler(OrderController.getUserOrders));
router.get('/:id', authenticateToken, asyncHandler(OrderController.getOrderById));
router.post('/', authenticateToken, asyncHandler(OrderController.createOrder));
router.put('/:id/cancel', authenticateToken, asyncHandler(OrderController.cancelOrder));

// Admin routes
router.get('/', authenticateToken, requireAdmin, validatePagination, asyncHandler(OrderController.getAllOrders));
router.get('/admin/stats', authenticateToken, requireAdmin, asyncHandler(OrderController.getOrderStatistics));
router.put('/:id/status', authenticateToken, requireAdmin, asyncHandler(OrderController.updateOrderStatus));

module.exports = router;
