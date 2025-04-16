const express = require('express');
const router = express.Router();
const courseController = require('../controllers/courseController');
const { isAuthenticated } = require('../middleware/auth');
const Course = require('../models/Course');

// Course Routes
router.get('/', isAuthenticated, courseController.getAllCourses);
router.get('/create', isAuthenticated, courseController.showCreateCourse);

router.post("/create" ,async(req,res)=>{
    const { title, description } = req.body;
      try {
            const course = new Course({
                title,
                description,
                teacher: req.session.user._id  // Assign logged-in user as teacher
            });
            await course.save();
            req.flash('success_msg', 'Course created successfully');
            res.redirect('/dashboard/admin');
        } catch (err) {
            console.error(err);
            req.flash('error_msg', 'Error creating course');
        }
})

// router.post('/', isAuthenticated, courseController.createCourse);
router.get('/:id', isAuthenticated, courseController.getCourse);
router.get('/:id/edit', isAuthenticated, courseController.showEditCourse);
router.put('/:id', isAuthenticated, courseController.editCourse);
router.post('/:id', isAuthenticated, courseController.deleteCourse);

module.exports = router;
