const { ReviewService } = require('../services');

class ReviewController {
    // Get all reviews
    static async getAllReviews(req, res) {
        try {
            const { page = 1, limit = 10, product_id, user_id, rating } = req.query;

            const filters = {};
            if (product_id) filters.product_id = product_id;
            if (user_id) filters.user_id = user_id;
            if (rating) filters.rating = parseInt(rating);

            const result = await ReviewService.getAllReviews(page, limit, filters);

            res.json({
                success: true,
                data: result
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }

    // Get review by ID
    static async getReviewById(req, res) {
        try {
            const { id } = req.params;
            const review = await ReviewService.getReviewById(id);

            res.json({
                success: true,
                data: review
            });
        } catch (error) {
            res.status(404).json({
                success: false,
                message: error.message
            });
        }
    }

    // Get reviews by product
    static async getReviewsByProduct(req, res) {
        try {
            const { product_id } = req.params;
            const { page = 1, limit = 10 } = req.query;

            const result = await ReviewService.getReviewsByProduct(product_id, page, limit);

            res.json({
                success: true,
                data: result
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }

    // Get user's reviews
    static async getUserReviews(req, res) {
        try {
            const { page = 1, limit = 10 } = req.query;
            const result = await ReviewService.getReviewsByUser(req.user.id, page, limit);

            res.json({
                success: true,
                data: result
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }

    // Create review
    static async createReview(req, res) {
        try {
            const { product_id, rating, comment } = req.body;

            if (!product_id || !rating) {
                return res.status(400).json({
                    success: false,
                    message: 'Product ID and rating are required'
                });
            }

            if (rating < 1 || rating > 5) {
                return res.status(400).json({
                    success: false,
                    message: 'Rating must be between 1 and 5'
                });
            }

            const review = await ReviewService.createReview(req.user.id, {
                product_id,
                rating,
                comment
            });

            res.status(201).json({
                success: true,
                message: 'Review created successfully',
                data: review
            });
        } catch (error) {
            res.status(400).json({
                success: false,
                message: error.message
            });
        }
    }

    // Update review
    static async updateReview(req, res) {
        try {
            const { id } = req.params;
            const { rating, comment } = req.body;

            if (rating && (rating < 1 || rating > 5)) {
                return res.status(400).json({
                    success: false,
                    message: 'Rating must be between 1 and 5'
                });
            }

            const review = await ReviewService.updateReview(id, req.user.id, {
                rating,
                comment
            });

            res.json({
                success: true,
                message: 'Review updated successfully',
                data: review
            });
        } catch (error) {
            res.status(400).json({
                success: false,
                message: error.message
            });
        }
    }

    // Delete review
    static async deleteReview(req, res) {
        try {
            const { id } = req.params;

            const isAdmin = req.user.role === 'admin';
            const userId = isAdmin ? null : req.user.id;

            const result = await ReviewService.deleteReview(id, userId, isAdmin);

            res.json({
                success: true,
                message: result.message
            });
        } catch (error) {
            res.status(400).json({
                success: false,
                message: error.message
            });
        }
    }

    // Get product rating statistics
    static async getProductRatingStats(req, res) {
        try {
            const { product_id } = req.params;
            const stats = await ReviewService.getProductRatingStats(product_id);

            res.json({
                success: true,
                data: stats
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }

    // Check if user can review product
    static async canUserReview(req, res) {
        try {
            const { product_id } = req.params;
            const result = await ReviewService.canUserReviewProduct(req.user.id, product_id);

            res.json({
                success: true,
                data: result
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }
}

module.exports = ReviewController;
