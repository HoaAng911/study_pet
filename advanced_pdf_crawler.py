import pdfplumber
import json
import re
import os
from tqdm import tqdm

def extract_collins_pet():
    # Cấu hình đường dẫn
    pdf_path= r"D:\Github\pet-reading-app\COLLINS for B1 Preliminary (1).pdf"
    output_dir = "src/data/tests_output"
    
    if not os.path.exists(output_dir):
        os.makedirs(output_dir)

    all_data = {}
    answer_key = {}

    print(f"--- Bắt đầu xử lý: {pdf_path} ---")

    with pdfplumber.open(pdf_path) as pdf:
        total_pages = len(pdf.pages)

        # GIAI ĐOẠN 1: QUÉT ĐÁP ÁN (ANSWER KEY)
        # Thường nằm ở các trang cuối của sách Collins
        print("Giai đoạn 1: Đang bóc tách Answer Key từ cuối sách...")
        for i in range(total_pages - 30, total_pages):
            page_text = pdf.pages[i].extract_text()
            if page_text:
                # Tìm mẫu "Test 1 Reading", "Test 2 Reading"...
                # Regex tìm số câu (1-32) và đáp án (A, B, C, D)
                found = re.findall(r'(\d+)\s+([A-D])', page_text)
                for q_num, ans in found:
                    # Lưu vào map để đối chiếu sau
                    answer_key[q_num] = ans

        # GIAI ĐOẠN 2: BÓC TÁCH NỘI DUNG READING
        print("Giai đoạn 2: Đang bóc tách câu hỏi theo từng Test...")
        current_test = None
        
        # Regex nhận diện: Tiêu đề Test, Câu hỏi và 3 lựa chọn A, B, C
        test_pattern = re.compile(r'Test\s+(\d+)', re.IGNORECASE)
        q_pattern = re.compile(r'(\d+)\s+(.*?)\s+A\s+(.*?)\s+B\s+(.*?)\s+C\s+(.*?)(?=\s+\d+\s+|$)', re.DOTALL)

        for page in tqdm(pdf.pages, desc="Tiến trình đọc PDF"):
            text = page.extract_text()
            if not text: continue

            # Kiểm tra tiêu đề Test để chuyển file
            test_match = test_pattern.search(text)
            if test_match:
                current_test = f"test{test_match.group(1)}"
                if current_test not in all_data:
                    all_data[current_test] = []

            if current_test:
                matches = q_pattern.findall(text)
                for match in matches:
                    q_num, content, opt_a, opt_b, opt_c = match
                    
                    # Chỉ lấy phần Reading (Câu 1 đến 32 trong đề PET)
                    if 1 <= int(q_num) <= 32:
                        question_item = {
                            "id": f"q{q_num}",
                            "text": "Choose the correct answer.",
                            "content": content.strip(),
                            "options": [
                                {"id": "A", "text": opt_a.strip()},
                                {"id": "B", "text": opt_b.strip()},
                                {"id": "C", "text": opt_c.strip()}
                            ],
                            # Tự động khớp đáp án từ Answer Key đã quét ở GĐ 1
                            "correctAnswer": answer_key.get(q_num, ""),
                            "explanation": f"Giải thích chi tiết cho câu {q_num} sẽ được cập nhật."
                        }
                        all_data[current_test].append(question_item)

    # GIAI ĐOẠN 3: XUẤT FILE JSON RIÊNG BIỆT
    print("Giai đoạn 3: Đang xuất file JSON...")
    for test_id, questions in all_data.items():
        if questions:
            # Loại bỏ các câu bị trùng lặp do quét nhiều lần
            unique_questions = list({q['id']: q for q in questions}.values())
            
            output_file = os.path.join(output_dir, f"{test_id}_reading.json")
            with open(output_file, "w", encoding="utf-8") as f:
                json.dump({
                    "testId": f"collins-pet-{test_id}",
                    "title": f"Collins B1 Preliminary Reading: {test_id.upper()}",
                    "questions": unique_questions
                }, f, ensure_ascii=False, indent=2)

    print(f"\n--- Xong! Các file JSON nằm trong: {output_dir} ---")

if __name__ == "__main__":
    extract_collins_pet()