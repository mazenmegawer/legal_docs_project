import express from "express";
import { Pool } from "pg";
import "dotenv/config";


const app = express();
const port = process.env.PORT || 3000;

// Postgres connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// Health check
app.get("/", async (_req, res) => {
  const result = await pool.query("SELECT NOW()");
  res.json({ status: "ok", time: result.rows[0].now });
});

// Get all documents
app.get("/documents", async (_req, res) => {
  const result = await pool.query("SELECT * FROM document");
  res.json(result.rows);
});

app.listen(port, () => {
  console.log(`API running at http://localhost:${port}`);
});



