import json
import os

def patch_sach2():
    # 1. Đường dẫn các thư mục
    answer_key_path = "src/data/answers_key.json"
    sach2_dir = "src/data/sach2" # Đảm bảo đường dẫn này đúng với thực tế của bạn
    
    # Kiểm tra xem file đáp án có tồn tại không
    if not os.path.exists(answer_key_path):
        print(f"❌ Lỗi: Không tìm thấy file {answer_key_path}. Hãy chạy lệnh extract đáp án trước!")
        return

    # 2. Đọc file Master Answer Key
    with open(answer_key_path, "r", encoding="utf-8") as f:
        master_key = json.load(f)

    print("--- Đang bắt đầu điền đáp án cho sách 2 ---")

    # 3. Duyệt qua từng file trong thư mục sach2
    for filename in os.listdir(sach2_dir):
        if filename.endswith(".json"):
            # Lấy test_id từ tên file (ví dụ: test1)
            test_id = filename.split("_")[0]
            file_path = os.path.join(sach2_dir, filename)

            with open(file_path, "r", encoding="utf-8") as f:
                data = json.load(f)

            # Cập nhật correctAnswer cho từng câu hỏi
            count = 0
            for q in data.get("questions", []):
                q_num = q["id"].replace("q", "") # Chuyển "q1" thành "1"
                
                # Tìm đáp án trong master_key
                if test_id in master_key and q_num in master_key[test_id]:
                    q["correctAnswer"] = master_key[test_id][q_num]
                    count += 1
            
            # Lưu lại file đã được điền đáp án
            with open(file_path, "w", encoding="utf-8") as f:
                json.dump(data, f, ensure_ascii=False, indent=2)
            
            print(f"✅ Đã điền {count} đáp án vào file {filename}")

if __name__ == "__main__":
    patch_sach2()