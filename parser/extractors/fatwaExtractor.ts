import { FatwaDocument } from "../types/FatwaDocument";

const FIELD_LABELS = {
  subject: ["الموضوع", "موضوع"],
  facts: ["الوقائع"],
  application: ["التطبيق"],
  opinion: ["الرأي", "الرأى"],
  issuer: ["الجهة", "المُصدر", "جهة الإصدار"],
  principle: ["المبدأ", "مبدأ", "المبادئ"],
} as const;

function cleanSection(text: string): string {
  return text
    .replace(/^\s*\d+\s*\n+/u, "")
    .replace(/\n{2,}/g, "\n")
    .trim();
}


function findLabelPositions(text: string) {
  const positions: { field: string; index: number; label: string }[] = [];

  for (const field in FIELD_LABELS) {
    const variants = FIELD_LABELS[field as keyof typeof FIELD_LABELS];
    for (const label of variants) {
      const idx = text.indexOf(label);
      if (idx !== -1) {
        positions.push({ field, index: idx, label });
        break;
      }
    }
  }

  return positions.sort((a, b) => a.index - b.index);
}

function parseHeader(title: string) {
  const tokens = title
    .replace(/[.,،:؛\–—]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .split(" ");

  const result: Record<string, string> = {};

  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i];
    const next = tokens[i + 1] || "";

    if (token === "رقم" && /^\d+$/.test(next)) result.fatwaNumber = next;

    if (["لسنة", "لعام"].includes(token) && /^\d{4}$/.test(next))
      result.fatwaNumber = `${result.fatwaNumber ?? ""} لسنة ${next}`;

    if (token === "الملف") result.fileNumber = next;
    if (token.includes("بتاريخ")) result.fatwaDate = next.replace(/\//g, "-");
    if (token.includes("جلسة")) result.sessionDate = next.replace(/\//g, "-");
  }

  return result;
}

export function extractFatwa(text: string): Partial<FatwaDocument> {
  const result: Partial<FatwaDocument> = { type: "fatwa", rawText: text };

  const lines = text.split("\n");
  let titleLine = lines.find(line => line.includes("الفتوى"))?.trim() ?? "";
  Object.assign(result, parseHeader(titleLine));
  result.title = titleLine;

  const positions = findLabelPositions(text);
  for (let i = 0; i < positions.length; i++) {
    const current = positions[i];
    const next = positions[i + 1];
    const startIndex = text.indexOf(current.label, current.index) + current.label.length;
    const endIndex = next ? next.index : text.length;
    const sectionText = cleanSection(text.slice(startIndex, endIndex).trim());
    (result as any)[current.field] = sectionText;
  }

  return result;
}
