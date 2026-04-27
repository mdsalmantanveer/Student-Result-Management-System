const Subject = require('../models/Subject');
const Result = require('../models/Result');

// @desc    Get all subjects
// @route   GET /api/subjects
// @access  Public
exports.getSubjects = async (req, res, next) => {
  try {
    const subjects = await Subject.find().sort({ subject_code: 1 });
    res.json({
      success: true,
      count: subjects.length,
      data: subjects,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get subject by ID
// @route   GET /api/subjects/:id
// @access  Public
exports.getSubjectById = async (req, res, next) => {
  try {
    const subject = await Subject.findById(req.params.id);
    if (!subject) {
      return res.status(404).json({
        success: false,
        message: 'Subject not found',
      });
    }
    res.json({ success: true, data: subject });
  } catch (error) {
    next(error);
  }
};

// @desc    Create a new subject
// @route   POST /api/subjects
// @access  Private (Admin)
exports.createSubject = async (req, res, next) => {
  try {
    const subject = await Subject.create(req.body);
    res.status(201).json({ success: true, data: subject });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'A subject with this code already exists',
      });
    }
    next(error);
  }
};

// @desc    Update a subject
// @route   PUT /api/subjects/:id
// @access  Private (Admin)
exports.updateSubject = async (req, res, next) => {
  try {
    const subject = await Subject.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!subject) {
      return res.status(404).json({
        success: false,
        message: 'Subject not found',
      });
    }

    res.json({ success: true, data: subject });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete a subject
// @route   DELETE /api/subjects/:id
// @access  Private (Admin)
exports.deleteSubject = async (req, res, next) => {
  try {
    const subject = await Subject.findById(req.params.id);
    if (!subject) {
      return res.status(404).json({
        success: false,
        message: 'Subject not found',
      });
    }

    // Also delete all results for this subject
    await Result.deleteMany({ subject_id: req.params.id });
    await Subject.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: 'Subject and associated results deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};
