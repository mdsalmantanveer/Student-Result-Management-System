const mongoose = require('mongoose');

const subjectSchema = new mongoose.Schema(
  {
    subject_code: {
      type: String,
      required: [true, 'Subject code is required'],
      unique: true,
      trim: true,
      uppercase: true,
    },
    subject_name: {
      type: String,
      required: [true, 'Subject name is required'],
      trim: true,
    },
    total_marks: {
      type: Number,
      required: [true, 'Total marks is required'],
      min: [1, 'Total marks must be at least 1'],
    },
    passing_marks: {
      type: Number,
      required: [true, 'Passing marks is required'],
      min: [1, 'Passing marks must be at least 1'],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Subject', subjectSchema);
