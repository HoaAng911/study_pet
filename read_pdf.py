import sys
try:
    import fitz  # PyMuPDF
except ImportError:
    print("PyMuPDF not installed")
    sys.exit(1)

def extract_text(pdf_path, output_path):
    doc = fitz.open(pdf_path)
    text = ""
    for page in doc:
        text += page.get_text()
    
    with open(output_path, "w", encoding="utf-8") as f:
        f.write(text)
    print("Extracted to", output_path)

if __name__ == "__main__":
    extract_text("B1 Preliminary 1.pdf", "pdf_extracted.txt")
