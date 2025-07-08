const { CategoryService } = require('../services');

class CategoryController {
    // Get all categories
    static async getAllCategories(req, res) {
        try {
            const categories = await CategoryService.getAllCategories();

            res.json({
                success: true,
                data: categories
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }

    // Get categories with product count
    static async getCategoriesWithProductCount(req, res) {
        try {
            const categories = await CategoryService.getCategoriesWithProductCount();

            res.json({
                success: true,
                data: categories
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }

    // Get category by ID
    static async getCategoryById(req, res) {
        try {
            const { id } = req.params;
            const category = await CategoryService.getCategoryById(id);

            res.json({
                success: true,
                data: category
            });
        } catch (error) {
            res.status(404).json({
                success: false,
                message: error.message
            });
        }
    }

    // Create category (Admin only)
    static async createCategory(req, res) {
        try {
            const { name } = req.body;

            if (!name) {
                return res.status(400).json({
                    success: false,
                    message: 'Category name is required'
                });
            }

            const category = await CategoryService.createCategory({ name });

            res.status(201).json({
                success: true,
                message: 'Category created successfully',
                data: category
            });
        } catch (error) {
            res.status(400).json({
                success: false,
                message: error.message
            });
        }
    }

    // Update category (Admin only)
    static async updateCategory(req, res) {
        try {
            const { id } = req.params;
            const category = await CategoryService.updateCategory(id, req.body);

            res.json({
                success: true,
                message: 'Category updated successfully',
                data: category
            });
        } catch (error) {
            res.status(400).json({
                success: false,
                message: error.message
            });
        }
    }

    // Delete category (Admin only)
    static async deleteCategory(req, res) {
        try {
            const { id } = req.params;
            const result = await CategoryService.deleteCategory(id);

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
}

module.exports = CategoryController;
