// parser/extractors/fatwaExtractor.ts
import { FatwaDocument } from "../types/fatwa";

export function extractFatwa(rawText: string): FatwaDocument {
  // For now, just wrap the text into a FatwaDocument
  return {
    type: "fatwa",
    rawText
  };
}
