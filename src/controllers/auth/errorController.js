// src/controllers/errorController.js
import logger from '../../utils/logger.js';
import AppError from '../../utils/AppError.js';


export default (err, req, res, next) => {
  // Log the full error (stack included)
  logger.error('Unhandled Error: %o', err);

  // If it's an operational AppError, send its message
  if (err.isOperational) {
    return res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  }

  // Otherwise, it's an unexpected error—don't leak details
  res.status(500).json({
    status: 'error',
    message: 'Something went wrong!',
  });
};
