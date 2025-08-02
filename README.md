# JavaCoder----Smart-Education
# JavaCoder Platform 🏫💻

JavaCoder is a government-level education platform designed to digitally empower schools and institutions. It provides role-based dashboards for Students, Teachers, and Admins — offering tools for online learning, class/course management, digital content. Built using Node.js, Express.js, MongoDB, EJS, and Tailwind CSS, the platform follows the MVC architecture for clean code organization.

---

## 🚀 Project Vision

JavaCoder aims to enhance the quality of education across government schools by providing a robust digital learning platform. With a structured, role-based approach, JavaCoder ensures accountability, accessibility, and adaptability in online education. It bridges the gap between administrators, educators, and learners using modern web technology.

---

## 🧱 Tech Stack

| Layer        | Technology                 |
|-------------|----------------------------|
| Backend      | Node.js, Express.js        |
| Frontend     | EJS (Embedded JavaScript Templates), Tailwind CSS |
| Database     | MongoDB with Mongoose ORM  |
| Authentication | JWT (JSON Web Token)     |
| Architecture | MVC (Model-View-Controller) |

---

## 👤 User Roles

- **Admin**
  - Manage students and teachers
  - Create and assign courses
  - Transfer high-rated teachers to other schools
  - Monitor overall platform activity

- **Teacher**
  - View dashboard with assigned courses and students
  - Upload notes, assignments, and quizzes
  - View student ratings and comments
  - Receive transfer request if rating > 4

- **Student**
  - View assigned courses
  - Access uploaded content
  - Submit course ratings and feedback for teachers
  - Participate in AI-generated quizzes

---

## 🔐 Authentication

- Token-based authentication using **JWT**
- Secure, role-based access control
- Middleware to protect routes for each role

---

## 📋 Key Features

### ✅ Core Modules
- Role-based dashboards for Admin, Teacher, Student
- Course and class management
- Teacher transfer system (based on rating > 4)
- Student rating system (1–5 with comments)
- AI-generated quiz (integration-ready)
- Content upload (notes, materials)
- Responsive, clean UI using Tailwind CSS

### 🛡️ Admin Dashboard
- Add/remove/edit teachers and students
- Assign teachers to classes and subjects
- Review teacher ratings
- Trigger transfer for eligible teachers

### 👩‍🏫 Teacher Dashboard
- Upload lecture notes, assignments
- Track student performance and feedback
- Access rating history
- Manage content by course

### 👨‍🎓 Student Dashboard
- View enrolled classes
- Download notes and learning material
- Rate and review teachers
- Take quizzes

---

## 📁 Project Structure (MVC Pattern)

# javacoder-hub
