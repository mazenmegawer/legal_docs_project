// parser/types/Legislation.ts
import { BaseDocument } from "./document";

export interface LegislationArticle {
  number: number;   // article_number
  text: string;     // article_text
}

export interface LegislationDocument extends BaseDocument {
  type: "legislation";
  legislationNumber?: string;
  issueDate?: string;         // تاريخ الإصدار
  publicationDate?: string;   // تاريخ النشر
  effectiveDate?: string;     // تاريخ العمل بالقانون
  source?: string;            // المصدر / الجريدة الرسمية
  preamble?: string;          // الديباجة
  signature?: string;         // التوقيع
  articles?: LegislationArticle[];
}
