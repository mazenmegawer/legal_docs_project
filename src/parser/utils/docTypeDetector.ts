export function detectDocType(text: string): "fatwa" | "judgment" | "legislation" | "unknown" {
  if (text.includes("الفتوى")) return "fatwa";
  if (text.includes("محكمة")) return "judgment";
  if (text.includes("قانون")) return "legislation";
  return "unknown";
}
