import { extractText } from "./utils/docxExtractor";
import { cleanText } from "./utils/textCleaner";
import { detectDocType } from "./utils/docTypeDetector";
import { extractFatwa } from "./extractors/fatwaExtractor";
import { extractJudgment } from "./extractors/judgmentExtractor";
import { extractLegislation } from "./extractors/legislationExtractor";
import * as fs from "node:fs/promises";


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
        const extractedResult = extractFatwa(processedText);
        console.log("Extracted Fatwa:", extractedResult);
        await fs.writeFile("fatwa_output.txt", extractedResult.rawText, { encoding: "utf8" });
    } else if (docType === "judgment") {
        extractedResult = extractJudgment(processedText);
    } else if (docType === "legislation") {
        extractedResult = extractLegislation(processedText);
    } else {
        console.error("Unknown document type");
        process.exit(1);
    }

    console.log(JSON.stringify(extractedResult, null, 2));
    await fs.writeFile("output.txt", extractedResult.preview || extractedResult.raw || "", {
        encoding: "utf8"
    });
    process.stdout.setEncoding("utf8");
    console.log("Output written to output.txt");
}

main();