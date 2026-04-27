const Result = require('../models/Result');
const Student = require('../models/Student');

// @desc    Get all results
// @route   GET /api/results
// @access  Public
exports.getResults = async (req, res, next) => {
  try {
    const { semester, subject_id, student_id } = req.query;
    let query = {};

    if (semester) query.semester = parseInt(semester);
    if (subject_id) query.subject_id = subject_id;
    if (student_id) query.student_id = student_id;

    const results = await Result.find(query)
      .populate('student_id', 'name roll_number class section')
      .populate('subject_id', 'subject_name subject_code total_marks')
      .populate('admin_id', 'name')
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      count: results.length,
      data: results,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get results by student roll number
// @route   GET /api/results/student/:rollNumber
// @access  Public
exports.getResultsByRollNumber = async (req, res, next) => {
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

    let query = { student_id: student._id };
    if (req.query.semester) {
      query.semester = parseInt(req.query.semester);
    }

    const results = await Result.find(query)
      .populate('student_id', 'name roll_number class section email phone')
      .populate('subject_id', 'subject_name subject_code total_marks passing_marks')
      .populate('admin_id', 'name')
      .sort({ semester: 1, 'subject_id.subject_code': 1 });

    // Calculate GPA
    const gradePoints = {
      'A+': 10,
      A: 9,
      'B+': 8,
      B: 7,
      C: 6,
      F: 0,
    };

    let totalGradePoints = 0;
    let subjectCount = results.length;

    results.forEach((result) => {
      totalGradePoints += gradePoints[result.grade] || 0;
    });

    const gpa = subjectCount > 0 ? (totalGradePoints / subjectCount).toFixed(2) : 0;

    // Calculate semester-wise GPA
    const semesterMap = {};
    results.forEach((result) => {
      if (!semesterMap[result.semester]) {
        semesterMap[result.semester] = { totalPoints: 0, count: 0 };
      }
      semesterMap[result.semester].totalPoints += gradePoints[result.grade] || 0;
      semesterMap[result.semester].count += 1;
    });

    const semesterGPA = {};
    Object.keys(semesterMap).forEach((sem) => {
      semesterGPA[sem] = (
        semesterMap[sem].totalPoints / semesterMap[sem].count
      ).toFixed(2);
    });

    // Get unique semesters for filter
    const semesters = [...new Set(results.map((r) => r.semester))].sort();

    res.json({
      success: true,
      data: {
        student,
        results,
        gpa: parseFloat(gpa),
        semesterGPA,
        semesters,
        totalSubjects: subjectCount,
        passCount: results.filter((r) => r.status === 'Pass').length,
        failCount: results.filter((r) => r.status === 'Fail').length,
      },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create a new result
// @route   POST /api/results
// @access  Private (Admin)
exports.createResult = async (req, res, next) => {
  try {
    // Set admin_id from authenticated user
    req.body.admin_id = req.admin._id;

    const result = await Result.create(req.body);

    const populatedResult = await Result.findById(result._id)
      .populate('student_id', 'name roll_number')
      .populate('subject_id', 'subject_name subject_code')
      .populate('admin_id', 'name');

    res.status(201).json({ success: true, data: populatedResult });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'Result for this student, subject, and semester already exists',
      });
    }
    next(error);
  }
};

// @desc    Update a result
// @route   PUT /api/results/:id
// @access  Private (Admin)
exports.updateResult = async (req, res, next) => {
  try {
    let result = await Result.findById(req.params.id);

    if (!result) {
      return res.status(404).json({
        success: false,
        message: 'Result not found',
      });
    }

    // Update fields
    result.marks_obtained = req.body.marks_obtained ?? result.marks_obtained;
    result.total_marks = req.body.total_marks ?? result.total_marks;
    result.semester = req.body.semester ?? result.semester;
    result.student_id = req.body.student_id ?? result.student_id;
    result.subject_id = req.body.subject_id ?? result.subject_id;

    // Save triggers pre-save hook for grade calculation
    await result.save();

    const populatedResult = await Result.findById(result._id)
      .populate('student_id', 'name roll_number')
      .populate('subject_id', 'subject_name subject_code')
      .populate('admin_id', 'name');

    res.json({ success: true, data: populatedResult });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete a result
// @route   DELETE /api/results/:id
// @access  Private (Admin)
exports.deleteResult = async (req, res, next) => {
  try {
    const result = await Result.findById(req.params.id);

    if (!result) {
      return res.status(404).json({
        success: false,
        message: 'Result not found',
      });
    }

    await Result.findByIdAndDelete(req.params.id);
    res.json({
      success: true,
      message: 'Result deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get result by ID
// @route   GET /api/results/:id
// @access  Public
exports.getResultById = async (req, res, next) => {
  try {
    const result = await Result.findById(req.params.id)
      .populate('student_id', 'name roll_number class section')
      .populate('subject_id', 'subject_name subject_code total_marks')
      .populate('admin_id', 'name');

    if (!result) {
      return res.status(404).json({
        success: false,
        message: 'Result not found',
      });
    }

    res.json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
};
