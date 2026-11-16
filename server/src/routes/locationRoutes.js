const express = require('express');
const router = express.Router();
const locationController = require('../controllers/locationController');

/**
 * @route   GET /api/locations
 * @desc    Fetch distinct locations for filtering
 * @access  Public
 */
router.get('/', locationController.getLocations);

module.exports = router;
