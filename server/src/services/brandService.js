const { Brand, Product } = require('../models');

class BrandService {
    // Get all brands
    static async getAllBrands() {
        return await Brand.findAll({
            include: [{
                model: Product,
                as: 'products',
                attributes: ['id', 'name', 'price', 'image_url']
            }]
        });
    }

    // Get brand by ID
    static async getBrandById(id) {
        const brand = await Brand.findByPk(id, {
            include: [{
                model: Product,
                as: 'products',
                attributes: ['id', 'name', 'price', 'image_url', 'stock']
            }]
        });

        if (!brand) {
            throw new Error('Brand not found');
        }

        return brand;
    }

    // Create new brand
    static async createBrand(brandData) {
        const { name } = brandData;

        // Check if brand already exists
        const existingBrand = await Brand.findOne({ where: { name } });
        if (existingBrand) {
            throw new Error('Brand with this name already exists');
        }

        return await Brand.create({ name });
    }

    // Update brand
    static async updateBrand(id, brandData) {
        const brand = await Brand.findByPk(id);
        if (!brand) {
            throw new Error('Brand not found');
        }

        // Check if new name already exists (if updating name)
        if (brandData.name && brandData.name !== brand.name) {
            const existingBrand = await Brand.findOne({
                where: { name: brandData.name }
            });
            if (existingBrand) {
                throw new Error('Brand with this name already exists');
            }
        }

        await brand.update(brandData);
        return brand;
    }

    // Delete brand
    static async deleteBrand(id) {
        const brand = await Brand.findByPk(id);
        if (!brand) {
            throw new Error('Brand not found');
        }

        // Check if brand has products
        const productCount = await Product.count({ where: { brand_id: id } });
        if (productCount > 0) {
            throw new Error('Cannot delete brand that has products. Please reassign or delete products first.');
        }

        await brand.destroy();
        return { message: 'Brand deleted successfully' };
    }

    // Get brands with product count
    static async getBrandsWithProductCount() {
        const brands = await Brand.findAll({
            include: [{
                model: Product,
                as: 'products',
                attributes: []
            }],
            attributes: {
                include: [
                    [Brand.sequelize.fn('COUNT', Brand.sequelize.col('products.id')), 'productCount']
                ]
            },
            group: ['Brand.id']
        });

        return brands;
    }
}

module.exports = BrandService;
