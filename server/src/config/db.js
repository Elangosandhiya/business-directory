const { Pool } = require('pg');
require('dotenv').config();
const { categories: seedCategories, businesses: seedBusinesses } = require('./seedData');

// PostgreSQL connection configuration
const poolConfig = process.env.DATABASE_URL
  ? {
      connectionString: process.env.DATABASE_URL,
      connectionTimeoutMillis: 2000,
    }
  : {
      host: process.env.PGHOST || 'localhost',
      port: parseInt(process.env.PGPORT, 10) || 5432,
      database: process.env.PGDATABASE || 'business_directory',
      user: process.env.PGUSER || 'postgres',
      password: process.env.PGPASSWORD || 'postgres',
      connectionTimeoutMillis: 2000,
    };

const pool = new Pool(poolConfig);

let isPostgresAvailable = null;

// Initial connection test
const testConnection = async () => {
  if (isPostgresAvailable !== null) return isPostgresAvailable;
  try {
    const client = await pool.connect();
    await client.query('SELECT 1');
    client.release();
    isPostgresAvailable = true;
    console.log('[Database]: Successfully connected to PostgreSQL server.');
  } catch (err) {
    isPostgresAvailable = false;
    console.warn('[Database Notice]: PostgreSQL server is offline or unreachable. Operating in high-fidelity in-memory mode using Coimbatore seed data.');
  }
  return isPostgresAvailable;
};

// In-memory data store for fallback
let memoryBusinesses = [...seedBusinesses];
let memoryCategories = [...seedCategories];

/**
 * Executes query on PostgreSQL if available, otherwise executes via in-memory engine
 * @param {string} text - SQL query template
 * @param {Array} params - Parameterized values
 */
const query = async (text, params = []) => {
  const pgReady = await testConnection();

  if (pgReady) {
    try {
      return await pool.query(text, params);
    } catch (dbErr) {
      console.error('[Database Error during query, falling back to seed engine]:', dbErr.message);
    }
  }

  // --- In-Memory Query Simulator ---
  const normalized = text.replace(/\s+/g, ' ').trim();

  // 1. Categories query
  if (normalized.includes('FROM categories')) {
    const sorted = [...memoryCategories].sort((a, b) => a.name.localeCompare(b.name));
    return { rows: sorted, rowCount: sorted.length };
  }

  // 2. Locations query
  if (normalized.includes('SELECT DISTINCT location')) {
    const locSet = new Set();
    memoryBusinesses.forEach((b) => {
      if (b.location && b.location.trim()) {
        locSet.add(b.location.trim());
      }
    });
    const sortedLocations = Array.from(locSet).sort().map((loc) => ({ location: loc }));
    return { rows: sortedLocations, rowCount: sortedLocations.length };
  }

  // 3. Businesses queries (Count or Paginated Data)
  // Filter matching
  let filtered = memoryBusinesses.filter((b) => {
    let match = true;

    // Detect search param ($1 if present)
    if (normalized.includes('b.name ILIKE')) {
      const searchParam = params.find((p) => typeof p === 'string' && p.startsWith('%') && p.endsWith('%'));
      if (searchParam) {
        const term = searchParam.slice(1, -1).toLowerCase();
        if (!b.name.toLowerCase().includes(term)) {
          match = false;
        }
      }
    }

    // Detect category param
    if (normalized.includes('b.category_id::text =') || normalized.includes('c.name ILIKE')) {
      // Find category param from values
      const catParam = params.find(
        (p) => typeof p === 'string' && !p.startsWith('%') && (Number.isInteger(Number(p)) || seedCategories.some((c) => c.name.toLowerCase() === p.toLowerCase()))
      );
      if (catParam) {
        const catStr = catParam.toLowerCase();
        const matchesId = b.category_id.toString() === catStr;
        const matchesName = b.category_name && b.category_name.toLowerCase() === catStr;
        if (!matchesId && !matchesName) {
          match = false;
        }
      }
    }

    // Detect location param
    if (normalized.includes('LOWER(b.location) = LOWER(')) {
      const locParam = params.find(
        (p) => typeof p === 'string' && !p.startsWith('%') && seedBusinesses.some((sb) => sb.location.toLowerCase() === p.toLowerCase())
      );
      if (locParam) {
        if (!b.location || b.location.toLowerCase() !== locParam.toLowerCase()) {
          match = false;
        }
      }
    }

    return match;
  });

  // If query is COUNT(*)
  if (normalized.startsWith('SELECT COUNT(*)')) {
    return {
      rows: [{ total: filtered.length }],
      rowCount: 1,
    };
  }

  // Sorting: featured first (is_featured DESC), then newest (created_at DESC)
  filtered.sort((a, b) => {
    if (a.is_featured !== b.is_featured) {
      return a.is_featured ? -1 : 1;
    }
    return new Date(b.created_at) - new Date(a.created_at);
  });

  // Limit and offset from end of params
  const limit = params[params.length - 2] || filtered.length;
  const offset = params[params.length - 1] || 0;

  const paginated = filtered.slice(offset, offset + limit);

  return {
    rows: paginated,
    rowCount: paginated.length,
  };
};

module.exports = {
  pool,
  query,
  testConnection,
};
