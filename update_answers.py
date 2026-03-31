import json
import re
import os

data = """
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
"""

tests = data.strip().split("Test ")

file_map = {
    "1": "src/data/test5.json",
    "2": "src/data/test6.json",
    "3": "src/data/test7.json",
    "4": "src/data/test8.json"
}

for t in tests:
    if not t.strip(): continue
    test_num = t[0]
    if test_num not in file_map: continue
    
    lines = t.strip().split("\n")
    
    # parse answers
    answers = {}
    for line in lines[1:]:
        if not line.startswith("Part"): continue
        # Part X: 1. B, 2. C, ...
        # match patterns like 1. B
        matches = re.findall(r'(\d+)\.\s+([a-zA-Z/]+)', line)
        for num, ansStr in matches:
            answers[str(num)] = ansStr
            
    print(f"Test {test_num} parsed {len(answers)} answers")
    
    filepath = file_map[test_num]
    with open(filepath, 'r', encoding='utf-8') as f:
        file_data = json.load(f)
        
    for part in file_data.get('parts', []):
        for q in part.get('questions', []):
            qid = q['id'] # e.g. t5-q1, t6-q32
            # extract number from id
            m = re.search(r'q(\d+)$', qid)
            if m:
                q_num = m.group(1)
                if q_num in answers:
                    q['correctAnswer'] = answers[q_num]
                    
    with open(filepath, 'w', encoding='utf-8') as f:
        json.dump(file_data, f, indent=2, ensure_ascii=False)
    
    print(f"Updated {filepath}")
