const express = require('express');
const router = express.Router();
const {
  getStudents,
  getStudentByRoll,
  createStudent,
  updateStudent,
  deleteStudent,
} = require('../controllers/studentController');
const { protect } = require('../middleware/auth');
const { validateStudent } = require('../middleware/validate');

// Public routes
router.get('/', getStudents);
router.get('/:rollNumber', getStudentByRoll);

// Protected routes (Admin only)
router.post('/', protect, validateStudent, createStudent);
router.put('/:id', protect, updateStudent);
router.delete('/:id', protect, deleteStudent);

module.exports = router;
