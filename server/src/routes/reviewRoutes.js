const express = require('express');
const { ReviewController } = require('../controllers');
const { authenticateToken, validateReview, validatePagination, asyncHandler } = require('../middleware');

const router = express.Router();

// Public routes
router.get('/', validatePagination, asyncHandler(ReviewController.getAllReviews));
router.get('/:id', asyncHandler(ReviewController.getReviewById));

// Product-specific routes
router.get('/products/:product_id/reviews', validatePagination, asyncHandler(ReviewController.getReviewsByProduct));
router.get('/products/:product_id/rating-stats', asyncHandler(ReviewController.getProductRatingStats));
router.get('/products/:product_id/can-review', authenticateToken, asyncHandler(ReviewController.canUserReview));

// User routes (require authentication)
router.get('/user/reviews', authenticateToken, validatePagination, asyncHandler(ReviewController.getUserReviews));
router.post('/', authenticateToken, validateReview, asyncHandler(ReviewController.createReview));
router.put('/:id', authenticateToken, asyncHandler(ReviewController.updateReview));
router.delete('/:id', authenticateToken, asyncHandler(ReviewController.deleteReview));

module.exports = router;
