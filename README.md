# 🎓 GradeVault – Student Result Management System

![MERN Stack](https://img.shields.io/badge/Stack-MERN-blue?style=for-the-badge)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)
![Version](https://img.shields.io/badge/Version-1.0.0-purple?style=for-the-badge)

A modern, secure, and scalable full-stack web application for managing and accessing student academic results. Built with the **MERN Stack** (MongoDB, Express.js, React.js, Node.js).

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Installation](#-installation)
- [Usage Guide](#-usage-guide)
- [API Endpoints](#-api-endpoints)
- [Database Design](#-database-design)
- [Grading System](#-grading-system)
- [Screenshots](#-screenshots)
- [Future Enhancements](#-future-enhancements)
- [Author](#-author)

---

## 🔷 Overview

GradeVault replaces traditional manual and spreadsheet-based result management systems with a digital solution that ensures:

- **Accuracy** – Automated grade & GPA calculation
- **Speed** – Indexed database for instant result retrieval
- **Security** – JWT-based authentication for admin operations
- **Accessibility** – Responsive UI accessible on any device

### Problem Statement

Traditional systems suffer from data redundancy, human errors, difficulty in updating records, lack of centralized storage, and slow result retrieval. GradeVault solves all of these.

---

## ✨ Features

### 👨‍🎓 Student Features
- Search results by roll number
- View subject-wise marks, grades, and GPA
- Filter results by semester
- Semester-wise GPA breakdown
- Clean, responsive result display

### 👨‍💼 Admin Features
- Secure JWT-based login
- Dashboard with system statistics
- **CRUD Operations:**
  - Manage Students (Add/Edit/Delete)
  - Manage Subjects (Add/Edit/Delete)
  - Manage Results (Add/Edit/Delete)
- Real-time pass/fail analytics

### 🎨 Design Features
- Dark theme UI (#0f172a, #1e293b)
- Gradient accents (Cyan → Purple)
- Glassmorphism cards
- Smooth animations (Framer Motion)
- Fully responsive design
- Modern typography (Inter, Outfit)

---

## 🛠 Tech Stack

| Layer      | Technology                        |
|------------|-----------------------------------|
| Frontend   | React.js 18 + Vite                |
| Styling    | Tailwind CSS 3                    |
| Animations | Framer Motion                     |
| Backend    | Node.js + Express.js              |
| Database   | MongoDB + Mongoose                |
| Auth       | JSON Web Tokens (JWT) + bcrypt    |
| Validation | express-validator                 |
| HTTP       | Axios                             |
| Toasts     | react-hot-toast                   |

---

## 📁 Project Structure

```
GradeVault/
├── backend/
│   ├── config/
│   │   └── db.js                 # MongoDB connection
│   ├── controllers/
│   │   ├── adminController.js    # Admin auth & stats
│   │   ├── studentController.js  # Student CRUD
│   │   ├── subjectController.js  # Subject CRUD
│   │   └── resultController.js   # Result CRUD + GPA
│   ├── middleware/
│   │   ├── auth.js               # JWT authentication
│   │   ├── errorHandler.js       # Global error handler
│   │   └── validate.js           # Input validation
│   ├── models/
│   │   ├── Admin.js              # Admin schema
│   │   ├── Student.js            # Student schema
│   │   ├── Subject.js            # Subject schema
│   │   └── Result.js             # Result schema
│   ├── routes/
│   │   ├── adminRoutes.js
│   │   ├── studentRoutes.js
│   │   ├── subjectRoutes.js
│   │   └── resultRoutes.js
│   ├── .env.example
│   ├── package.json
│   ├── seed.js                   # Database seeder
│   └── server.js                 # Entry point
│
├── frontend/
│   ├── public/
│   │   └── vite.svg
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── SearchBar.jsx
│   │   │   ├── ResultsTable.jsx
│   │   │   ├── FilterDropdowns.jsx
│   │   │   └── StatsCard.jsx
│   │   ├── context/
│   │   │   └── AuthContext.jsx
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── ResultPage.jsx
│   │   │   ├── AdminLogin.jsx
│   │   │   ├── AdminDashboard.jsx
│   │   │   ├── ManageResults.jsx
│   │   │   └── About.jsx
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── postcss.config.js
│
└── README.md
```

---

## 🚀 Installation

### Prerequisites

- **Node.js** v18+ installed
- **MongoDB** installed and running locally (or MongoDB Atlas URI)
- **Git** installed

### Step 1: Clone the Repository

```bash
git clone https://github.com/your-username/gradevault.git
cd gradevault
```

### Step 2: Setup Backend

```bash
cd backend
npm install
```

Create a `.env` file (or copy from `.env.example`):

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/gradevault
JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRE=7d
```

### Step 3: Seed the Database

```bash
npm run seed
```

This creates sample data:
- **Admin:** username `admin`, password `admin123`
- **Students:** CS2024001, CS2024002, CS2024003, EC2024001, EC2024002, EE2024001, EE2024002, ME2024001
- **Subjects:** CS101–CS105, MA101
- **Results:** Sample marks for all students

### Step 4: Start Backend Server

```bash
npm run dev
```

Backend runs at: `http://localhost:5000`

### Step 5: Setup Frontend

```bash
cd ../frontend
npm install
npm run dev
```

Frontend runs at: `http://localhost:3000`

---

## 📖 Usage Guide

### For Students
1. Open the application in your browser
2. Enter your **Roll Number** in the search bar (e.g., `CS2024001`)
3. View your subject-wise marks, grades, and GPA
4. Use the semester filter to view specific semester results

### For Admins
1. Click **Admin Login** in the navigation bar
2. Enter credentials (default: `admin` / `admin123`)
3. Access the **Dashboard** for system overview
4. Go to **Manage Records** to:
   - Add/Edit/Delete Students
   - Add/Edit/Delete Subjects
   - Add/Edit/Delete Results (grades auto-calculated)

---

## 📡 API Endpoints

### Admin Routes

| Method | Endpoint              | Description          | Auth |
|--------|----------------------|----------------------|------|
| POST   | `/api/admin/register` | Register new admin   | No   |
| POST   | `/api/admin/login`    | Admin login          | No   |
| GET    | `/api/admin/profile`  | Get admin profile    | Yes  |
| GET    | `/api/admin/stats`    | Dashboard statistics | Yes  |

### Student Routes

| Method | Endpoint                  | Description           | Auth |
|--------|---------------------------|-----------------------|------|
| GET    | `/api/students`           | Get all students      | No   |
| GET    | `/api/students/:rollNo`   | Get by roll number    | No   |
| POST   | `/api/students`           | Create student        | Yes  |
| PUT    | `/api/students/:id`       | Update student        | Yes  |
| DELETE | `/api/students/:id`       | Delete student        | Yes  |

### Subject Routes

| Method | Endpoint              | Description        | Auth |
|--------|-----------------------|--------------------|------|
| GET    | `/api/subjects`       | Get all subjects   | No   |
| GET    | `/api/subjects/:id`   | Get subject by ID  | No   |
| POST   | `/api/subjects`       | Create subject     | Yes  |
| PUT    | `/api/subjects/:id`   | Update subject     | Yes  |
| DELETE | `/api/subjects/:id`   | Delete subject     | Yes  |

### Result Routes

| Method | Endpoint                         | Description              | Auth |
|--------|----------------------------------|--------------------------|------|
| GET    | `/api/results`                   | Get all results          | No   |
| GET    | `/api/results/:id`               | Get result by ID         | No   |
| GET    | `/api/results/student/:rollNo`   | Get results by roll no.  | No   |
| POST   | `/api/results`                   | Create result            | Yes  |
| PUT    | `/api/results/:id`               | Update result            | Yes  |
| DELETE | `/api/results/:id`               | Delete result            | Yes  |

---

## 🗄 Database Design

### Collections & Relationships

```
Students (1) ──────── (N) Results
Subjects (1) ──────── (N) Results
Admin    (1) ──────── (N) Results
```

- **Students**: roll_number (indexed), name, email, phone, class, section
- **Admin**: username, password (bcrypt hashed), name, email, role
- **Subjects**: subject_code, subject_name, total_marks, passing_marks
- **Results**: student_id, subject_id, admin_id, marks_obtained, total_marks, grade, status, semester

---

## 📊 Grading System

| Grade | Percentage   | Grade Points |
|-------|-------------|-------------|
| A+    | 90% and above | 10          |
| A     | 80% – 89%    | 9           |
| B+    | 70% – 79%    | 8           |
| B     | 60% – 69%    | 7           |
| C     | 50% – 59%    | 6           |
| F     | Below 50%    | 0           |

**GPA Formula:** `GPA = Sum of Grade Points / Number of Subjects`

---

## 📸 Screenshots

> Screenshots will be added after deployment.

| Page | Description |
|------|------------|
| Home Page | Hero section with search bar |
| Result Page | Student results with GPA |
| Admin Login | Secure login form |
| Admin Dashboard | Statistics overview |
| Manage Records | CRUD interface |
| About Page | Project information |

---

## 🔮 Future Enhancements

- [ ] Student login with email/password
- [ ] PDF result download & print
- [ ] Email notifications for new results
- [ ] Bulk result upload via CSV
- [ ] Performance analytics with charts
- [ ] Multi-language support
- [ ] Role-based access (HOD, Principal)
- [ ] Cloud deployment (Vercel + Render)
- [ ] Result history & audit trail
- [ ] Dark/Light theme toggle

---

## 👨‍💻 Author

**GradeVault** – Student Result Management System

Built with ❤️ using the MERN Stack

---

## 📄 License

This project is licensed under the MIT License.
