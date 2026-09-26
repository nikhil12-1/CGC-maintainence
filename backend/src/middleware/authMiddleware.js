const jwt = require('jsonwebtoken');
const User = require('../models/User');
module.exports = async function requireAuth(req, res, next) {
  try {
    const header = req.headers.authorization || '';
    const cookie = (req.headers.cookie || '').split(';').map((part) => part.trim()).find((part) => part.startsWith('cgc_token='));
    let cookieToken = '';
    if (cookie) { try { cookieToken = decodeURIComponent(cookie.slice('cgc_token='.length)); } catch (_error) { cookieToken = ''; } }
    const token = cookieToken || (header.startsWith('Bearer ') ? header.slice(7) : '');
    if (!token) return res.status(401).json({ success: false, message: 'Authentication required' });
    const payload = jwt.verify(token, process.env.JWT_SECRET); const user = await User.findById(payload.sub);
    if (!user) return res.status(401).json({ success: false, message: 'Authentication required' });
    req.user = user; next();
  } catch (_error) { return res.status(401).json({ success: false, message: 'Invalid or expired authentication token' }); }
};
