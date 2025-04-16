const mongoose = require('mongoose');

const transferredTeacherSchema = new mongoose.Schema({
  teacher: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  averageRating: { type: Number, required: true },
  transferredAt: { type: Date, default: Date.now },
  isTransferred: {
    type: Boolean,
    default: false
  } // optional: admin
});

module.exports = mongoose.model('TransferredTeacher', transferredTeacherSchema);
