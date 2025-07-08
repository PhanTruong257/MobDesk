const { Product, Category, Brand, ProductSpec, Review, User } = require('../models');
const { Op } = require('sequelize');

class ProductService {
    // Get all products with pagination and filters
    static async getAllProducts(page = 1, limit = 10, filters = {}) {
        const offset = (page - 1) * limit;
        const where = {};

        // Apply filters
        if (filters.category_id) where.category_id = filters.category_id;
        if (filters.brand_id) where.brand_id = filters.brand_id;
        if (filters.minPrice) where.price = { [Op.gte]: filters.minPrice };
        if (filters.maxPrice) {
            where.price = where.price ?
                { ...where.price, [Op.lte]: filters.maxPrice } :
                { [Op.lte]: filters.maxPrice };
        }
        if (filters.search) {
            where[Op.or] = [
                { name: { [Op.like]: `%${filters.search}%` } },
                { description: { [Op.like]: `%${filters.search}%` } }
            ];
        }

        const { count, rows } = await Product.findAndCountAll({
            where,
            include: [
                { model: Category, as: 'category', attributes: ['id', 'name'] },
                { model: Brand, as: 'brand', attributes: ['id', 'name'] },
                { model: ProductSpec, as: 'specs' },
                {
                    model: Review,
                    as: 'reviews',
                    attributes: ['id', 'rating', 'comment', 'created_at'],
                    include: [{ model: User, as: 'user', attributes: ['id', 'name'] }]
                }
            ],
            limit: parseInt(limit),
            offset: parseInt(offset),
            order: [['created_at', 'DESC']]
        });

        return {
            products: rows,
            total: count,
            page: parseInt(page),
            limit: parseInt(limit),
            totalPages: Math.ceil(count / limit)
        };
    }

    // Get product by ID
    static async getProductById(id) {
        const product = await Product.findByPk(id, {
            include: [
                { model: Category, as: 'category' },
                { model: Brand, as: 'brand' },
                { model: ProductSpec, as: 'specs' },
                {
                    model: Review,
                    as: 'reviews',
                    include: [{ model: User, as: 'user', attributes: ['id', 'name'] }]
                }
            ]
        });

        if (!product) {
            throw new Error('Product not found');
        }

        return product;
    }

    // Create new product
    static async createProduct(productData) {
        const { name, description, price, stock, category_id, brand_id, image_url, specs } = productData;

        // Validate category and brand exist
        if (category_id) {
            const category = await Category.findByPk(category_id);
            if (!category) {
                throw new Error('Category not found');
            }
        }

        if (brand_id) {
            const brand = await Brand.findByPk(brand_id);
            if (!brand) {
                throw new Error('Brand not found');
            }
        }

        const product = await Product.create({
            name,
            description,
            price,
            stock,
            category_id,
            brand_id,
            image_url
        });

        // Add specs if provided
        if (specs && specs.length > 0) {
            const productSpecs = specs.map(spec => ({
                product_id: product.id,
                key: spec.key,
                value: spec.value
            }));
            await ProductSpec.bulkCreate(productSpecs);
        }

        return await this.getProductById(product.id);
    }

    // Update product
    static async updateProduct(id, productData) {
        const product = await Product.findByPk(id);
        if (!product) {
            throw new Error('Product not found');
        }

        const { specs, ...updateData } = productData;

        // Validate category and brand if updating
        if (updateData.category_id) {
            const category = await Category.findByPk(updateData.category_id);
            if (!category) {
                throw new Error('Category not found');
            }
        }

        if (updateData.brand_id) {
            const brand = await Brand.findByPk(updateData.brand_id);
            if (!brand) {
                throw new Error('Brand not found');
            }
        }

        await product.update(updateData);

        // Update specs if provided
        if (specs) {
            // Delete existing specs
            await ProductSpec.destroy({ where: { product_id: id } });

            // Add new specs
            if (specs.length > 0) {
                const productSpecs = specs.map(spec => ({
                    product_id: id,
                    key: spec.key,
                    value: spec.value
                }));
                await ProductSpec.bulkCreate(productSpecs);
            }
        }

        return await this.getProductById(id);
    }

    // Delete product
    static async deleteProduct(id) {
        const product = await Product.findByPk(id);
        if (!product) {
            throw new Error('Product not found');
        }

        await product.destroy();
        return { message: 'Product deleted successfully' };
    }

    // Update stock
    static async updateStock(id, quantity, operation = 'set') {
        const product = await Product.findByPk(id);
        if (!product) {
            throw new Error('Product not found');
        }

        let newStock;
        switch (operation) {
            case 'add':
                newStock = product.stock + quantity;
                break;
            case 'subtract':
                newStock = product.stock - quantity;
                if (newStock < 0) {
                    throw new Error('Insufficient stock');
                }
                break;
            case 'set':
            default:
                newStock = quantity;
                break;
        }

        await product.update({ stock: newStock });
        return await this.getProductById(id);
    }

    // Search products
    static async searchProducts(query, page = 1, limit = 10) {
        return await this.getAllProducts(page, limit, { search: query });
    }

    // Get featured products (you can modify logic as needed)
    static async getFeaturedProducts(limit = 8) {
        const products = await Product.findAll({
            include: [
                { model: Category, as: 'category', attributes: ['id', 'name'] },
                { model: Brand, as: 'brand', attributes: ['id', 'name'] }
            ],
            limit: parseInt(limit),
            order: [['created_at', 'DESC']]
        });

        return products;
    }
}

module.exports = ProductService;
