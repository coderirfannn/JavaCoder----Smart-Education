const express = require('express');
const router = express.Router();
const { isAuthenticated, isStudent, isTeacher, isAdmin } = require('../middleware/auth');
const dashboardController = require('../controllers/dashboardController');

// Dashboard route (general)
router.get('/', isAuthenticated, (req, res) => {
    res.render('dashboard/index', { user: req.session.user });
});

// Dashboard for students
// router.get('/student', isAuthenticated, isStudent, (req, res) => {
//     res.render('dashboard/student', { user: req.session.user });
// });

// Dashboard for teachers
router.get('/teacher', isAuthenticated, isTeacher, (req, res) => {
    res.render('dashboard/teacher', { user: req.session.user });
});

// Dashboard for admins
router.get('/admin', isAuthenticated, isAdmin, dashboardController.adminDashboard);

router.get("/admin/guid" ,(req ,res)=>{
    res.render("teachers/teacherGuid")
})


module.exports = router;
