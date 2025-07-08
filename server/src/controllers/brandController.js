const { BrandService } = require('../services');

class BrandController {
    // Get all brands
    static async getAllBrands(req, res) {
        try {
            const brands = await BrandService.getAllBrands();

            res.json({
                success: true,
                data: brands
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }

    // Get brands with product count
    static async getBrandsWithProductCount(req, res) {
        try {
            const brands = await BrandService.getBrandsWithProductCount();

            res.json({
                success: true,
                data: brands
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }

    // Get brand by ID
    static async getBrandById(req, res) {
        try {
            const { id } = req.params;
            const brand = await BrandService.getBrandById(id);

            res.json({
                success: true,
                data: brand
            });
        } catch (error) {
            res.status(404).json({
                success: false,
                message: error.message
            });
        }
    }

    // Create brand (Admin only)
    static async createBrand(req, res) {
        try {
            const { name } = req.body;

            if (!name) {
                return res.status(400).json({
                    success: false,
                    message: 'Brand name is required'
                });
            }

            const brand = await BrandService.createBrand({ name });

            res.status(201).json({
                success: true,
                message: 'Brand created successfully',
                data: brand
            });
        } catch (error) {
            res.status(400).json({
                success: false,
                message: error.message
            });
        }
    }

    // Update brand (Admin only)
    static async updateBrand(req, res) {
        try {
            const { id } = req.params;
            const brand = await BrandService.updateBrand(id, req.body);

            res.json({
                success: true,
                message: 'Brand updated successfully',
                data: brand
            });
        } catch (error) {
            res.status(400).json({
                success: false,
                message: error.message
            });
        }
    }

    // Delete brand (Admin only)
    static async deleteBrand(req, res) {
        try {
            const { id } = req.params;
            const result = await BrandService.deleteBrand(id);

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

module.exports = BrandController;
