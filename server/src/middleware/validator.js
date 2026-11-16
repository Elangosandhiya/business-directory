const { query, validationResult } = require('express-validator');

// Validation rules for GET /api/businesses
const validateBusinessQuery = [
  query('search')
    .optional({ checkFalsy: true })
    .isString()
    .trim()
    .isLength({ max: 100 })
    .withMessage('Search query must be a string of at most 100 characters'),
  query('category')
    .optional({ checkFalsy: true })
    .isString()
    .trim()
    .isLength({ max: 100 })
    .withMessage('Category filter must be a valid string or ID'),
  query('location')
    .optional({ checkFalsy: true })
    .isString()
    .trim()
    .isLength({ max: 100 })
    .withMessage('Location filter must be a valid string'),
  query('page')
    .optional({ checkFalsy: true })
    .isInt({ min: 1 })
    .withMessage('Page parameter must be an integer greater than or equal to 1')
    .toInt(),
  query('limit')
    .optional({ checkFalsy: true })
    .isInt({ min: 1, max: 50 })
    .withMessage('Limit parameter must be an integer between 1 and 50')
    .toInt(),
];

// Middleware to evaluate validation errors
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const formattedErrors = errors.array().map((err) => ({
      field: err.path || err.param,
      message: err.msg,
      value: err.value,
    }));

    return res.status(400).json({
      success: false,
      error: {
        message: 'Invalid query parameters provided',
        status: 400,
        details: formattedErrors,
      },
    });
  }
  next();
};

module.exports = {
  validateBusinessQuery,
  handleValidationErrors,
};
