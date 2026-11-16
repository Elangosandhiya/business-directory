const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const apiRoutes = require('./routes');
const { errorHandler, notFoundHandler } = require('./middleware/errorHandler');

const app = express();

// Security HTTP headers
app.use(helmet());

// CORS Configuration
const allowedOrigin = process.env.CLIENT_URL || 'http://localhost:5173';
app.use(
  cors({
    origin: allowedOrigin === '*' ? true : allowedOrigin,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

// HTTP request logger
if (process.env.NODE_ENV !== 'test') {
  app.use(morgan('dev'));
}

// Global Rate Limiting: 200 requests per 15 minutes
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 200,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    error: {
      message: 'Too many requests from this IP, please try again after 15 minutes',
      status: 429,
    },
  },
});
app.use('/api', limiter);

// Parse JSON request bodies
app.use(express.json());

// Mount API routes
app.use('/api', apiRoutes);

// Root route
app.get('/', (req, res) => {
  res.json({
    name: 'Coimbatore Business Directory API',
    version: '1.0.0',
    documentation: '/api/businesses',
  });
});

// 404 Handler for undefined routes
app.use(notFoundHandler);

// Central Error Handler
app.use(errorHandler);

module.exports = app;
