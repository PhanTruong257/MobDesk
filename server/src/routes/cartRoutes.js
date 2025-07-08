const express = require('express');
const { CartController } = require('../controllers');
const { authenticateToken, asyncHandler } = require('../middleware');

const router = express.Router();

// All cart routes require authentication
router.use(authenticateToken);

router.get('/', asyncHandler(CartController.getCart));
router.get('/count', asyncHandler(CartController.getCartItemCount));
router.post('/', asyncHandler(CartController.addToCart));
router.put('/:product_id', asyncHandler(CartController.updateCartItem));
router.delete('/:product_id', asyncHandler(CartController.removeFromCart));
router.delete('/', asyncHandler(CartController.clearCart));

module.exports = router;
