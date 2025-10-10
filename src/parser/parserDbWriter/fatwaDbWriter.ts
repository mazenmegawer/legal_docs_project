import {Pool} from "pg";
import "dotenv/config";
import { FatwaDocument } from "../types/FatwaDocument";

export async function insertFatwa(fatwa: Partial<FatwaDocument>): Promise<void> {
  const client = new Pool({
    connectionString: process.env.DATABASE_URL,
  });
  try {
    await client.query("BEGIN");

    const docInsert = await client.query(
      `INSERT INTO document (doc_type, title)
       VALUES ($1, $2)
       ON CONFLICT (title) DO UPDATE SET doc_type = EXCLUDED.doc_type
       RETURNING document_id`,
      ["fatwa", fatwa.title ?? null]
    );
    const documentId = docInsert.rows[0].document_id;

    await client.query(
      `INSERT INTO fatwa (
         document_id, fatwa_number, fatwa_date, subject, facts,
         application, opinion, session_date, issuer, principle
       )
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)
       ON CONFLICT (fatwa_number)
       DO UPDATE SET
         fatwa_date = EXCLUDED.fatwa_date,
         subject = EXCLUDED.subject,
         facts = EXCLUDED.facts,
         application = EXCLUDED.application,
         opinion = EXCLUDED.opinion,
         session_date = EXCLUDED.session_date,
         issuer = EXCLUDED.issuer,
         principle = EXCLUDED.principle;`,
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
  } catch (err) {
    await client.query("ROLLBACK");
    console.error("Error inserting fatwa:", err);
  } finally {
    await client.end();
  }
}
