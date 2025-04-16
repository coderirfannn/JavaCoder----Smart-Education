const Course = require('../models/Course');
const Lecture = require('../models/Lecture');

// @desc    Show all courses
exports.getAllCourses = async (req, res) => {
    try {
        const courses = await Course.find().populate('teacher', 'fullName').populate('lectures');
        res.render('courses/index', { courses });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};

// @desc    Show course details
exports.getCourse = async (req, res) => {
    try {
        const course = await Course.findById(req.params.id).populate('lectures');
        res.render('courses/show', { course });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};

// @desc    Show course creation form
exports.showCreateCourse = (req, res) => {
    res.render('courses/create');
};

// @desc    Create a new course
// exports.createCourse = async (req, res) => {
//     const { title, description } = req.body;
//     try {
//         const course = new Course({
//             title,
//             description,
//             teacher: req.session.user._id  // Assign logged-in user as teacher
//         });
//         await course.save();
//         req.flash('success_msg', 'Course created successfully');
//         res.redirect('/courses');
//     } catch (err) {
//         console.error(err);
//         req.flash('error_msg', 'Error creating course');
//         res.redirect('/dashboard/admin');
//     }
// };

// @desc    Show course edit form
exports.showEditCourse = async (req, res) => {
    try {
        const course = await Course.findById(req.params.id);
        res.render('courses/edit', { course });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};

// @desc    Edit course
exports.editCourse = async (req, res) => {
    const { title, description } = req.body;
    try {
        const course = await Course.findByIdAndUpdate(req.params.id, { title, description }, { new: true });
        req.flash('success_msg', 'Course updated successfully');
        res.redirect(`/courses/${course._id}`);
    } catch (err) {
        console.error(err);
        req.flash('error_msg', 'Error updating course');
        res.redirect(`/courses/${req.params.id}/edit`);
    }
};

// @desc    Delete course
exports.deleteCourse = async (req, res) => {
    try {
        await Course.findByIdAndDelete(req.params.id);
        req.flash('success_msg', 'Course deleted successfully');
        res.redirect('/dashboard/admin');
    } catch (err) {
        console.error(err);
        req.flash('error_msg', 'Error deleting course');
        
    }
};


