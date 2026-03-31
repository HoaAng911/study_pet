import pdfplumber
import re
import json
import os
from tqdm import tqdm

def extract_all_collins():
    pdf_path = "COLLINS for B1 Preliminary (1).pdf"
    output_dir = "src/data/tests_output"
    os.makedirs(output_dir, exist_ok=True)

    all_tests_data = {}
    master_answer_key = {}

    print(f"--- Đang bắt đầu quét toàn bộ 270 trang: {pdf_path} ---")

    with pdfplumber.open(pdf_path) as pdf:
        # GIAI ĐOẠN 1: QUÉT TOÀN BỘ ĐỂ LẤY ANSWER KEY (TẬP TRUNG TRANG 210 ĐẾN HẾT)
        print("Giai đoạn 1: Đang bóc tách Answer Key...")
        for i in range(210, len(pdf.pages)):
            text = pdf.pages[i].extract_text()
            if not text: continue
            
            # Chia khối theo TEST X
            blocks = re.split(r'(TEST\s+\d+)', text, flags=re.IGNORECASE)
            curr_t = None
            for b in blocks:
                if re.match(r'TEST\s+\d+', b, re.IGNORECASE):
                    curr_t = b.strip().lower().replace(" ", "")
                    if curr_t not in master_answer_key: master_answer_key[curr_t] = {}
                elif curr_t:
                    # Lấy cặp Số - Đáp án (Hỗ trợ A-H và cả từ vựng Part 6)
                    # Regex này khớp: "1 C", "2 B", "27 of", "28 they"
                    pairs = re.findall(r'(?<!\w)(\d+)\s+([A-H]|[\w/]+)(?!\w)', b)
                    for q_num, ans in pairs:
                        if 1 <= int(q_num) <= 32:
                            master_answer_key[curr_t][q_num] = ans

        # GIAI ĐOẠN 2: QUÉT TOÀN BỘ ĐỂ LẤY NỘI DUNG READING (TỪ ĐẦU ĐẾN TRANG 210)
        print("Giai đoạn 2: Đang bóc tách nội dung câu hỏi...")
        current_test = None
        # Regex tìm câu hỏi: Số câu + Nội dung + 3 lựa chọn A, B, C
        q_pattern = re.compile(r'(\d+)\s+(.*?)\s+A\s+(.*?)\s+B\s+(.*?)\s+C\s+(.*?)(?=\s+\d+\s+|$)', re.DOTALL)

        for page in tqdm(pdf.pages[:210], desc="Đang quét nội dung"):
            text = page.extract_text()
            if not text: continue

            # Nhận diện Test mới
            t_match = re.search(r'Test\s+(\d+)', text, re.IGNORECASE)
            if t_match:
                current_test = f"test{t_match.group(1)}"
                if current_test not in all_tests_data:
                    all_tests_data[current_test] = []

            if current_test:
                found_qs = q_pattern.findall(text)
                for q in found_qs:
                    q_num, content, opt_a, opt_b, opt_c = q
                    if 1 <= int(q_num) <= 32:
                        # Làm sạch nội dung (fix lỗi dính chữ D vào option C)
                        clean_c = opt_c.split('\nD')[0].split(' D ')[0].strip()
                        
                        all_tests_data[current_test].append({
                            "id": f"q{q_num}",
                            "content": content.strip(),
                            "options": [
                                {"id": "A", "text": opt_a.strip()},
                                {"id": "B", "text": opt_b.strip()},
                                {"id": "C", "text": clean_c}
                            ],
                            "correctAnswer": master_answer_key.get(current_test, {}).get(q_num, ""),
                            "explanation": f"Giải thích cho câu {q_num} của {current_test}."
                        })

    # GIAI ĐOẠN 3: XUẤT FILE
    print("Giai đoạn 3: Đang lưu file JSON...")
    for t_id, qs in all_tests_data.items():
        if qs:
            # Loại bỏ trùng lặp câu hỏi
            unique_qs = list({q['id']: q for q in qs}.values())
            output_file = os.path.join(output_dir, f"{t_id}_reading.json")
            with open(output_file, "w", encoding="utf-8") as f:
                json.dump({"test": t_id, "questions": unique_qs}, f, ensure_ascii=False, indent=2)

    print(f"--- Hoàn tất! Check thư mục: {output_dir} ---")

if __name__ == "__main__":
    extract_all_collins()