import { extractText } from "./utils/docxExtractor";
import { cleanText } from "./utils/textCleaner";
import { detectDocType } from "./utils/docTypeDetector";
import { extractFatwa } from "./extractors/fatwaExtractor";
import { extractJudgment } from "./extractors/judgmentExtractor";
import { extractLegislation } from "./extractors/legislationExtractor";
import { insertFatwa } from "./parserDbWriter/fatwaDbWriter";
import * as fs from "node:fs/promises";
import path from "path";

async function processFile(filePath: string) {
  try {
    const rawText = await extractText(filePath);
    const processedText = cleanText(rawText);
    const docType = detectDocType(processedText);

    let extractedResult: any;

    if (docType === "fatwa") {
      extractedResult = extractFatwa(processedText);
      console.log(`Extracted fatwa: ${filePath}`);

      try {
        await insertFatwa(extractedResult);
      } catch (dbErr) {
        console.error(`Failed to insert ${filePath} into DB:`, dbErr);
        return;
      }

      const outputName =
        path.basename(filePath, path.extname(filePath)) + ".json";
      await fs.writeFile(outputName, JSON.stringify(extractedResult, null, 2), {
        encoding: "utf8",
      });
      console.log(`Json output written to ${outputName}`);
    } else {
      console.warn(`Unknown document type for ${filePath}, skipping.`);
    }
  } catch (err) {
    console.error(`Error processing ${filePath}:`, err);
  }
}

async function main() {
  const filePaths = process.argv.slice(2);
  if (filePaths.length === 0) {
    console.error("Please provide one or more DOCX file paths");
    process.exit(1);
  }

  console.log(`Starting parser for ${filePaths.length} file(s)...`);

  for (const filePath of filePaths) {
    await processFile(filePath);
  }

  console.log("All fatwas processed and inserted.");
}

main().catch((err) => {
  console.error("Fatal error in main:", err);
  process.exit(1);
});
