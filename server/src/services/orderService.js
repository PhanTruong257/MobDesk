const { Order, OrderItem, Product, User, Payment, Cart, CartItem } = require('../models');
const CartService = require('./cartService');
const ProductService = require('./productService');

class OrderService {
    // Get all orders with pagination
    static async getAllOrders(page = 1, limit = 10, filters = {}) {
        const offset = (page - 1) * limit;
        const where = {};

        if (filters.status) where.status = filters.status;
        if (filters.user_id) where.user_id = filters.user_id;

        const { count, rows } = await Order.findAndCountAll({
            where,
            include: [
                {
                    model: User,
                    as: 'user',
                    attributes: ['id', 'name', 'email']
                },
                {
                    model: OrderItem,
                    as: 'items',
                    include: [{
                        model: Product,
                        as: 'product',
                        attributes: ['id', 'name', 'image_url']
                    }]
                },
                { model: Payment, as: 'payment' }
            ],
            limit: parseInt(limit),
            offset: parseInt(offset),
            order: [['created_at', 'DESC']]
        });

        return {
            orders: rows,
            total: count,
            page: parseInt(page),
            limit: parseInt(limit),
            totalPages: Math.ceil(count / limit)
        };
    }

    // Get order by ID
    static async getOrderById(id) {
        const order = await Order.findByPk(id, {
            include: [
                {
                    model: User,
                    as: 'user',
                    attributes: ['id', 'name', 'email']
                },
                {
                    model: OrderItem,
                    as: 'items',
                    include: [{
                        model: Product,
                        as: 'product'
                    }]
                },
                { model: Payment, as: 'payment' }
            ]
        });

        if (!order) {
            throw new Error('Order not found');
        }

        return order;
    }

    // Get orders by user
    static async getOrdersByUser(userId, page = 1, limit = 10) {
        return await this.getAllOrders(page, limit, { user_id: userId });
    }

    // Create order from cart
    static async createOrderFromCart(userId, paymentMethod = 'COD') {
        // Validate cart
        const cart = await CartService.validateCart(userId);

        // Create order
        const order = await Order.create({
            user_id: userId,
            total: cart.total,
            status: 'pending'
        });

        // Create order items and update product stock
        for (const cartItem of cart.items) {
            await OrderItem.create({
                order_id: order.id,
                product_id: cartItem.product_id,
                quantity: cartItem.quantity,
                price: cartItem.product.price
            });

            // Reduce product stock
            await ProductService.updateStock(
                cartItem.product_id,
                cartItem.quantity,
                'subtract'
            );
        }

        // Create payment record
        const payment = await Payment.create({
            order_id: order.id,
            method: paymentMethod,
            status: paymentMethod === 'COD' ? 'success' : 'pending',
            paid_at: paymentMethod === 'COD' ? new Date() : null
        });

        // Clear cart
        await CartService.clearCart(userId);

        // If COD, mark order as paid
        if (paymentMethod === 'COD') {
            await order.update({ status: 'paid' });
        }

        return await this.getOrderById(order.id);
    }

    // Update order status
    static async updateOrderStatus(id, status) {
        const order = await Order.findByPk(id);
        if (!order) {
            throw new Error('Order not found');
        }

        const validStatuses = ['pending', 'paid', 'shipped', 'cancelled'];
        if (!validStatuses.includes(status)) {
            throw new Error('Invalid order status');
        }

        // If cancelling order, restore product stock
        if (status === 'cancelled' && order.status !== 'cancelled') {
            const orderItems = await OrderItem.findAll({
                where: { order_id: id }
            });

            for (const item of orderItems) {
                await ProductService.updateStock(
                    item.product_id,
                    item.quantity,
                    'add'
                );
            }
        }

        await order.update({ status });

        // Update payment status if needed
        if (status === 'paid') {
            await Payment.update(
                { status: 'success', paid_at: new Date() },
                { where: { order_id: id } }
            );
        }

        return await this.getOrderById(id);
    }

    // Cancel order
    static async cancelOrder(id, userId = null) {
        const order = await Order.findByPk(id);
        if (!order) {
            throw new Error('Order not found');
        }

        // If userId provided, verify user owns the order
        if (userId && order.user_id !== userId) {
            throw new Error('Unauthorized to cancel this order');
        }

        if (order.status === 'shipped') {
            throw new Error('Cannot cancel shipped order');
        }

        if (order.status === 'cancelled') {
            throw new Error('Order is already cancelled');
        }

        return await this.updateOrderStatus(id, 'cancelled');
    }

    // Get order statistics
    static async getOrderStatistics() {
        const totalOrders = await Order.count();
        const totalRevenue = await Order.sum('total', {
            where: { status: 'paid' }
        });
        const pendingOrders = await Order.count({
            where: { status: 'pending' }
        });
        const shippedOrders = await Order.count({
            where: { status: 'shipped' }
        });

        return {
            totalOrders,
            totalRevenue: totalRevenue || 0,
            pendingOrders,
            shippedOrders
        };
    }
}

module.exports = OrderService;
