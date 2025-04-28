const mongoose = require('mongoose');
const User = require('./models/User');  // Import User model
const Course = require('./models/Course');  // Import Course model

// Connect to MongoDB (replace with your connection string)
mongoose.connect('mongodb+srv://mohdirfan70097:M5Qh9P6RwIkJ2sup@cluster0.jvnobnt.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log('Connected to MongoDB');
})
.catch((err) => {
    console.error('Error connecting to MongoDB:', err);
});

// Create a Teacher
const createTeacher = async () => {
    const teacher = new User({
        fullName: 'John Doe',
        email: 'john.doe@example.com',
        password: 'password123',  // Make sure to hash this password in your application
        role: 'teacher',
    });

    try {
        const savedTeacher = await teacher.save();
        console.log('Sample Teacher Created:', savedTeacher);
        return savedTeacher;
    } catch (err) {
        console.error('Error creating teacher:', err);
    }
};

// Create a Student
const createStudent = async () => {
    const student = new User({
        fullName: 'Jane Smith',
        email: 'jane.smith@example.com',
        password: 'password123',  // Same as above, make sure to hash
        role: 'student',
    });

    try {
        const savedStudent = await student.save();
        console.log('Sample Student Created:', savedStudent);
        return savedStudent;
    } catch (err) {
        console.error('Error creating student:', err);
    }
};

// Create Courses
const createCourses = async (teacherId) => {
    const sampleCourse1 = new Course({
        title: 'JavaScript 101',
        description: 'Introduction to JavaScript programming.',
        teacher: teacherId,  // Assign the teacher to this course
        students: [],  // You can add students here if needed
    });

    const sampleCourse2 = new Course({
        title: 'Node.js Fundamentals',
        description: 'Learn the basics of Node.js.',
        teacher: teacherId,
        students: [],
    });

    try {
        const savedCourses = await Promise.all([sampleCourse1.save(), sampleCourse2.save()]);
        console.log('Sample Courses Created:', savedCourses);
    } catch (err) {
        console.error('Error creating courses:', err);
    }
};

// Main function to run the entire process
const createSampleData = async () => {
    try {
        const teacher = await createTeacher();  // Create teacher
        const student = await createStudent();  // Create student

        if (teacher) {
            await createCourses(teacher._id);  // Create courses with the teacher assigned
        }
    } catch (err) {
        console.error('Error creating sample data:', err);
    } finally {
        mongoose.connection.close();  // Close the connection after the operation
    }
};

// Execute the function
createSampleData();
