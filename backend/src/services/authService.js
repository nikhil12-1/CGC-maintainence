const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const publicUser = (user) => ({ id: user._id, name: user.name, email: user.email, studentId: user.studentId, phone: user.phone, department: user.department, year: user.year, semester: user.semester });
async function register(input) {
  const { name, email, password, studentId, phone, department, year, semester } = input;
  if (![name, email, password, studentId, department].every((v) => typeof v === 'string' && v.trim())) { const e = new Error('All required fields must be provided'); e.statusCode = 400; throw e; }
  if (!/^\S+@\S+\.\S+$/.test(email) || password.length < 8 || password.length > 128) { const e = new Error('Enter a valid email and a password of at least 8 characters'); e.statusCode = 400; throw e; }
  if (await User.exists({ $or: [{ email: email.toLowerCase().trim() }, { studentId: studentId.trim() }] })) { const e = new Error('Email or student ID is already registered'); e.statusCode = 409; throw e; }
  const user = await User.create({ name: name.trim(), email: email.toLowerCase().trim(), password: await bcrypt.hash(password, 12), studentId: studentId.trim(), phone: typeof phone === 'string' ? phone.trim() : undefined, department: department.trim(), year: year ? Number(year) : 1, semester: Number(semester) });
  return publicUser(user);
}
async function login(email, password) {
  const identity = String(email).trim();
  const user = await User.findOne({ $or: [{ email: identity.toLowerCase() }, { studentId: identity }] }).select('+password');
  if (!user || !(await bcrypt.compare(password, user.password))) { const e = new Error('Invalid email or password'); e.statusCode = 401; throw e; }
  const token = jwt.sign({ sub: user._id.toString(), role: user.role }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN || '1d' });
  return { token, user: publicUser(user) };
}
async function updateProfile(id, updates) { return publicUser(await User.findByIdAndUpdate(id, updates, { new: true, runValidators: true })); }
async function changePassword(id, currentPassword, newPassword) {
  if (typeof newPassword !== 'string' || newPassword.length < 8 || newPassword.length > 128) { const e = new Error('New password must be at least 8 characters'); e.statusCode = 400; throw e; }
  const user = await User.findById(id).select('+password');
  if (!user || !(await bcrypt.compare(currentPassword, user.password))) { const e = new Error('Current password is incorrect'); e.statusCode = 401; throw e; }
  user.password = await bcrypt.hash(newPassword, 12); await user.save();
}
module.exports = { register, login, publicUser, updateProfile, changePassword };
