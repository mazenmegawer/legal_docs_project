// parser/extractors/fatwaExtractor.ts
import { FatwaDocument } from "../types/FatwaDocument";

export const FIELD_LABELS = {
  fatwaNumber: ["الفتوي رقم", "رقم الفتوي"],
  fatwaDate: ["تاريخ الفتوى", "تاريخ إصدار الفتوى"],
  subject: ["الموضوع"],
  facts: ["الوقائع"],
  application: ["التطبيق"],
  opinion: ["الرأي", "الرأى"],
  sessionDate: ["تاريخ الجلسة"],
  issuer: ["الجهة", "المُصدر", "جهة الإصدار"],
  principle: ["المبدأ", "مبدأ", "المبادئ"],
} as const;


function escapeRegExp(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function extractField(text: string, field: keyof typeof FIELD_LABELS): string {
  const labels = FIELD_LABELS[field];
  const allLabels = Object.values(FIELD_LABELS).flat();

  const pattern = new RegExp(
    `(?:${labels.map(escapeRegExp).join("|")})\\s*([\\s\\S]*?)(?=(?:${allLabels
      .map(escapeRegExp)
      .join("|")})|$)`,
    "i"
  );

  const match = text.match(pattern);
  return match ? match[1].trim() : "";
}

export function extractFatwa(text: string): Partial<FatwaDocument> {
  const result: Partial<FatwaDocument> = { rawText: text, type: "fatwa" };

  for (const field of Object.keys(FIELD_LABELS) as (keyof typeof FIELD_LABELS)[]) {
    result[field] = extractField(text, field);
  }

  return result;
}
