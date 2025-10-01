# legal_docs_project








The Postgres container listens on localhost:5555. Connect using port 5555 in DBMS clients

## 📖 Column Name Reference (English ↔ Arabic)

This project uses English column names in the database schema for clarity and compatibility.  
Below is a reference mapping to their Arabic meanings based on the original documents.  

| **Table**     | **Column (English)** | **Meaning (Arabic)**             |
| ------------- | -------------------- | -------------------------------- |
| **documents** | document_id          | رقم المستند                      |
|               | doc_type             | نوع المستند (قانون / حكم / فتوى) |
|               | title                | العنوان                          |
|               | created_at           | تاريخ الإنشاء                    |
|               | updated_at           | تاريخ التحديث                    |
| **fatwas**    | fatwa_id             | رقم الفتوى                       |
|               | document_id          | معرف المستند                     |
|               | fatwa_number         | رقم الفتوي                        |
|               | principle            | المبدأ                           |
|               | subject              | الموضوع                          |
|               | facts                | الوقائع                          |
|               | application          | التطبيق                          |
|               | opinion              | الرأي                            |
| **judgments** | judgment_id          | رقم الحكم                        |
|               | document_id          | معرف المستند                     |
|               | reference_number     | رقم الطعن                        |
|               | appeal_number        | رقم الاستئناف                    |
|               | court_name           | المحكمة                          |
|               | chamber              | الدائرة                          |
|               | principles           | المبادئ القانونية                |
|               | facts                | الوقائع                          |
|               | reasoning            | الحيثيات                         |
|               | ruling               | الحكم                            |
|               | session_date         | تاريخ الجلسة                     |
| **legislations**      | legislation_id               | رقم القانون (معرف)               |
|               | document_id          | معرف المستند                     |
|               | legislation_number           | رقم القانون                      |
|               | issue_date           | تاريخ الإصدار                    |
|               | publication_date     | تاريخ النشر                      |
|               | effective_date       | تاريخ العمل به                   |
|               | source               | الجريدة الرسمية                  |
|               | preamble             | الديباجة                         |
|               | articles             | المواد                           |
|               | signature            | التوقيع                          |

