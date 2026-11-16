const locationService = require('../services/locationService');

/**
 * Controller for GET /api/locations
 */
const getLocations = async (req, res, next) => {
  try {
    const locations = await locationService.getLocations();
    res.status(200).json({
      success: true,
      data: locations,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getLocations,
};
