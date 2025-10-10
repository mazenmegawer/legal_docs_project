export function extractJudgment(text: string): any {
  return { type: "judgment", preview: text.slice(0, 100) };
}
