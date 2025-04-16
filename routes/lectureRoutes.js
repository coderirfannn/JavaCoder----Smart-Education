const express = require('express');
const router = express.Router();
const lectureController = require('../controllers/lectureController');
const { isAuthenticated } = require('../middleware/auth');

// Lecture Routes
router.get('/:courseId', isAuthenticated, lectureController.getLectures);
router.get('/:courseId/lectures', isAuthenticated, lectureController.showCreateLecture);
router.post('/lectures/course/:courseId', isAuthenticated, lectureController.createLecture);
router.get('/lecture/:id', isAuthenticated, lectureController.getLecture);

module.exports = router;
