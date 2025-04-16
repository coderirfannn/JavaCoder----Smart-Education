const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    ratings: {
           type: mongoose.Schema.Types.ObjectId,
                ref: 'Rating',  // Reference to User model (teacher)
                
    },
    role: {
        type: String,
        enum: ['admin', 'student', 'teacher'], // probably lowercase
        default: 'student'
      }
      
});

// Encrypt password before saving to database
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

// Method to check password
userSchema.methods.matchPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

// Generate JWT token
userSchema.methods.generateAuthToken = function () {
    return jwt.sign({ id: this._id, role: this.role }, 'your_jwt_secret', { expiresIn: '1h' });
};

module.exports = mongoose.model('User', userSchema);
