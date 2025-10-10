// parser/types/Judgment.ts
import { BaseDocument } from "./BaseDocument";

export interface JudgmentPrinciple {
  number: number;   // principle_number
  text: string;     // نص المبدأ
}

export interface JudgmentDocument extends BaseDocument {
  type: "judgment";
  referenceNumber?: string;
  appealNumber?: string;
  courtName?: string;      // المحكمة
  chamber?: string;        // الدائرة
  facts?: string;          // الوقائع
  reasoning?: string;      // الحيثيات
  sessionDate?: string;    // تاريخ الجلسة
  principles?: JudgmentPrinciple[];
}
