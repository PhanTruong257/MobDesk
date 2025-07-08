const { CartService } = require('../services');

class CartController {
    // Get user's cart
    static async getCart(req, res) {
        try {
            const cart = await CartService.getCartWithTotals(req.user.id);

            res.json({
                success: true,
                data: cart
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }

    // Add item to cart
    static async addToCart(req, res) {
        try {
            const { product_id, quantity = 1 } = req.body;

            if (!product_id) {
                return res.status(400).json({
                    success: false,
                    message: 'Product ID is required'
                });
            }

            if (quantity <= 0) {
                return res.status(400).json({
                    success: false,
                    message: 'Quantity must be greater than 0'
                });
            }

            const cart = await CartService.addToCart(req.user.id, product_id, quantity);

            res.json({
                success: true,
                message: 'Item added to cart successfully',
                data: cart
            });
        } catch (error) {
            res.status(400).json({
                success: false,
                message: error.message
            });
        }
    }

    // Update cart item quantity
    static async updateCartItem(req, res) {
        try {
            const { product_id } = req.params;
            const { quantity } = req.body;

            if (quantity === undefined) {
                return res.status(400).json({
                    success: false,
                    message: 'Quantity is required'
                });
            }

            if (quantity < 0) {
                return res.status(400).json({
                    success: false,
                    message: 'Quantity cannot be negative'
                });
            }

            const cart = await CartService.updateCartItem(req.user.id, product_id, quantity);

            res.json({
                success: true,
                message: 'Cart item updated successfully',
                data: cart
            });
        } catch (error) {
            res.status(400).json({
                success: false,
                message: error.message
            });
        }
    }

    // Remove item from cart
    static async removeFromCart(req, res) {
        try {
            const { product_id } = req.params;

            const cart = await CartService.removeFromCart(req.user.id, product_id);

            res.json({
                success: true,
                message: 'Item removed from cart successfully',
                data: cart
            });
        } catch (error) {
            res.status(400).json({
                success: false,
                message: error.message
            });
        }
    }

    // Clear cart
    static async clearCart(req, res) {
        try {
            const cart = await CartService.clearCart(req.user.id);

            res.json({
                success: true,
                message: 'Cart cleared successfully',
                data: cart
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }

    // Get cart item count
    static async getCartItemCount(req, res) {
        try {
            const count = await CartService.getCartItemCount(req.user.id);

            res.json({
                success: true,
                data: { count }
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }
}

module.exports = CartController;
