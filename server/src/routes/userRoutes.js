const express = require('express');
const { UserController } = require('../controllers');
const { authenticateToken, requireAdmin, validateRegistration, validateLogin, validatePagination, asyncHandler, authLimiter } = require('../middleware');

const router = express.Router();

// Public routes
router.post('/register', authLimiter, validateRegistration, asyncHandler(UserController.register));
router.post('/login', authLimiter, validateLogin, asyncHandler(UserController.login));
router.post('/refresh-token', asyncHandler(UserController.refreshToken));

// Protected routes
router.get('/profile', authenticateToken, asyncHandler(UserController.getProfile));
router.put('/profile', authenticateToken, asyncHandler(UserController.updateProfile));
router.post('/logout', authenticateToken, asyncHandler(UserController.logout));
router.post('/logout-all', authenticateToken, asyncHandler(UserController.logoutAll));
    
// Admin routes
router.get('/', authenticateToken, requireAdmin, validatePagination, asyncHandler(UserController.getAllUsers));
router.get('/:id', authenticateToken, requireAdmin, asyncHandler(UserController.getUserById));
router.put('/:id', authenticateToken, requireAdmin, asyncHandler(UserController.updateUser));
router.delete('/:id', authenticateToken, requireAdmin, asyncHandler(UserController.deleteUser));

module.exports = router;
