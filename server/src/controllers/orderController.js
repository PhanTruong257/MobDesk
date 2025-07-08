const { OrderService } = require('../services');

class OrderController {
    // Get user's orders
    static async getUserOrders(req, res) {
        try {
            const { page = 1, limit = 10 } = req.query;
            const result = await OrderService.getOrdersByUser(req.user.id, page, limit);

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

    // Get all orders (Admin only)
    static async getAllOrders(req, res) {
        try {
            const { page = 1, limit = 10, status, user_id } = req.query;

            const filters = {};
            if (status) filters.status = status;
            if (user_id) filters.user_id = user_id;

            const result = await OrderService.getAllOrders(page, limit, filters);

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

    // Get order by ID
    static async getOrderById(req, res) {
        try {
            const { id } = req.params;
            const order = await OrderService.getOrderById(id);

            // Check if user owns the order (unless admin)
            if (req.user.role !== 'admin' && order.user_id !== req.user.id) {
                return res.status(403).json({
                    success: false,
                    message: 'Access denied'
                });
            }

            res.json({
                success: true,
                data: order
            });
        } catch (error) {
            res.status(404).json({
                success: false,
                message: error.message
            });
        }
    }

    // Create order from cart
    static async createOrder(req, res) {
        try {
            const { paymentMethod = 'COD' } = req.body;

            const validPaymentMethods = ['COD', 'VNPAY', 'MOMO'];
            if (!validPaymentMethods.includes(paymentMethod)) {
                return res.status(400).json({
                    success: false,
                    message: 'Invalid payment method'
                });
            }

            const order = await OrderService.createOrderFromCart(req.user.id, paymentMethod);

            res.status(201).json({
                success: true,
                message: 'Order created successfully',
                data: order
            });
        } catch (error) {
            res.status(400).json({
                success: false,
                message: error.message
            });
        }
    }

    // Update order status (Admin only)
    static async updateOrderStatus(req, res) {
        try {
            const { id } = req.params;
            const { status } = req.body;

            if (!status) {
                return res.status(400).json({
                    success: false,
                    message: 'Status is required'
                });
            }

            const order = await OrderService.updateOrderStatus(id, status);

            res.json({
                success: true,
                message: 'Order status updated successfully',
                data: order
            });
        } catch (error) {
            res.status(400).json({
                success: false,
                message: error.message
            });
        }
    }

    // Cancel order
    static async cancelOrder(req, res) {
        try {
            const { id } = req.params;

            // Users can only cancel their own orders, admins can cancel any
            const userId = req.user.role === 'admin' ? null : req.user.id;

            const order = await OrderService.cancelOrder(id, userId);

            res.json({
                success: true,
                message: 'Order cancelled successfully',
                data: order
            });
        } catch (error) {
            res.status(400).json({
                success: false,
                message: error.message
            });
        }
    }

    // Get order statistics (Admin only)
    static async getOrderStatistics(req, res) {
        try {
            const stats = await OrderService.getOrderStatistics();

            res.json({
                success: true,
                data: stats
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }
}

module.exports = OrderController;
