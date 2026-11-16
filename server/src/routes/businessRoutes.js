const express = require('express');
const router = express.Router();
const businessController = require('../controllers/businessController');
const { validateBusinessQuery, handleValidationErrors } = require('../middleware/validator');

/**
 * @route   GET /api/businesses
 * @desc    Fetch paginated, filtered businesses (featured first, newest first)
 * @access  Public
 */
router.get('/', validateBusinessQuery, handleValidationErrors, businessController.getBusinesses);

module.exports = router;
