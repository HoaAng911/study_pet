import fitz

def scan_pdf(pdf_path):
    try:
        doc = fitz.open(pdf_path)
        print(f"Total pages: {len(doc)}")
        
        # Look for "Test" titles in the first 20 pages
        for i in range(min(20, len(doc))):
            page = doc[i]
            text = page.get_text()
            if "Test" in text:
                print(f"Page {i+1} might contain a Test title:")
                print(text[:200])
                print("-" * 20)
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    scan_pdf("COLLINS for B1 Preliminary (1).pdf")
