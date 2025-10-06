export type DocumentType = "fatwa" | "judgment" | "legislation";

export interface BaseDocument {
  type: DocumentType;
  title?: string;
  rawText: string;          // extracted text
  createdAt?: string;       // ISO string from DB (TIMESTAMP)
  updatedAt?: string;       // ISO string from DB (TIMESTAMP)
}
