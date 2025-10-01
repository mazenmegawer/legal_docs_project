-- Insert a Fatwa
INSERT INTO document (doc_type, title)
VALUES ('fatwa', 'فتوى حول جواز المعاملة البنكية')
RETURNING document_id;

INSERT INTO fatwa (document_id, fatwa_number, fatwa_date, subject, facts, application, opinion, session_date)
VALUES (
    currval(pg_get_serial_sequence('document','document_id')),
    'F-001',
    '2020-01-01',
    'الموضوع: المعاملات البنكية',
    'تم عرض حالة تتعلق بحكم التعامل مع البنوك التجارية.',
    'بعد مراجعة القوانين والأدلة الشرعية.',
    'الرأي: الجواز بشروط محددة.',
    '2020-01-15'
);

-- Insert a Judgment
INSERT INTO document (doc_type, title)
VALUES ('judgment', 'حكم في قضية مدنية')
RETURNING document_id;

INSERT INTO judgment (document_id, reference_number, appeal_number, court_name, chamber, facts, reasoning, session_date)
VALUES (
    currval(pg_get_serial_sequence('document','document_id')),
    'J-123/2021',
    'A-456/2021',
    'محكمة النقض',
    'مدني',
    'الوقائع: نزاع حول عقد بيع.',
    'الحيثيات: بناءً على الأوراق والأدلة.',
    '2021-05-15'
);

-- Judgment Principles
INSERT INTO judgment_principle (judgment_id, principle)
VALUES
    (currval(pg_get_serial_sequence('judgment','judgment_id')), 'العقد شريعة المتعاقدين'),
    (currval(pg_get_serial_sequence('judgment','judgment_id')), 'الحق لا يسقط بالتقادم');

-- Insert a Legislation
INSERT INTO document (doc_type, title)
VALUES ('legislation', 'قانون حماية المستهلك')
RETURNING document_id;

INSERT INTO legislation (document_id, legislation_number, issue_date, publication_date, effective_date, source, preamble, signature)
VALUES (
    currval(pg_get_serial_sequence('document','document_id')),
    'Legislation 10/2019',
    '2019-03-10',
    '2019-03-15',
    '2019-06-01',
    'الجريدة الرسمية',
    'الديباجة: يهدف القانون إلى حماية حقوق المستهلك.',
    'رئيس الجمهورية'
);

-- Legislation Articles
INSERT INTO legislation_article (legislation_id, article_number, article_text)
VALUES
    (currval(pg_get_serial_sequence('legislation','legislation_id')), 1, 'المادة 1: يلتزم المورد بتقديم فاتورة للمستهلك.'),
    (currval(pg_get_serial_sequence('legislation','legislation_id')), 2, 'المادة 2: للمستهلك الحق في الاستبدال أو الاسترجاع.');
