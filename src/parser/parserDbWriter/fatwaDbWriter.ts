import { pool } from "../../db/db";
import { FatwaDocument } from "../types/FatwaDocument";

export async function insertFatwa(fatwa: Partial<FatwaDocument>) {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");

    // Insert into document table first
    const docInsert = await client.query(
      `INSERT INTO document (doc_type, title)
       VALUES ($1, $2)
       RETURNING document_id`,
      ["fatwa", fatwa.title ?? null],
    );
    const documentId = docInsert.rows[0].document_id;

    // Insert into fatwa table
    await client.query(
      `INSERT INTO fatwa (
         document_id,
         fatwa_number,
         fatwa_date,
         subject,
         facts,
         application,
         opinion,
         session_date,
         issuer,
         principle
       ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`,
      [
        documentId,
        fatwa.fatwaNumber ?? null,
        fatwa.fatwaDate ?? null,
        fatwa.subject ?? null,
        fatwa.facts ?? null,
        fatwa.application ?? null,
        fatwa.opinion ?? null,
        fatwa.sessionDate ?? null,
        fatwa.issuer ?? null,
        fatwa.principle ?? null,
      ]
    );

    await client.query("COMMIT");
    console.log(`Inserted fatwa with documentId ${documentId}`);
    return documentId;
  } catch (error) {
    await client.query("ROLLBACK");
    console.error("Error inserting fatwa:", error);
    throw error;
  } finally {
    client.release();
  }
}
