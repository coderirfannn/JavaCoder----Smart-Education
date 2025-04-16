const express = require('express');
const router = express.Router();
const Course = require("../models/Course");
const Lecture = require("../models/Lecture");
const User = require("../models/User");
const Rating = require("../models/Rating");
const TransferredTeacher = require('../models/TransferredTeacher');
const { isStudent, isAuthenticated } = require('../middleware/auth');

// GET /dashboard/student
router.get("/dashboard/student", async (req, res) => {
    try {
        const user = await User.findById(req.session.user._id);
        const userCourse = await Course.find();
        res.render("dashboard/student", { user, userCourse });
    } catch (err) {
        console.error(err);
        res.status(500).send("Something went wrong while loading the student dashboard.");
    }
});

// GET /courses/:id - View a single course
router.get("/courses/:id", async (req, res) => {
    try {
        const courseId = req.params.id;
        const course = await Course.findById(courseId).populate('teacher', 'fullName');
        const lectures = await Lecture.find({ course: courseId });

        if (!course) {
            req.flash('error_msg', 'Course not found');
            return res.redirect('/dashboard/student');
        }

        const ratings = await Rating.find({ teacher: course.teacher._id })
            .populate('student', 'fullName')
            .sort({ createdAt: -1 });

        res.render("courses/lectureShow", { course, lectures, user: req.session.user, ratings });

    } catch (err) {
        console.error(err);
        req.flash('error_msg', 'Error loading course');
        res.redirect('/dashboard/student');
    }
});

// GET /lectures/lecture/:id - View a single lecture
router.get("/lectures/lecture/:id", async (req, res) => {
    try {
        const lectureId = req.params.id;
        const lecture = await Lecture.findById(lectureId).populate('course');

        if (!lecture) {
            req.flash('error_msg', 'Lecture not found');
            return res.redirect('/dashboard/student');
        }

        res.render("lectures/lectureRun", { lecture, user: req.session.user });

    } catch (err) {
        console.error(err);
        req.flash('error_msg', 'Error loading lecture');
        res.redirect('/dashboard/student');
    }
});

// GET /course/:id - Rate form page
router.get("/course/:id", async (req, res) => {
    try {
        const course = await Course.findById(req.params.id).populate("teacher");
        if (!course) return res.status(404).send("Course not found");

        const ratings = await Rating.find({ teacher: course.teacher._id }).populate("student", "fullName");

        res.render("courses/rate", { course, ratings });
        // res.send(ratings)
    } catch (err) {
        console.error(err);
        res.status(500).send("Error loading rating page");
    }
});

// POST /courses/:id/rate-teacher - Submit a teacher rating
router.post("/courses/:id/rate-teacher", async (req, res) => {
    try {
        const { rating, comment } = req.body;
        const courseId = req.params.id;
        const studentId = req.session.user._id;

        const course = await Course.findById(courseId).populate("teacher");
        if (!course) return res.status(404).send("Course not found");

        // Create and save the new rating
        const newRating = new Rating({
            teacher: course.teacher._id,
            student: studentId,
            course: courseId,
            rating,
            comment
        });

        await newRating.save();

        res.redirect(`/course/${courseId}`);
    } catch (err) {
        console.error(err);
        res.status(500).send("Error submitting rating");
    }
});

router.get("/dashboard/student/top/teacher",isAuthenticated,isStudent, async (req, res) => {
    try {
        const topTeachers = await TransferredTeacher.find({ isTransferred: true }).populate('teacher');
        res.render("teachers/top-teachers", { topTeachers });
        // res.send(topTeachers)
    } catch (err) {
        console.error("Error fetching transferred teachers:", err);
        res.status(500).send("Server Error");
    }
});


router.get("/dashboard/student/studentlist", isAuthenticated, async (req, res) => {
    try {
      const students = await User.find({ role: "student" });
    //   res.send(students)
      res.render("teachers/studentlist", { students }); // Change res.send to res.render if using EJS
    } catch (err) {
      console.error("Error fetching student list:", err);
      res.status(500).send("Server Error");
    }
  });


  // Place this before your other routes


  




module.exports = router;
