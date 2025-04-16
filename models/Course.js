const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    teacher: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',  // Reference to User model (teacher)
        required: true
    },
    students: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',  // Reference to User model (student)
        default: []
    }],
    lectures: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Lecture',  // Reference to Lecture model
    }],
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Course', courseSchema);
