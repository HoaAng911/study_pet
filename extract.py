import fitz

def extract_pages(pdf_path, start_page, end_page, out_file):
    doc = fitz.open(pdf_path)
    text = ""
    for i in range(start_page, end_page + 1):
        if i < len(doc):
            text += f"\n--- Page {i + 1} ---\n"
            text += doc[i].get_text("text")

    with open(out_file, "w", encoding="utf-8") as f:
        f.write(text)

if __name__ == "__main__":
    extract_pages("b1_preliminary_2_for_the_revised_2020_exam.pdf", 27, 38, "extracted_text_t6.txt")
    extract_pages("b1_preliminary_2_for_the_revised_2020_exam.pdf", 45, 56, "extracted_text_t7.txt")
    extract_pages("b1_preliminary_2_for_the_revised_2020_exam.pdf", 63, 74, "extracted_text_t8.txt")
