
class AppError extends Error {
    /**
     * @param {string} message — Human‐readable description of the error
     * @param {number} statusCode — HTTP status code (e.g., 400, 401, 404, 500)
     */
    constructor(message, statusCode) {
      super(message);

      this.statusCode = statusCode;
      // ‘fail’ for 4xx errors, ‘error’ for 5xx
      this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
      this.isOperational = true; // mark as trusted error we can send to client

      Error.captureStackTrace(this, this.constructor);
    }
  }

  export default AppError;
