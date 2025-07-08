const { User } = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

class UserService {
    // Get all users with pagination
    static async getAllUsers(page = 1, limit = 10) {
        const offset = (page - 1) * limit;
        const { count, rows } = await User.findAndCountAll({
            limit: parseInt(limit),
            offset: parseInt(offset),
            attributes: { exclude: ['password_hash'] }
        });

        return {
            users: rows,
            total: count,
            page: parseInt(page),
            limit: parseInt(limit),
            totalPages: Math.ceil(count / limit)
        };
    }

    // Get user by ID
    static async getUserById(id) {
        const user = await User.findByPk(id, {
            attributes: { exclude: ['password_hash'] }
        });

        if (!user) {
            throw new Error('User not found');
        }

        return user;
    }

    // Get user by email
    static async getUserByEmail(email) {
        return await User.findOne({ where: { email } });
    }

    // Create new user
    static async createUser(userData) {
        const { name, email, password, role = 'user' } = userData;

        // Check if user already exists
        const existingUser = await this.getUserByEmail(email);
        if (existingUser) {
            throw new Error('User with this email already exists');
        }

        // Hash password
        const password_hash = await bcrypt.hash(password, 10);

        const user = await User.create({
            name,
            email,
            password_hash,
            role
        });

        // Return user without password
        const { password_hash: _, ...userWithoutPassword } = user.toJSON();
        return userWithoutPassword;
    }

    // Update user
    static async updateUser(id, userData) {
        const user = await User.findByPk(id);
        if (!user) {
            throw new Error('User not found');
        }

        // If updating password, hash it
        if (userData.password) {
            userData.password_hash = await bcrypt.hash(userData.password, 10);
            delete userData.password;
        }

        await user.update(userData);

        // Return user without password
        const { password_hash: _, ...userWithoutPassword } = user.toJSON();
        return userWithoutPassword;
    }

    // Delete user
    static async deleteUser(id) {
        const user = await User.findByPk(id);
        if (!user) {
            throw new Error('User not found');
        }

        await user.destroy();
        return { message: 'User deleted successfully' };
    }

    // Login user
    static async loginUser(email, password) {
        const user = await this.getUserByEmail(email);
        if (!user) {
            throw new Error('Invalid email or password');
        }

        const isValidPassword = await bcrypt.compare(password, user.password_hash);
        if (!isValidPassword) {
            throw new Error('Invalid email or password');
        }

        // Generate access token (short-lived)
        const accessToken = jwt.sign(
            { id: user.id, email: user.email, role: user.role },
            process.env.JWT_SECRET || 'your-secret-key',
            { expiresIn: '15m' } // 15 minutes
        );

        // Generate refresh token (long-lived)
        const refreshToken = crypto.randomBytes(64).toString('hex');

        // Save refresh token to database
        await user.update({ refresh_token: refreshToken });

        // Return user without password and tokens
        const { password_hash: _, refresh_token: __, ...userWithoutPassword } = user.toJSON();
        return {
            user: userWithoutPassword,
            accessToken,
            refreshToken
        };
    }

    // Verify token
    static async verifyToken(token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
            const user = await this.getUserById(decoded.id);
            return user;
        } catch (error) {
            throw new Error('Invalid or expired token');
        }
    }

    // Refresh access token
    static async refreshAccessToken(refreshToken) {
        const user = await User.findOne({ where: { refresh_token: refreshToken } });
        if (!user) {
            throw new Error('Invalid refresh token');
        }

        // Generate new access token
        const accessToken = jwt.sign(
            { id: user.id, email: user.email, role: user.role },
            process.env.JWT_SECRET || 'your-secret-key',
            { expiresIn: '15m' }
        );

        return { accessToken };
    }

    // Logout user (invalidate refresh token)
    static async logoutUser(userId) {
        const user = await User.findByPk(userId);
        if (!user) {
            throw new Error('User not found');
        }

        // Clear refresh token
        await user.update({ refresh_token: null });
        return { message: 'Logged out successfully' };
    }

    // Logout from all devices (clear all refresh tokens)
    static async logoutAllDevices(userId) {
        const user = await User.findByPk(userId);
        if (!user) {
            throw new Error('User not found');
        }

        // Clear refresh token
        await user.update({ refresh_token: null });
        return { message: 'Logged out from all devices successfully' };
    }
}

module.exports = UserService;
