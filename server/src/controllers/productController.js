const { ProductService } = require('../services');

class ProductController {
    // Get all products
    static async getAllProducts(req, res) {
        try {
            const { page = 1, limit = 10, category_id, brand_id, minPrice, maxPrice, search } = req.query;

            const filters = {};
            if (category_id) filters.category_id = category_id;
            if (brand_id) filters.brand_id = brand_id;
            if (minPrice) filters.minPrice = parseFloat(minPrice);
            if (maxPrice) filters.maxPrice = parseFloat(maxPrice);
            if (search) filters.search = search;

            const result = await ProductService.getAllProducts(page, limit, filters);

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

    // Get product by ID
    static async getProductById(req, res) {
        try {
            const { id } = req.params;
            const product = await ProductService.getProductById(id);

            res.json({
                success: true,
                data: product
            });
        } catch (error) {
            res.status(404).json({
                success: false,
                message: error.message
            });
        }
    }

    // Search products
    static async searchProducts(req, res) {
        try {
            const { q: query, page = 1, limit = 10 } = req.query;

            if (!query) {
                return res.status(400).json({
                    success: false,
                    message: 'Search query is required'
                });
            }

            const result = await ProductService.searchProducts(query, page, limit);

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

    // Get featured products
    static async getFeaturedProducts(req, res) {
        try {
            const { limit = 8 } = req.query;
            const products = await ProductService.getFeaturedProducts(limit);

            res.json({
                success: true,
                data: products
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }

    // Create product (Admin only)
    static async createProduct(req, res) {
        try {
            const product = await ProductService.createProduct(req.body);

            res.status(201).json({
                success: true,
                message: 'Product created successfully',
                data: product
            });
        } catch (error) {
            res.status(400).json({
                success: false,
                message: error.message
            });
        }
    }

    // Update product (Admin only)
    static async updateProduct(req, res) {
        try {
            const { id } = req.params;
            const product = await ProductService.updateProduct(id, req.body);

            res.json({
                success: true,
                message: 'Product updated successfully',
                data: product
            });
        } catch (error) {
            res.status(400).json({
                success: false,
                message: error.message
            });
        }
    }

    // Delete product (Admin only)
    static async deleteProduct(req, res) {
        try {
            const { id } = req.params;
            const result = await ProductService.deleteProduct(id);

            res.json({
                success: true,
                message: result.message
            });
        } catch (error) {
            res.status(404).json({
                success: false,
                message: error.message
            });
        }
    }

    // Update product stock (Admin only)
    static async updateStock(req, res) {
        try {
            const { id } = req.params;
            const { quantity, operation = 'set' } = req.body;

            if (quantity === undefined) {
                return res.status(400).json({
                    success: false,
                    message: 'Quantity is required'
                });
            }

            const product = await ProductService.updateStock(id, quantity, operation);

            res.json({
                success: true,
                message: 'Stock updated successfully',
                data: product
            });
        } catch (error) {
            res.status(400).json({
                success: false,
                message: error.message
            });
        }
    }
}

module.exports = ProductController;
