import express from "express";
import { Pool } from "pg";
import "dotenv/config";

const app = express();
const port = process.env.PORT || 3000;

// PostgreSQL connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// Health check
app.get("/", async (_req, res) => {
  try {
    const result = await pool.query("SELECT NOW()");
    res.json({ status: "ok", time: result.rows[0].now });
  } catch (err) {
    console.error("Health check failed:", err);
    res.status(500).json({ error: "Database connection failed" });
  }
});

app.get("/fatwas", async (_req, res) => {
  try {
    const result = await pool.query(`
      SELECT 
        fatwa_id AS id,
        fatwa_number AS number,
        TO_CHAR(fatwa_date, 'YYYY-MM-DD') AS date,
        subject,
        issuer,
        principle,
        facts,
        application,
        opinion,
        TO_CHAR(session_date, 'YYYY-MM-DD') AS session_date
      FROM fatwa
      ORDER BY fatwa_id DESC;
    `);

    // more readible JSON output
    res.setHeader("Content-Type", "application/json; charset=utf-8");
    res.send(JSON.stringify(result.rows, null, 2)); 
  } catch (err) {
    console.error("Error fetching fatwas:", err);
    res.status(500).json({ error: "Failed to fetch fatwas" });
  }
});

app.listen(port, () => {
  console.log(`API running at http://localhost:${port}`);
});
