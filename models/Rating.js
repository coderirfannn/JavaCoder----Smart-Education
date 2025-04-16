// models/Rating.js
const mongoose = require('mongoose');
const { Schema } = mongoose;

const ratingSchema = new Schema({
    teacher: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    student: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    course: {
        type: Schema.Types.ObjectId,
        ref: 'Course',
        required: false // optional if you're rating teacher only
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    comment: {
        type: String,
        trim: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Rating', ratingSchema);
