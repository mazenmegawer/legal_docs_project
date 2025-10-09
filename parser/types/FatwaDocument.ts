// parser/types/Fatwa.ts
import { BaseDocument } from "./BaseDocument";

export interface FatwaDocument extends BaseDocument {
  type: "fatwa";
  fatwaNumber?: string;
  fatwaDate?: string;       // YYYY-MM-DD
  subject?: string;         // الموضوع
  facts?: string;           // الوقائع
  application?: string;     // التطبيق
  opinion?: string;         // الرأي
  sessionDate?: string;     // تاريخ الجلسة
  issuer?: string;          // المُصدر
  principle?: string;       // المبدأ
}
