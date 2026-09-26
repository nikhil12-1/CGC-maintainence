const User = require('../models/User');
const authService = require('../services/authService');

const register = async (req, res, next) => {
  try {
    const requiredFields = ['name', 'email', 'password', 'studentId', 'department', 'semester'];
    const body = req.body || {};
    const missingField = requiredFields.find((field) => body[field] === undefined || body[field] === '');
    if (missingField) return res.status(400).json({ success: false, message: `${missingField} is required` });

    const user = await authService.register(body);
    res.status(201).json({ success: true, message: 'Registration successful', data: { user } });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body || {};
    if (!email || !password) return res.status(400).json({ success: false, message: 'Email and password are required' });

    const result = await authService.login(email, password);
    res.cookie('cgc_token', result.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
      maxAge: Number(process.env.JWT_COOKIE_MAX_AGE_MS) || 86400000
    });
    res.json({ success: true, message: 'Login successful', user: result.user });
  } catch (error) {
    next(error);
  }
};

const getProfile = async (req, res) => {
  res.json({ success: true, message: 'Profile fetched successfully', data: { user: authService.publicUser(req.user) } });
};

const updateProfile = async (req, res, next) => {
  try {
    const allowedFields = ['name', 'phone', 'department', 'year', 'semester'];
    const updates = Object.fromEntries(Object.entries(req.body).filter(([key]) => allowedFields.includes(key)));
    const user = await authService.updateProfile(req.user._id, updates);
    res.json({ success: true, message: 'Profile updated successfully', data: { user } });
  } catch (error) {
    next(error);
  }
};

const changePassword = async (req, res, next) => {
  try {
    const { currentPassword, newPassword } = req.body || {};
    if (!currentPassword || !newPassword) return res.status(400).json({ success: false, message: 'Current and new passwords are required' });
    if (newPassword.length < 8) return res.status(400).json({ success: false, message: 'New password must be at least 8 characters' });

    await authService.changePassword(req.user._id, currentPassword, newPassword);
    res.json({ success: true, message: 'Password changed successfully' });
  } catch (error) {
    next(error);
  }
};

module.exports = { register, login, getProfile, updateProfile, changePassword };
