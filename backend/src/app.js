const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const authRoutes = require('./routes/authRoutes');
const complaintRoutes = require('./routes/complaintRoutes');
const requireAuth = require('./middleware/authMiddleware');
const homeController = require('./controllers/homeController');
const errorHandler = require('./middleware/errorMiddleware');
const { apiLimiter } = require('./middleware/rateLimiter');

const app = express();
app.disable('x-powered-by');
app.use(helmet());
const allowedOrigins = (process.env.CLIENT_URL || 'http://localhost:4200').split(',').map((origin) => origin.trim());
app.use(cors({ origin(origin, callback) { callback(null, !origin || allowedOrigins.includes(origin)); }, credentials: true }));
app.use((req, res, next) => {
  if (['POST', 'PUT', 'PATCH', 'DELETE'].includes(req.method) && req.headers.origin && !allowedOrigins.includes(req.headers.origin)) {
    return res.status(403).json({ success: false, message: 'Request origin is not allowed' });
  }
  next();
});
app.use(express.json({ limit: '1mb' }));
app.get('/api/health', (_req, res) => res.json({ success: true, status: 'ok' }));
app.use('/api', apiLimiter);
app.use('/api/auth', authRoutes);
app.use('/api/complaints', complaintRoutes);
app.get('/api/dashboard', requireAuth, homeController.summary);
app.use((_req, res) => res.status(404).json({ success: false, message: 'Resource not found' }));
app.use(errorHandler);
module.exports = app;
