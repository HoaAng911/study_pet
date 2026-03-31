const fs = require('fs');

const data = `
Test 1 Reading:
Part 1: 1. B, 2. C, 3. A, 4. B, 5. C.
Part 2: 6. F, 7. D, 8. A, 9. H, 10. C.
Part 3: 11. D, 12. B, 13. A, 14. C, 15. C.
Part 4: 16. G, 17. C, 18. E, 19. A, 20. D.
Part 5: 21. C, 22. A, 23. D, 24. B, 25. C, 26. B.
Part 6: 27. being, 28. for, 29. were, 30. on/about, 31. than, 32. or.

Test 2 Reading:
Part 1: 1. C, 2. A, 3. B, 4. C, 5. B.
Part 2: 6. B, 7. E, 8. H, 9. C, 10. G.
Part 3: 11. B, 12. C, 13. A, 14. D, 15. D.
Part 4: 16. H, 17. F, 18. A, 19. C, 20. E.
Part 5: 21. B, 22. D, 23. C, 24. A, 25. D, 26. B.
Part 6: 27. if/when, 28. of, 29. but, 30. such, 31. the, 32. to.

Test 3 Reading:
Part 1: 1. B, 2. C, 3. B, 4. A, 5. A.
Part 2: 6. G, 7. B, 8. D, 9. E, 10. H.
Part 3: 11. C, 12. A, 13. B, 14. D, 15. C.
Part 4: 16. C, 17. F, 18. D, 19. H, 20. A.
Part 5: 21. D, 22. A, 23. C, 24. B, 25. D, 26. A.
Part 6: 27. so, 28. because, 29. were, 30. my, 31. but, 32. to.

Test 4 Reading:
Part 1: 1. C, 2. A, 3. B, 4. A, 5. C.
Part 2: 6. E, 7. G, 8. C, 9. F, 10. B.
Part 3: 11. B, 12. D, 13. A, 14. C, 15. B.
Part 4: 16. G, 17. B, 18. D, 19. F, 20. A.
Part 5: 21. C, 22. B, 23. A, 24. D, 25. B, 26. C.
Part 6: 27. more, 28. which, 29. of, 30. was, 31. for, 32. at.
`;

const fileMap = {
  "1": "src/data/test5.json",
  "2": "src/data/test6.json",
  "3": "src/data/test7.json",
  "4": "src/data/test8.json"
};

const tests = data.split("Test ");

tests.forEach(t => {
  t = t.trim();
  if (!t) return;
  
  const testNum = t[0];
  if (!fileMap[testNum]) return;
  
  const filePath = fileMap[testNum];
  const lines = t.split("\n").map(l => l.trim());
  
  const answers = {};
  lines.forEach(line => {
    if (line.startsWith("Part")) {
      // e.g. "Part 1: 1. B, 2. C, 3. A, 4. B, 5. C."
      const parts = line.split(":")[1];
      if (!parts) return;
      const qTokens = parts.split(",");
      qTokens.forEach(tok => {
        tok = tok.trim();
        if (!tok) return;
        // e.g. "1. B" or "30. on/about."
        const m = tok.match(/(\d+)\.\s+(.*)/);
        if (m) {
          const qNum = m[1];
          // remove trailing dot if any
          let ansStr = m[2].trim();
          if (ansStr.endsWith(".")) {
               ansStr = ansStr.slice(0, -1);
          }
          answers[qNum] = ansStr;
        }
      });
    }
  });

  console.log(`Parsed ${Object.keys(answers).length} answers for Test ${testNum}`);
  
  const fileDataStr = fs.readFileSync(filePath, 'utf-8');
  let fileData = {};
  if (fileDataStr) {
      fileData = JSON.parse(fileDataStr);
  }
  
  if (fileData.parts) {
    fileData.parts.forEach(part => {
      if (part.questions) {
        part.questions.forEach(q => {
          const qid = q.id;
          const mapRegex = /q(\d+)$/;
          const match = qid.match(mapRegex);
          if (match) {
            const numStr = match[1];
            if (answers[numStr]) {
              q.correctAnswer = answers[numStr];
            }
          }
        });
      }
    });
  }
  
  fs.writeFileSync(filePath, JSON.stringify(fileData, null, 2), 'utf-8');
  console.log(`Updated ${filePath}`);
});

