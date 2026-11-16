const fs = require('fs');
const path = require('path');
const { pool } = require('../src/config/db');

const runMigration = async () => {
  console.log('[Migration]: Connecting to PostgreSQL database...');
  const client = await pool.connect();
  try {
    const schemaSql = fs.readFileSync(path.join(__dirname, 'schema.sql'), 'utf8');
    const seedSql = fs.readFileSync(path.join(__dirname, 'seed.sql'), 'utf8');

    console.log('[Migration]: Applying schema.sql...');
    await client.query(schemaSql);
    console.log('[Migration]: schema.sql successfully executed.');

    console.log('[Migration]: Applying seed.sql...');
    await client.query(seedSql);
    console.log('[Migration]: seed.sql successfully executed.');

    console.log('[Migration]: Database migration and seeding completed successfully!');
  } catch (err) {
    console.error('[Migration Error]:', err.message);
    process.exit(1);
  } finally {
    client.release();
    await pool.end();
  }
};

runMigration();
