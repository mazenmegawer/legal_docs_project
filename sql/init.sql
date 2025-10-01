-- Core Document table
CREATE TABLE document (
    document_id SERIAL PRIMARY KEY,
    doc_type VARCHAR(20) NOT NULL,  -- (legislation / judgment / fatwa)
    title TEXT,                     -- العنوان
    created_at TIMESTAMP DEFAULT now(),
    updated_at TIMESTAMP DEFAULT now()
);

-- Fatwa
CREATE TABLE fatwa (
    fatwa_id SERIAL PRIMARY KEY,
    document_id INT NOT NULL REFERENCES document(document_id) ON DELETE CASCADE,
    fatwa_number TEXT,
    fatwa_date DATE,
    subject TEXT,       -- الموضوع
    facts TEXT,         -- الوقائع
    application TEXT,   -- التطبيق
    opinion TEXT,       -- الرأي
    session_date DATE   -- تاريخ الجلسة
);

-- Judgment
CREATE TABLE judgment (
    judgment_id SERIAL PRIMARY KEY,
    document_id INT NOT NULL REFERENCES document(document_id) ON DELETE CASCADE,
    reference_number TEXT,
    appeal_number TEXT,
    court_name TEXT,    -- المحكمة
    chamber TEXT,       -- الدائرة
    facts TEXT,         -- الوقائع
    reasoning TEXT,     -- الحيثيات
    session_date DATE   -- تاريخ الجلسة
);

-- Judgment principles
CREATE TABLE judgment_principle (
    principle_id SERIAL PRIMARY KEY,
    judgment_id INT NOT NULL REFERENCES judgment(judgment_id) ON DELETE CASCADE,
    principle_number INT NOT NULL,  -- مبدأ 1، مبدأ 2 ...
    principle_text TEXT NOT NULL    -- نص المبدأ
);

-- Legislation
CREATE TABLE legislation (
    legislation_id SERIAL PRIMARY KEY,
    document_id INT NOT NULL REFERENCES document(document_id) ON DELETE CASCADE,
    legislation_number TEXT,
    issue_date DATE,
    publication_date DATE,
    effective_date DATE,
    source TEXT,       -- المصدر / الجريدة الرسمية
    preamble TEXT,     -- الديباجة
    signature TEXT     -- التوقيع
);

-- Legislation articles
CREATE TABLE legislation_article (
    article_id SERIAL PRIMARY KEY,
    legislation_id INT NOT NULL REFERENCES legislation(legislation_id) ON DELETE CASCADE,
    article_number INT NOT NULL,   -- مادة 1، مادة 2 ...
    article_text TEXT NOT NULL     -- نص المادة
);
