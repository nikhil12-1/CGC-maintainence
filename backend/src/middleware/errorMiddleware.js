const mongoose = require('mongoose');
const multer = require('multer');

const errorHandler = (error, req, res, next) => {
  let statusCode = error.statusCode || 500;
  let message = statusCode >= 500 ? 'Something went wrong. Please try again.' : (error.message || 'Something went wrong. Please try again.');

  if (error instanceof multer.MulterError) {
    statusCode = 400;
    message = error.code === 'LIMIT_FILE_SIZE' ? 'Each file must be 5 MB or smaller' : 'Invalid file upload';
  } else if (error.name === 'ValidationError') {
    statusCode = 400;
    message = Object.values(error.errors).map((item) => item.message).join(', ');
  } else if (error.code === 11000) {
    statusCode = 409;
    message = 'A record with that value already exists';
  } else if (error instanceof mongoose.Error.CastError) {
    statusCode = 404;
    message = 'Resource not found';
  }

  if (statusCode >= 500) console.error(error);
  res.status(statusCode).json({ success: false, message });
};

module.exports = errorHandler;
