const db = require('../config/db');

/**
 * Service to fetch all distinct business locations for filter options
 */
const getLocations = async () => {
  const query = `
    SELECT DISTINCT location
    FROM businesses
    WHERE location IS NOT NULL AND TRIM(location) <> ''
    ORDER BY location ASC
  `;
  const result = await db.query(query, []);
  return result.rows.map((row) => row.location);
};

module.exports = {
  getLocations,
};
