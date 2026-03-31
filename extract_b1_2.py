import sys
import fitz

def extract_text(pdf_path, output_path):
    print(f"Opening {pdf_path}...")
    try:
        doc = fitz.open(pdf_path)
    except Exception as e:
        print(f"Cannot open {pdf_path}: {e}")
        return
        
    text = ""
    for page in doc:
        text += page.get_text()
    
    with open(output_path, "w", encoding="utf-8") as f:
        f.write(text)
    print("Extracted to", output_path)

if __name__ == "__main__":
    extract_text("b1_preliminary_2_for_the_revised_2020_exam.pdf", "b1_2_extracted.txt")
