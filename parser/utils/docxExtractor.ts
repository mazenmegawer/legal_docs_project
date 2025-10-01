// parser/utils/docxExtractor.ts
import * as fs from "node:fs/promises";
import mammoth from "mammoth";

/**
 * Extract plain text from a DOCX file using mammoth
 */
export async function extractText(filePath: string): Promise<string> {
  try {
    const buffer = await fs.readFile(filePath);
    const result = await mammoth.extractRawText({ buffer });
    return result.value; // plain text
  } catch (err) {
    console.error("Error extracting DOCX:", err);
    throw err;
  }
}
