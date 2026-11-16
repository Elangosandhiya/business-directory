const db = require('../config/db');

/**
 * Service to fetch all business categories
 */
const getCategories = async () => {
  const query = `
    SELECT id, name, created_at
    FROM categories
    ORDER BY name ASC
  `;
  const result = await db.query(query, []);
  return result.rows;
};

module.exports = {
  getCategories,
};
