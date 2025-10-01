export function extractFatwa(text: string): any {

return { type: "fatwa", preview: text.slice(0, 200)};

}
