/**
 * 404 Not Found Handler
 */
const notFoundHandler = (req, res, next) => {
  res.status(404).json({
    success: false,
    error: {
      message: `Endpoint ${req.method} ${req.originalUrl} not found`,
      status: 404,
      details: null,
    },
  });
};

/**
 * Central Error Handler
 */
const errorHandler = (err, req, res, next) => {
  console.error('[Error Caught]:', err);

  const status = err.status || err.statusCode || 500;
  const message = err.message || 'Internal Server Error';

  res.status(status).json({
    success: false,
    error: {
      message,
      status,
      details: process.env.NODE_ENV === 'development' ? err.stack : undefined,
    },
  });
};

module.exports = {
  notFoundHandler,
  errorHandler,
};
