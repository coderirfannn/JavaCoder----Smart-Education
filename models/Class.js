const mongoose = require('mongoose');

const classSchema = new mongoose.Schema({
    course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course',  // Reference to Course model
        required: true
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    students: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',  // Reference to User model (student)
        default: []
    }],
});

module.exports = mongoose.model('Class', classSchema);
