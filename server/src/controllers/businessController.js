const businessService = require('../services/businessService');

/**
 * Controller for GET /api/businesses
 */
const getBusinesses = async (req, res, next) => {
  try {
    const { search, category, location, page, limit } = req.query;
    const result = await businessService.getBusinesses({
      search,
      category,
      location,
      page,
      limit,
    });

    res.status(200).json({
      success: true,
      data: result.data,
      pagination: result.pagination,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getBusinesses,
};
