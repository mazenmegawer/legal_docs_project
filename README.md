# legal_docs_project
## 📖 Column Name Reference (English ↔ Arabic)

This project uses **English column names** in the database schema for clarity and compatibility.  
Below is a reference mapping to their **Arabic meanings** based on the original documents.  

| **Table**   | **Column (English)** | **Meaning (Arabic)** |
|-------------|-----------------------|-----------------------|
| **documents** | document_id | رقم المستند |
|             | doc_type    | نوع المستند (قانون / حكم / فتوى) |
|             | title       | العنوان |
|             | reference_number | رقم المرجع |
|             | issue_date  | تاريخ الإصدار |
|             | session_date | تاريخ الجلسة |
|             | created_at  | تاريخ الإنشاء |
|             | updated_at  | تاريخ التحديث |
| **fatwas**  | fatwa_id    | رقم الفتوى |
|             | document_id | معرف المستند |
|             | file_number | رقم الملف |
|             | principle   | المبدأ |
|             | subject     | الموضوع |
|             | facts       | الوقائع |
|             | application | التطبيق |
|             | opinion     | الرأي |
| **judgments** | judgment_id | رقم الحكم |
|             | document_id | معرف المستند |
|             | appeal_number | رقم الطعن |
|             | court_name  | المحكمة |
|             | chamber     | الدائرة |
|             | principles  | المبادئ القانونية |
|             | facts       | الوقائع |
|             | reasoning   | الحيثيات |
|             | ruling      | الحكم |
| **laws**    | law_id      | رقم القانون (معرف) |
|             | document_id | معرف المستند |
|             | law_number  | رقم القانون |
|             | publication_date | تاريخ النشر |
|             | effective_date | تاريخ العمل به |
|             | source      | الجريدة الرسمية |
|             | preamble    | الديباجة |
|             | articles    | المواد |
|             | signature   | التوقيع |
