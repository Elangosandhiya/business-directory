const categoryService = require('../services/categoryService');

/**
 * Controller for GET /api/categories
 */
const getCategories = async (req, res, next) => {
  try {
    const categories = await categoryService.getCategories();
    res.status(200).json({
      success: true,
      data: categories,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getCategories,
};
