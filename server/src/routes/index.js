const express = require('express');
const router = express.Router();

const businessRoutes = require('./businessRoutes');
const categoryRoutes = require('./categoryRoutes');
const locationRoutes = require('./locationRoutes');

// Mount API resources
router.use('/businesses', businessRoutes);
router.use('/categories', categoryRoutes);
router.use('/locations', locationRoutes);

// Health check endpoint
router.get('/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    timestamp: new Date().toISOString(),
  });
});

module.exports = router;
