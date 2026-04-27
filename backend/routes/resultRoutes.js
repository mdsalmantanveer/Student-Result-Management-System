const express = require('express');
const router = express.Router();
const {
  getResults,
  getResultsByRollNumber,
  getResultById,
  createResult,
  updateResult,
  deleteResult,
} = require('../controllers/resultController');
const { protect } = require('../middleware/auth');
const { validateResult } = require('../middleware/validate');

// Public routes
router.get('/', getResults);
router.get('/student/:rollNumber', getResultsByRollNumber);
router.get('/:id', getResultById);

// Protected routes (Admin only)
router.post('/', protect, validateResult, createResult);
router.put('/:id', protect, updateResult);
router.delete('/:id', protect, deleteResult);

module.exports = router;
