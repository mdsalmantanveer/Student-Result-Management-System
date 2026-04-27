const express = require('express');
const router = express.Router();
const {
  getSubjects,
  getSubjectById,
  createSubject,
  updateSubject,
  deleteSubject,
} = require('../controllers/subjectController');
const { protect } = require('../middleware/auth');
const { validateSubject } = require('../middleware/validate');

// Public routes
router.get('/', getSubjects);
router.get('/:id', getSubjectById);

// Protected routes (Admin only)
router.post('/', protect, validateSubject, createSubject);
router.put('/:id', protect, updateSubject);
router.delete('/:id', protect, deleteSubject);

module.exports = router;
