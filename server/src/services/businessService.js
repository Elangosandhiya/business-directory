const db = require('../config/db');

/**
 * Service to fetch paginated businesses with dynamic parameterized filters
 * Sorting: Featured first (is_featured DESC), then newest (created_at DESC)
 */
const getBusinesses = async ({ search, category, location, page = 1, limit = 9 }) => {
  const currentPage = Math.max(1, parseInt(page, 10) || 1);
  const pageSize = Math.min(50, Math.max(1, parseInt(limit, 10) || 9));
  const offset = (currentPage - 1) * pageSize;

  const conditions = [];
  const queryParams = [];
  let paramIndex = 1;

  // 1. Search filter: case-insensitive name substring
  if (search && search.trim() !== '') {
    conditions.push(`b.name ILIKE $${paramIndex}`);
    queryParams.push(`%${search.trim()}%`);
    paramIndex++;
  }

  // 2. Category filter: matches category ID or exact category name
  if (category && category.trim() !== '') {
    conditions.push(`(b.category_id::text = $${paramIndex} OR c.name ILIKE $${paramIndex})`);
    queryParams.push(category.trim());
    paramIndex++;
  }

  // 3. Location filter: case-insensitive exact locality match
  if (location && location.trim() !== '') {
    conditions.push(`LOWER(b.location) = LOWER($${paramIndex})`);
    queryParams.push(location.trim());
    paramIndex++;
  }

  const whereClause = conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : '';

  // Count total matching records
  const countQuery = `
    SELECT COUNT(*) AS total
    FROM businesses b
    LEFT JOIN categories c ON b.category_id = c.id
    ${whereClause}
  `;
  const countResult = await db.query(countQuery, queryParams);
  const total = parseInt(countResult.rows[0].total, 10);
  const totalPages = Math.ceil(total / pageSize) || 1;

  // Fetch paginated records with category metadata
  const dataQuery = `
    SELECT 
      b.id,
      b.name,
      b.description,
      b.category_id,
      c.name AS category_name,
      b.address,
      b.location,
      b.contact_number,
      b.whatsapp_number,
      b.website_url,
      b.image_url,
      b.is_featured,
      b.created_at,
      b.updated_at
    FROM businesses b
    LEFT JOIN categories c ON b.category_id = c.id
    ${whereClause}
    ORDER BY b.is_featured DESC, b.created_at DESC
    LIMIT $${paramIndex} OFFSET $${paramIndex + 1}
  `;

  const dataParams = [...queryParams, pageSize, offset];
  const dataResult = await db.query(dataQuery, dataParams);

  return {
    data: dataResult.rows,
    pagination: {
      page: currentPage,
      limit: pageSize,
      total,
      totalPages,
    },
  };
};

module.exports = {
  getBusinesses,
};
