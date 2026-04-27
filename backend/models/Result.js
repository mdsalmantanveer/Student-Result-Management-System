const mongoose = require('mongoose');

const resultSchema = new mongoose.Schema(
  {
    student_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Student',
      required: [true, 'Student ID is required'],
    },
    subject_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Subject',
      required: [true, 'Subject ID is required'],
    },
    admin_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Admin',
      required: [true, 'Admin ID is required'],
    },
    marks_obtained: {
      type: Number,
      required: [true, 'Marks obtained is required'],
      min: [0, 'Marks cannot be negative'],
    },
    total_marks: {
      type: Number,
      required: [true, 'Total marks is required'],
      min: [1, 'Total marks must be at least 1'],
    },
    grade: {
      type: String,
      enum: ['A+', 'A', 'B+', 'B', 'C', 'F'],
    },
    status: {
      type: String,
      enum: ['Pass', 'Fail'],
    },
    semester: {
      type: Number,
      required: [true, 'Semester is required'],
      min: [1, 'Semester must be at least 1'],
      max: [8, 'Semester cannot exceed 8'],
    },
  },
  {
    timestamps: true,
  }
);

// Auto-calculate grade and status before saving
resultSchema.pre('save', function (next) {
  const percentage = (this.marks_obtained / this.total_marks) * 100;

  if (percentage >= 90) this.grade = 'A+';
  else if (percentage >= 80) this.grade = 'A';
  else if (percentage >= 70) this.grade = 'B+';
  else if (percentage >= 60) this.grade = 'B';
  else if (percentage >= 50) this.grade = 'C';
  else this.grade = 'F';

  this.status = percentage >= 50 ? 'Pass' : 'Fail';
  next();
});

// Also handle findOneAndUpdate
resultSchema.pre('findOneAndUpdate', function (next) {
  const update = this.getUpdate();
  if (update.marks_obtained !== undefined && update.total_marks !== undefined) {
    const percentage = (update.marks_obtained / update.total_marks) * 100;

    if (percentage >= 90) update.grade = 'A+';
    else if (percentage >= 80) update.grade = 'A';
    else if (percentage >= 70) update.grade = 'B+';
    else if (percentage >= 60) update.grade = 'B';
    else if (percentage >= 50) update.grade = 'C';
    else update.grade = 'F';

    update.status = percentage >= 50 ? 'Pass' : 'Fail';
  }
  next();
});

// Compound index for efficient queries
resultSchema.index({ student_id: 1, semester: 1 });
resultSchema.index({ student_id: 1, subject_id: 1, semester: 1 }, { unique: true });

module.exports = mongoose.model('Result', resultSchema);
