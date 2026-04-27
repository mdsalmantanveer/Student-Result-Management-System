const { body, validationResult } = require('express-validator');

// Handle validation results
const handleValidation = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: errors.array().map((err) => ({
        field: err.path,
        message: err.msg,
      })),
    });
  }
  next();
};

// Student validation rules
const validateStudent = [
  body('roll_number').trim().notEmpty().withMessage('Roll number is required'),
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('email').trim().isEmail().withMessage('Valid email is required'),
  body('class').trim().notEmpty().withMessage('Class is required'),
  body('section').trim().notEmpty().withMessage('Section is required'),
  handleValidation,
];

// Subject validation rules
const validateSubject = [
  body('subject_code').trim().notEmpty().withMessage('Subject code is required'),
  body('subject_name').trim().notEmpty().withMessage('Subject name is required'),
  body('total_marks')
    .isInt({ min: 1 })
    .withMessage('Total marks must be a positive integer'),
  body('passing_marks')
    .isInt({ min: 1 })
    .withMessage('Passing marks must be a positive integer'),
  handleValidation,
];

// Result validation rules
const validateResult = [
  body('student_id').notEmpty().withMessage('Student ID is required'),
  body('subject_id').notEmpty().withMessage('Subject ID is required'),
  body('marks_obtained')
    .isInt({ min: 0 })
    .withMessage('Marks obtained must be a non-negative integer'),
  body('total_marks')
    .isInt({ min: 1 })
    .withMessage('Total marks must be a positive integer'),
  body('semester')
    .isInt({ min: 1, max: 8 })
    .withMessage('Semester must be between 1 and 8'),
  handleValidation,
];

// Admin login validation
const validateLogin = [
  body('username').trim().notEmpty().withMessage('Username is required'),
  body('password').notEmpty().withMessage('Password is required'),
  handleValidation,
];

// Admin registration validation
const validateRegister = [
  body('username').trim().notEmpty().withMessage('Username is required'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters'),
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('email').trim().isEmail().withMessage('Valid email is required'),
  handleValidation,
];

module.exports = {
  validateStudent,
  validateSubject,
  validateResult,
  validateLogin,
  validateRegister,
};
