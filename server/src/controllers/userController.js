const { UserService } = require('../services');

class UserController {
    // Register new user
    static async register(req, res) {
        try {
            const { name, email, password, role } = req.body;

            if (!name || !email || !password) {
                return res.status(400).json({
                    success: false,
                    message: 'Name, email, and password are required'
                });
            }

            const user = await UserService.createUser({ name, email, password, role });

            res.status(201).json({
                success: true,
                message: 'User registered successfully',
                data: user
            });
        } catch (error) {
            res.status(400).json({
                success: false,
                message: error.message
            });
        }
    }

    // Login user
    static async login(req, res) {
        try {
            const { email, password } = req.body;

            if (!email || !password) {
                return res.status(400).json({
                    success: false,
                    message: 'Email and password are required'
                });
            }

            const result = await UserService.loginUser(email, password);

            res.json({
                success: true,
                message: 'Login successful',
                data: result
            });
        } catch (error) {
            res.status(401).json({
                success: false,
                message: error.message
            });
        }
    }

    // Get current user profile
    static async getProfile(req, res) {
        try {
            const user = await UserService.getUserById(req.user.id);

            res.json({
                success: true,
                data: user
            });
        } catch (error) {
            res.status(404).json({
                success: false,
                message: error.message
            });
        }
    }

    // Update user profile
    static async updateProfile(req, res) {
        try {
            const user = await UserService.updateUser(req.user.id, req.body);

            res.json({
                success: true,
                message: 'Profile updated successfully',
                data: user
            });
        } catch (error) {
            res.status(400).json({
                success: false,
                message: error.message
            });
        }
    }

    // Get all users (Admin only)
    static async getAllUsers(req, res) {
        try {
            const { page = 1, limit = 10 } = req.query;
            const result = await UserService.getAllUsers(page, limit);

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

    // Get user by ID (Admin only)
    static async getUserById(req, res) {
        try {
            const { id } = req.params;
            const user = await UserService.getUserById(id);

            res.json({
                success: true,
                data: user
            });
        } catch (error) {
            res.status(404).json({
                success: false,
                message: error.message
            });
        }
    }

    // Update user (Admin only)
    static async updateUser(req, res) {
        try {
            const { id } = req.params;
            const user = await UserService.updateUser(id, req.body);

            res.json({
                success: true,
                message: 'User updated successfully',
                data: user
            });
        } catch (error) {
            res.status(400).json({
                success: false,
                message: error.message
            });
        }
    }

    // Delete user (Admin only)
    static async deleteUser(req, res) {
        try {
            const { id } = req.params;
            const result = await UserService.deleteUser(id);

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

    // Refresh access token
    static async refreshToken(req, res) {
        try {
            const { refreshToken } = req.body;

            if (!refreshToken) {
                return res.status(400).json({
                    success: false,
                    message: 'Refresh token is required'
                });
            }

            const result = await UserService.refreshAccessToken(refreshToken);

            res.json({
                success: true,
                message: 'Token refreshed successfully',
                data: result
            });
        } catch (error) {
            res.status(401).json({
                success: false,
                message: error.message
            });
        }
    }

    // Logout user
    static async logout(req, res) {
        try {
            const result = await UserService.logoutUser(req.user.id);

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

    // Logout from all devices
    static async logoutAll(req, res) {
        try {
            const result = await UserService.logoutAllDevices(req.user.id);

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

module.exports = UserController;
