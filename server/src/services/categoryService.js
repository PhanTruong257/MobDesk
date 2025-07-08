const { Category, Product } = require('../models');

class CategoryService {
    // Get all categories
    static async getAllCategories() {
        return await Category.findAll({
            include: [{
                model: Product,
                as: 'products',
                attributes: ['id', 'name', 'price', 'image_url']
            }]
        });
    }

    // Get category by ID
    static async getCategoryById(id) {
        const category = await Category.findByPk(id, {
            include: [{
                model: Product,
                as: 'products',
                attributes: ['id', 'name', 'price', 'image_url', 'stock']
            }]
        });

        if (!category) {
            throw new Error('Category not found');
        }

        return category;
    }

    // Create new category
    static async createCategory(categoryData) {
        const { name } = categoryData;

        // Check if category already exists
        const existingCategory = await Category.findOne({ where: { name } });
        if (existingCategory) {
            throw new Error('Category with this name already exists');
        }

        return await Category.create({ name });
    }

    // Update category
    static async updateCategory(id, categoryData) {
        const category = await Category.findByPk(id);
        if (!category) {
            throw new Error('Category not found');
        }

        // Check if new name already exists (if updating name)
        if (categoryData.name && categoryData.name !== category.name) {
            const existingCategory = await Category.findOne({
                where: { name: categoryData.name }
            });
            if (existingCategory) {
                throw new Error('Category with this name already exists');
            }
        }

        await category.update(categoryData);
        return category;
    }

    // Delete category
    static async deleteCategory(id) {
        const category = await Category.findByPk(id);
        if (!category) {
            throw new Error('Category not found');
        }

        // Check if category has products
        const productCount = await Product.count({ where: { category_id: id } });
        if (productCount > 0) {
            throw new Error('Cannot delete category that has products. Please reassign or delete products first.');
        }

        await category.destroy();
        return { message: 'Category deleted successfully' };
    }

    // Get categories with product count
    static async getCategoriesWithProductCount() {
        const categories = await Category.findAll({
            include: [{
                model: Product,
                as: 'products',
                attributes: []
            }],
            attributes: {
                include: [
                    [Category.sequelize.fn('COUNT', Category.sequelize.col('products.id')), 'productCount']
                ]
            },
            group: ['Category.id']
        });

        return categories;
    }
}

module.exports = CategoryService;
