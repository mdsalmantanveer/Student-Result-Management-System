const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Admin = require('./models/Admin');
const Student = require('./models/Student');
const Subject = require('./models/Subject');
const Result = require('./models/Result');

dotenv.config();

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ MongoDB Connected for seeding');

    // Clear existing data
    await Admin.deleteMany({});
    await Student.deleteMany({});
    await Subject.deleteMany({});
    await Result.deleteMany({});
    console.log('🗑️  Cleared existing data');

    // Create default admin
    const admin = await Admin.create({
      username: 'admin',
      password: 'admin123',
      name: 'admin',
      email: 'admin@gradevault.edu',
      role: 'admin',
    });
    console.log('👤 Admin created: admin / admin123');

    // Create sample students
    const students = await Student.insertMany([
      {
        roll_number: 'CS2024001',
        name: 'Arjun Sharma',
        email: 'arjun.sharma@student.edu',
        phone: '9876543210',
        class: 'B.Tech CSE',
        section: 'A',
      },
      {
        roll_number: 'CS2024002',
        name: 'Priya Patel',
        email: 'priya.patel@student.edu',
        phone: '9876543211',
        class: 'B.Tech CSE',
        section: 'A',
      },
      {
        roll_number: 'CS2024003',
        name: 'Rahul Verma',
        email: 'rahul.verma@student.edu',
        phone: '9876543212',
        class: 'B.Tech CSE',
        section: 'B',
      },
      {
        roll_number: 'EC2024001',
        name: 'Sneha Reddy',
        email: 'sneha.reddy@student.edu',
        phone: '9876543213',
        class: 'B.Tech ECE',
        section: 'A',
      },
      {
        roll_number: 'EC2024002',
        name: 'Vikram Singh',
        email: 'vikram.singh@student.edu',
        phone: '9876543214',
        class: 'B.Tech ECE',
        section: 'B',
      },
      {
        roll_number: 'EE2024001',
        name: 'Aman Gupta',
        email: 'aman.gupta@student.edu',
        phone: '9876543215',
        class: 'B.Tech EEE',
        section: 'A',
      },
      {
        roll_number: 'EE2024002',
        name: 'Neha Sharma',
        email: 'neha.sharma@student.edu',
        phone: '9876543216',
        class: 'B.Tech EEE',
        section: 'B',
      },
      {
        roll_number: 'ME2024001',
        name: 'Karan Singh',
        email: 'karan.singh@student.edu',
        phone: '9876543217',
        class: 'B.Tech MECH',
        section: 'A',
      },
    ]);
    console.log(`📚 ${students.length} students created`);

    // Create sample subjects
    const subjects = await Subject.insertMany([
      {
        subject_code: 'CS101',
        subject_name: 'Data Structures & Algorithms',
        total_marks: 100,
        passing_marks: 40,
      },
      {
        subject_code: 'CS102',
        subject_name: 'Database Management Systems',
        total_marks: 100,
        passing_marks: 40,
      },
      {
        subject_code: 'CS103',
        subject_name: 'Operating Systems',
        total_marks: 100,
        passing_marks: 40,
      },
      {
        subject_code: 'CS104',
        subject_name: 'Computer Networks',
        total_marks: 100,
        passing_marks: 40,
      },
      {
        subject_code: 'CS105',
        subject_name: 'Web Development',
        total_marks: 100,
        passing_marks: 40,
      },
      {
        subject_code: 'MA101',
        subject_name: 'Engineering Mathematics',
        total_marks: 100,
        passing_marks: 40,
      },
    ]);
    console.log(`📖 ${subjects.length} subjects created`);

    // Create sample results
    const sampleMarks = [
      // Arjun - Semester 1
      { student: 0, subject: 0, marks: 92, semester: 1 },
      { student: 0, subject: 1, marks: 85, semester: 1 },
      { student: 0, subject: 2, marks: 78, semester: 1 },
      { student: 0, subject: 5, marks: 88, semester: 1 },
      // Arjun - Semester 2
      { student: 0, subject: 3, marks: 91, semester: 2 },
      { student: 0, subject: 4, marks: 95, semester: 2 },
      // Priya - Semester 1
      { student: 1, subject: 0, marks: 96, semester: 1 },
      { student: 1, subject: 1, marks: 89, semester: 1 },
      { student: 1, subject: 2, marks: 82, semester: 1 },
      { student: 1, subject: 5, marks: 94, semester: 1 },
      // Rahul - Semester 1
      { student: 2, subject: 0, marks: 65, semester: 1 },
      { student: 2, subject: 1, marks: 72, semester: 1 },
      { student: 2, subject: 2, marks: 45, semester: 1 },
      { student: 2, subject: 5, marks: 58, semester: 1 },
      // Sneha - Semester 1
      { student: 3, subject: 0, marks: 88, semester: 1 },
      { student: 3, subject: 1, marks: 91, semester: 1 },
      { student: 3, subject: 5, marks: 76, semester: 1 },
      // Vikram - Semester 1
      { student: 4, subject: 0, marks: 55, semester: 1 },
      { student: 4, subject: 1, marks: 42, semester: 1 },
      { student: 4, subject: 5, marks: 38, semester: 1 },
      // Aman - Semester 1
      { student: 5, subject: 5, marks: 80, semester: 1 },
      // Neha - Semester 1
      { student: 6, subject: 5, marks: 75, semester: 1 },
      // Karan - Semester 1
      { student: 7, subject: 5, marks: 60, semester: 1 },
    ];

    for (const entry of sampleMarks) {
      await Result.create({
        student_id: students[entry.student]._id,
        subject_id: subjects[entry.subject]._id,
        admin_id: admin._id,
        marks_obtained: entry.marks,
        total_marks: 100,
        semester: entry.semester,
      });
    }
    console.log(`📝 ${sampleMarks.length} results created`);

    console.log('\n✨ Database seeded successfully!');
    console.log('\n📋 Login Credentials:');
    console.log('   Username: admin');
    console.log('   Password: admin123');
    console.log('\n📋 Sample Roll Numbers:');
    console.log('   CS2024001, CS2024002, CS2024003');
    console.log('   EC2024001, EC2024002');
    console.log('   EE2024001, EE2024002, ME2024001\n');

    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding failed:', error.message);
    process.exit(1);
  }
};

seedData();
