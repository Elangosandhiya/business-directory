const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');

/**
 * @route   GET /api/categories
 * @desc    Fetch all available business categories
 * @access  Public
 */
router.get('/', categoryController.getCategories);

module.exports = router;
