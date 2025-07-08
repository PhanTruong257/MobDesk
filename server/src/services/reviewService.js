const { Review, User, Product, Order, OrderItem } = require('../models');
const { Op } = require('sequelize');

class ReviewService {
    // Get all reviews with pagination
    static async getAllReviews(page = 1, limit = 10, filters = {}) {
        const offset = (page - 1) * limit;
        const where = {};

        if (filters.product_id) where.product_id = filters.product_id;
        if (filters.user_id) where.user_id = filters.user_id;
        if (filters.rating) where.rating = filters.rating;

        const { count, rows } = await Review.findAndCountAll({
            where,
            include: [
                {
                    model: User,
                    as: 'user',
                    attributes: ['id', 'name']
                },
                {
                    model: Product,
                    as: 'product',
                    attributes: ['id', 'name', 'image_url']
                }
            ],
            limit: parseInt(limit),
            offset: parseInt(offset),
            order: [['created_at', 'DESC']]
        });

        return {
            reviews: rows,
            total: count,
            page: parseInt(page),
            limit: parseInt(limit),
            totalPages: Math.ceil(count / limit)
        };
    }

    // Get review by ID
    static async getReviewById(id) {
        const review = await Review.findByPk(id, {
            include: [
                {
                    model: User,
                    as: 'user',
                    attributes: ['id', 'name']
                },
                {
                    model: Product,
                    as: 'product',
                    attributes: ['id', 'name', 'image_url']
                }
            ]
        });

        if (!review) {
            throw new Error('Review not found');
        }

        return review;
    }

    // Get reviews by product
    static async getReviewsByProduct(productId, page = 1, limit = 10) {
        return await this.getAllReviews(page, limit, { product_id: productId });
    }

    // Get reviews by user
    static async getReviewsByUser(userId, page = 1, limit = 10) {
        return await this.getAllReviews(page, limit, { user_id: userId });
    }

    // Check if user can review product
    static async canUserReviewProduct(userId, productId) {
        // Check if user has purchased this product
        const orderCount = await Order.count({
            where: {
                user_id: userId,
                status: 'paid'
            },
            include: [{
                model: OrderItem,
                as: 'items',
                where: { product_id: productId },
                required: true
            }]
        });

        if (orderCount === 0) {
            return { canReview: false, reason: 'You must purchase this product before reviewing it' };
        }

        // Check if user has already reviewed this product
        const existingReview = await Review.findOne({
            where: { user_id: userId, product_id: productId }
        });

        if (existingReview) {
            return { canReview: false, reason: 'You have already reviewed this product' };
        }

        return { canReview: true };
    }

    // Create review
    static async createReview(userId, reviewData) {
        const { product_id, rating, comment } = reviewData;

        // Validate product exists
        const product = await Product.findByPk(product_id);
        if (!product) {
            throw new Error('Product not found');
        }

        // Check if user can review
        const canReview = await this.canUserReviewProduct(userId, product_id);
        if (!canReview.canReview) {
            throw new Error(canReview.reason);
        }

        // Validate rating
        if (rating < 1 || rating > 5) {
            throw new Error('Rating must be between 1 and 5');
        }

        const review = await Review.create({
            user_id: userId,
            product_id,
            rating,
            comment
        });

        return await this.getReviewById(review.id);
    }

    // Update review
    static async updateReview(id, userId, reviewData) {
        const review = await Review.findByPk(id);
        if (!review) {
            throw new Error('Review not found');
        }

        // Check if user owns the review
        if (review.user_id !== userId) {
            throw new Error('Unauthorized to update this review');
        }

        // Validate rating if provided
        if (reviewData.rating && (reviewData.rating < 1 || reviewData.rating > 5)) {
            throw new Error('Rating must be between 1 and 5');
        }

        await review.update(reviewData);

        return await this.getReviewById(id);
    }

    // Delete review
    static async deleteReview(id, userId = null, isAdmin = false) {
        const review = await Review.findByPk(id);
        if (!review) {
            throw new Error('Review not found');
        }

        // Check if user owns the review or is admin
        if (!isAdmin && userId && review.user_id !== userId) {
            throw new Error('Unauthorized to delete this review');
        }

        await review.destroy();

        return { message: 'Review deleted successfully' };
    }

    // Get product rating statistics
    static async getProductRatingStats(productId) {
        const reviews = await Review.findAll({
            where: { product_id: productId },
            attributes: ['rating']
        });

        if (reviews.length === 0) {
            return {
                averageRating: 0,
                totalReviews: 0,
                ratingDistribution: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }
            };
        }

        const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
        const averageRating = totalRating / reviews.length;

        const ratingDistribution = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
        reviews.forEach(review => {
            ratingDistribution[review.rating]++;
        });

        return {
            averageRating: parseFloat(averageRating.toFixed(2)),
            totalReviews: reviews.length,
            ratingDistribution
        };
    }
}

module.exports = ReviewService;
