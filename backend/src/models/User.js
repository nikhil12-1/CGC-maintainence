const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, minlength: 2, maxlength: 100 },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true, maxlength: 254 },
    password: { type: String, required: true, minlength: 6, select: false },
    studentId: { type: String, required: true, unique: true, trim: true, maxlength: 30 },
    phone: { type: String, trim: true, validate: (value) => !value || /^[0-9+() -]{7,20}$/.test(value) },
    department: { type: String, required: true, trim: true, maxlength: 100 },
    year: { type: Number, default: 1, min: 1, max: 8 },
    semester: { type: Number, required: true, min: 1, max: 16 },
    profileImage: { type: String, default: '' },
    role: { type: String, enum: ['user'], default: 'user', immutable: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', userSchema);
