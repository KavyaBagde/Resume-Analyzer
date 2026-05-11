import fitz  # PyMuPDF
import docx
import os


class ParserService:

    @staticmethod
    def parse(file_path: str) -> str:
        """
        Main entry point for parsing
        """
        if not os.path.exists(file_path):
            raise FileNotFoundError("File not found")

        ext = file_path.split(".")[-1].lower()

        if ext == "pdf":
            return ParserService._parse_pdf(file_path)

        elif ext == "docx":
            return ParserService._parse_docx(file_path)

        else:
            raise ValueError("Unsupported file format for parsing")

    # ---------------- PDF ---------------- #
    @staticmethod
    def _parse_pdf(file_path: str) -> str:
        text = ""

        try:
            doc = fitz.open(file_path)

            for page in doc:
                text += page.get_text()

            doc.close()

        except Exception as e:
            raise Exception(f"PDF parsing failed: {str(e)}")

        return ParserService._clean_text(text)

    # ---------------- DOCX ---------------- #
    @staticmethod
    def _parse_docx(file_path: str) -> str:
        text = ""

        try:
            doc = docx.Document(file_path)

            for para in doc.paragraphs:
                text += para.text + "\n"

        except Exception as e:
            raise Exception(f"DOCX parsing failed: {str(e)}")

        return ParserService._clean_text(text)

    # ---------------- CLEANING ---------------- #
    @staticmethod
    def _clean_text(text: str) -> str:
        """
        Basic cleaning (very important for AI later)
        """
        if not text:
            return ""

        # Remove extra spaces
        text = text.replace("\n", " ")
        text = text.replace("\t", " ")

        # Normalize spaces
        text = " ".join(text.split())

        return text.strip()