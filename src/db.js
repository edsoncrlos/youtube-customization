const { Pool } = require('pg');
require('dotenv/config');

const connectionString = process.env.DATABASE_URL;

const db = new Pool({connectionString});

module.exports = db;