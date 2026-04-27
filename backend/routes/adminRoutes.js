const express = require('express');
const router = express.Router();
const {
  registerAdmin,
  loginAdmin,
  getProfile,
  getDashboardStats,
} = require('../controllers/adminController');
const { protect } = require('../middleware/auth');
const { validateLogin, validateRegister } = require('../middleware/validate');

// Public routes
router.post('/register', validateRegister, registerAdmin);
router.post('/login', validateLogin, loginAdmin);

// Protected routes
router.get('/profile', protect, getProfile);
router.get('/stats', protect, getDashboardStats);

module.exports = router;
