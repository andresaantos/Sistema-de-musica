const { pool } = require('pg');

const pool = new pool ({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.DATABASE_URL ? { rejectUnauthorized: false } : false
});

pool.on('connect', () => {
  console.log('✅ Conectado ao banco de dados PostgreSQL!');
});

pool.on('error', (err) => {
  console.error('❌ Erro no banco de dados:', err);
});

module.exports = pool;