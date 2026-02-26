import dotenv from 'dotenv';
import app from './app.js';
import { pool } from './config/db.js';

dotenv.config();
const PORT = process.env.PORT || 5000;

const start = async () => {
  try {
    await pool.query('SELECT 1');
    app.listen(PORT, () => {
      console.log(`Backend running at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start backend:', error.message);
    process.exit(1);
  }
};

start();
