const Course = require('../models/Course');
const Lecture = require('../models/Lecture');

// @desc    Show all lectures for a course
exports.getLectures = async (req, res) => {
    try {
        const course = await Course.findById(req.params.courseId).populate('lectures');
        res.render('lectures/index', { course });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};

// @desc    Show lecture creation form
exports.showCreateLecture = (req, res) => {
    const data = req.params.courseId;
    res.render('lectures/create', { courseId: req.params.courseId });
    // res.send(data)
};

// @desc    Create a new lecture
exports.createLecture = async (req, res) => {
    const { title, description, content ,lectureUrl } = req.body;
    try {
        const lecture = new Lecture({
            title,
            description,
            content,
            course: req.params.courseId,
            lectureUrl
        });
        await lecture.save();

        // Add the new lecture to the course
        const course = await Course.findById(req.params.courseId);
        course.lectures.push(lecture._id);
        await course.save();

        req.flash('success_msg', 'Lecture added successfully');
        res.redirect(`/${req.params.courseId}`);
    } catch (err) {
        console.error(err);
        req.flash('error_msg', 'Error adding lecture');
        // res.redirect(`/courses/${req.params.courseId}/lectures/create`);
    }
    // console.log(req.body);
    
};

// @desc    Show lecture details
exports.getLecture = async (req, res) => {
    try {
        const lecture = await Lecture.findById(req.params.id).populate('course');
        res.render('lectures/show', { lecture });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};
