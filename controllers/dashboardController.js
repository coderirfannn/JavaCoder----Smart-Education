const Course = require('../models/Course');  // Assuming Course model is used


// Teacher Dashboard
exports.teacherDashboard = async (req, res) => {
    try {
        // Fetch courses taught by the logged-in teacher
        const courses = await Course.find({ teacher: req.user._id });

        res.render('dashboard/teacher', { user: req.user, courses: courses });
    } catch (err) {
        console.error(err);
        req.flash('error_msg', 'Something went wrong');
        res.redirect('/dashboard');
    }
};

// Admin Dashboard
exports.adminDashboard = async (req, res) => {
    try {
        // Fetch all courses to display in the admin dashboard
        const courses = await Course.find().populate('teacher', 'fullName');  // Populate teacher details for better info

        // Render the admin dashboard with the courses data
        res.render('dashboard/admin', { user: req.user, courses });
        
    } catch (err) {
        console.error(err);
        req.flash('error_msg', 'Something went wrong while fetching courses');
        res.redirect('/dashboard');
    }
};