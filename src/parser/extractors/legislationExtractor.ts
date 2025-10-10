export function extractLegislation(text: string): any {
  return { type: "legislation", preview: text.slice(0, 100) };
}