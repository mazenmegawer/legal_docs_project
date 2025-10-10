import { extractText } from "./utils/docxExtractor";
import { cleanText } from "./utils/textCleaner";
import { detectDocType } from "./utils/docTypeDetector";
import { extractFatwa } from "./extractors/fatwaExtractor";
import { extractJudgment } from "./extractors/judgmentExtractor";
import { extractLegislation } from "./extractors/legislationExtractor";
import { insertFatwa } from "./parserDbWriter/fatwaDbWriter";
import * as fs from "node:fs/promises";
import path from "path";

async function main() {
  const filePath = process.argv[2];
  if (!filePath) {
    console.error("Please provide a DOCX file path");
    process.exit(1);
  }

  const rawText = await extractText(filePath);
  const processedText = cleanText(rawText);
  const docType = detectDocType(processedText);

  let extractedResult: any;

  if (docType === "fatwa") {
    extractedResult = extractFatwa(processedText);
    console.log("Extracted fatwa:", filePath);

    try {
      await insertFatwa(extractedResult);
    } catch (dbErr) {
      console.error("Failed to insert into DB:", dbErr);
      process.exit(1);
    }

    const outputName = path.basename(filePath, path.extname(filePath)) + ".json";
    await fs.writeFile(outputName, JSON.stringify(extractedResult, null, 2), {
      encoding: "utf8",
    });
    console.log(`Structured output written to ${outputName}`);

  } else if (docType === "judgment") {
    extractedResult = extractJudgment(processedText);
    console.warn("Judgment extraction not yet supported for DB insertion.");
  } else if (docType === "legislation") {
    extractedResult = extractLegislation(processedText);
    console.warn("Legislation extraction not yet supported for DB insertion.");
  } else {
    console.error("Unknown document type:", docType);
    process.exit(1);
  }
}

main().catch(err => {
  console.error("Fatal error in main:", err);
  process.exit(1);
});
