const Admin = require('../models/Admin');
const { generateToken } = require('../middleware/auth');

// @desc    Register a new admin
// @route   POST /api/admin/register
// @access  Public (for initial setup)
exports.registerAdmin = async (req, res, next) => {
  try {
    const { username, password, name, email, role } = req.body;

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ username });
    if (existingAdmin) {
      return res.status(400).json({
        success: false,
        message: 'Admin with this username already exists',
      });
    }

    const admin = await Admin.create({ username, password, name, email, role });

    res.status(201).json({
      success: true,
      data: {
        _id: admin._id,
        username: admin.username,
        name: admin.name,
        email: admin.email,
        role: admin.role,
        token: generateToken(admin._id),
      },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Login admin
// @route   POST /api/admin/login
// @access  Public
exports.loginAdmin = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    // Find admin by username
    const admin = await Admin.findOne({ username });
    if (!admin) {
      return res.status(401).json({
        success: false,
        message: 'Invalid username or password',
      });
    }

    // Check password
    const isMatch = await admin.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid username or password',
      });
    }

    res.json({
      success: true,
      data: {
        _id: admin._id,
        username: admin.username,
        name: admin.name,
        email: admin.email,
        role: admin.role,
        token: generateToken(admin._id),
      },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get admin profile
// @route   GET /api/admin/profile
// @access  Private
exports.getProfile = async (req, res, next) => {
  try {
    const admin = await Admin.findById(req.admin._id).select('-password');
    if (!admin) {
      return res.status(404).json({
        success: false,
        message: 'Admin not found',
      });
    }
    res.json({ success: true, data: admin });
  } catch (error) {
    next(error);
  }
};

// @desc    Get dashboard stats
// @route   GET /api/admin/stats
// @access  Private
exports.getDashboardStats = async (req, res, next) => {
  try {
    const Student = require('../models/Student');
    const Subject = require('../models/Subject');
    const Result = require('../models/Result');

    const [totalStudents, totalSubjects, totalResults, recentResults] =
      await Promise.all([
        Student.countDocuments(),
        Subject.countDocuments(),
        Result.countDocuments(),
        Result.find()
          .populate('student_id', 'name roll_number')
          .populate('subject_id', 'subject_name subject_code')
          .sort({ createdAt: -1 })
          .limit(5),
      ]);

    // Calculate pass/fail stats
    const passCount = await Result.countDocuments({ status: 'Pass' });
    const failCount = await Result.countDocuments({ status: 'Fail' });

    res.json({
      success: true,
      data: {
        totalStudents,
        totalSubjects,
        totalResults,
        passCount,
        failCount,
        passPercentage:
          totalResults > 0
            ? ((passCount / totalResults) * 100).toFixed(1)
            : 0,
        recentResults,
      },
    });
  } catch (error) {
    next(error);
  }
};
