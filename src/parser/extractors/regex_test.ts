const line =
  "جمهورية مصر العربية - الفتوى رقم 152 لسنة 2020 رقم الملف 32/2/5026 بتاريخ 2020-01-27 تاريخ الجلسة 2020-01-08";

const match = line.match(
  /الفتوى\s+رقم\s+(\d+)\s+لسنة\s+(\d{4})(?:\s+رقم\s+الملف\s+([\d/]+))?\s+بتاريخ\s+([\d\-\/]+)\s+تاريخ\s+الجلسة\s+([\d\-\/]+)/
);

if (match) {
  const [, num, year, fileNum, fatwaDate, sessionDate] = match;
  const fatwaNumber = `${num}  `;

  console.log({
    fatwaNumber,
    fileNumber: fileNum || null,
    fatwaDate,
    sessionDate,
  });
}
