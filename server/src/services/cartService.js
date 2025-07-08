const { Cart, CartItem, Product, User } = require('../models');

class CartService {
    // Get or create cart for user
    static async getOrCreateCart(userId) {
        let cart = await Cart.findOne({
            where: { user_id: userId },
            include: [{
                model: CartItem,
                as: 'items',
                include: [{
                    model: Product,
                    as: 'product',
                    attributes: ['id', 'name', 'price', 'image_url', 'stock']
                }]
            }]
        });

        if (!cart) {
            cart = await Cart.create({ user_id: userId });
            cart.items = [];
        }

        return cart;
    }

    // Get cart with calculated totals
    static async getCartWithTotals(userId) {
        const cart = await this.getOrCreateCart(userId);

        let total = 0;
        let itemCount = 0;

        if (cart.items && cart.items.length > 0) {
            cart.items.forEach(item => {
                total += parseFloat(item.product.price) * item.quantity;
                itemCount += item.quantity;
            });
        }

        return {
            ...cart.toJSON(),
            total: parseFloat(total.toFixed(2)),
            itemCount
        };
    }

    // Add item to cart
    static async addToCart(userId, productId, quantity = 1) {
        // Verify product exists and has stock
        const product = await Product.findByPk(productId);
        if (!product) {
            throw new Error('Product not found');
        }

        if (product.stock < quantity) {
            throw new Error('Insufficient stock');
        }

        const cart = await this.getOrCreateCart(userId);

        // Check if item already exists in cart
        let cartItem = await CartItem.findOne({
            where: { cart_id: cart.id, product_id: productId }
        });

        if (cartItem) {
            // Update quantity
            const newQuantity = cartItem.quantity + quantity;
            if (product.stock < newQuantity) {
                throw new Error('Insufficient stock');
            }
            await cartItem.update({ quantity: newQuantity });
        } else {
            // Add new item
            cartItem = await CartItem.create({
                cart_id: cart.id,
                product_id: productId,
                quantity
            });
        }

        return await this.getCartWithTotals(userId);
    }

    // Update cart item quantity
    static async updateCartItem(userId, productId, quantity) {
        if (quantity <= 0) {
            return await this.removeFromCart(userId, productId);
        }

        // Verify product exists and has stock
        const product = await Product.findByPk(productId);
        if (!product) {
            throw new Error('Product not found');
        }

        if (product.stock < quantity) {
            throw new Error('Insufficient stock');
        }

        const cart = await this.getOrCreateCart(userId);

        const cartItem = await CartItem.findOne({
            where: { cart_id: cart.id, product_id: productId }
        });

        if (!cartItem) {
            throw new Error('Item not found in cart');
        }

        await cartItem.update({ quantity });

        return await this.getCartWithTotals(userId);
    }

    // Remove item from cart
    static async removeFromCart(userId, productId) {
        const cart = await this.getOrCreateCart(userId);

        const cartItem = await CartItem.findOne({
            where: { cart_id: cart.id, product_id: productId }
        });

        if (!cartItem) {
            throw new Error('Item not found in cart');
        }

        await cartItem.destroy();

        return await this.getCartWithTotals(userId);
    }

    // Clear cart
    static async clearCart(userId) {
        const cart = await this.getOrCreateCart(userId);

        await CartItem.destroy({
            where: { cart_id: cart.id }
        });

        return await this.getCartWithTotals(userId);
    }

    // Get cart item count
    static async getCartItemCount(userId) {
        const cart = await Cart.findOne({
            where: { user_id: userId },
            include: [{
                model: CartItem,
                as: 'items'
            }]
        });

        if (!cart || !cart.items) return 0;

        return cart.items.reduce((total, item) => total + item.quantity, 0);
    }

    // Validate cart before checkout
    static async validateCart(userId) {
        const cart = await this.getCartWithTotals(userId);

        if (!cart.items || cart.items.length === 0) {
            throw new Error('Cart is empty');
        }

        const errors = [];

        for (const item of cart.items) {
            if (item.product.stock < item.quantity) {
                errors.push(`Insufficient stock for ${item.product.name}. Available: ${item.product.stock}, Requested: ${item.quantity}`);
            }
        }

        if (errors.length > 0) {
            throw new Error(`Cart validation failed: ${errors.join(', ')}`);
        }

        return cart;
    }
}

module.exports = CartService;
