const express = require('express');
const router = express.Router();
const { isAuthenticated, isStudent, isTeacher, isAdmin } = require('../middleware/auth.js');

// Home route (public access)
router.get('/', (req, res) => {
    res.render('index');
});

// Student Dashboard
router.get('/student-dashboard', isAuthenticated, isStudent, async(req, res) => {

   

    
    res.render('dashboard/student', { user: req.session.user });
});

// Teacher Dashboard
router.get('/teacher-dashboard', isAuthenticated, isTeacher, (req, res) => {
    res.render('dashboard/teacher', { user: req.session.user });
});

// Admin Dashboard
router.get('/admin-dashboard', isAuthenticated, isAdmin, (req, res) => {
    res.render('dashboard/admin', { user: req.session.user });
});

module.exports = router;
