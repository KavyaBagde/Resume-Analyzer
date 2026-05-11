import os
import uuid
from datetime import datetime
from werkzeug.utils import secure_filename
from flask import current_app


class FileService:

    ALLOWED_EXTENSIONS = {"pdf", "docx"}

    @staticmethod
    def _allowed_file(filename: str) -> bool:
        return "." in filename and filename.rsplit(".", 1)[1].lower() in FileService.ALLOWED_EXTENSIONS

    @staticmethod
    def _generate_unique_filename(original_filename: str) -> str:
        ext = original_filename.rsplit(".", 1)[1].lower()
        unique_id = uuid.uuid4().hex
        return f"{unique_id}.{ext}"

    @staticmethod
    def save_temp_file(file):
        """
        Save uploaded file temporarily (for guest users)

        Returns:
        {
            "id": temp_id,
            "path": file_path,
            "createdAt": timestamp
        }
        """

        if not file:
            raise ValueError("No file provided")

        filename = secure_filename(file.filename)

        if not filename:
            raise ValueError("Invalid file name")

        if not FileService._allowed_file(filename):
            raise ValueError("Unsupported file type. Only PDF and DOCX allowed.")

        # Generate unique filename
        unique_filename = FileService._generate_unique_filename(filename)

        # Temp directory (config driven)
        temp_dir = current_app.config.get("TEMP_UPLOAD_FOLDER", "tmp/uploads")

        # Ensure directory exists
        os.makedirs(temp_dir, exist_ok=True)

        file_path = os.path.join(temp_dir, unique_filename)

        # Save file
        file.save(file_path)

        # Generate temp ID (separate from filename)
        temp_id = f"temp_{uuid.uuid4().hex}"

        return {
            "id": temp_id,
            "filename": unique_filename,
            "originalName": filename,
            "path": file_path,
            "createdAt": datetime.utcnow()
        }