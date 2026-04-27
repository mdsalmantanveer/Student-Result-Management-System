const Student = require('../models/Student');
const Result = require('../models/Result');

// @desc    Get all students
// @route   GET /api/students
// @access  Public
exports.getStudents = async (req, res, next) => {
  try {
    const { search, class: studentClass, section } = req.query;
    let query = {};

    if (search) {
      query.$or = [
        { roll_number: { $regex: search, $options: 'i' } },
        { name: { $regex: search, $options: 'i' } },
      ];
    }
    if (studentClass) query.class = studentClass;
    if (section) query.section = section.toUpperCase();

    const students = await Student.find(query).sort({ roll_number: 1 });
    res.json({
      success: true,
      count: students.length,
      data: students,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get student by roll number
// @route   GET /api/students/:rollNumber
// @access  Public
exports.getStudentByRoll = async (req, res, next) => {
  try {
    const student = await Student.findOne({
      roll_number: req.params.rollNumber,
    });

    if (!student) {
      return res.status(404).json({
        success: false,
        message: 'Student not found with this roll number',
      });
    }

    res.json({ success: true, data: student });
  } catch (error) {
    next(error);
  }
};

// @desc    Create a new student
// @route   POST /api/students
// @access  Private (Admin)
exports.createStudent = async (req, res, next) => {
  try {
    const student = await Student.create(req.body);
    res.status(201).json({ success: true, data: student });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'A student with this roll number already exists',
      });
    }
    next(error);
  }
};

// @desc    Update a student
// @route   PUT /api/students/:id
// @access  Private (Admin)
exports.updateStudent = async (req, res, next) => {
  try {
    const student = await Student.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!student) {
      return res.status(404).json({
        success: false,
        message: 'Student not found',
      });
    }

    res.json({ success: true, data: student });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete a student
// @route   DELETE /api/students/:id
// @access  Private (Admin)
exports.deleteStudent = async (req, res, next) => {
  try {
    const student = await Student.findById(req.params.id);

    if (!student) {
      return res.status(404).json({
        success: false,
        message: 'Student not found',
      });
    }

    // Also delete all results for this student
    await Result.deleteMany({ student_id: req.params.id });
    await Student.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: 'Student and associated results deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};
