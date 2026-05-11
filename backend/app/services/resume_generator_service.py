import os
import json
import re
import google.generativeai as genai


class ResumeGeneratorService:

    @staticmethod
    def _init_client():
        api_key = os.getenv("GEMINI_API_KEY2")

        if not api_key:
            raise ValueError("GEMINI_API_KEY not found")

        genai.configure(api_key=api_key)

        return genai.GenerativeModel("gemini-2.5-flash")

    @staticmethod
    def _extract_json(text):
        try:
            text = re.sub(r"```json|```", "", text).strip()
            match = re.search(r"\{.*\}", text, re.DOTALL)

            if match:
                return json.loads(match.group())

        except Exception as e:
            print("GENERATOR JSON ERROR:", str(e))

        return None

    @staticmethod
    def generate_resume(parsed_text: str, job_description: str):
        try:
            model = ResumeGeneratorService._init_client()

            prompt = f"""
                You are a professional resume writer and ATS optimizer.

                Generate a structured resume tailored to the job description.

                Return ONLY JSON. No explanation. No extra text.

                STRICT FORMAT:
                {{
                  "summary": "string",
                  "skills": ["string", "string"],
                  "experience": ["string", "string"],
                  "projects": ["string", "string"],
                  "education": ["string", "string"]
                }}

                Rules:
                - Do NOT include name, email, phone, or links
                - Do NOT include headings like "Summary", "Skills"
                - Each array must contain clean bullet text only
                - No paragraphs inside arrays
                - No markdown or backticks
                - No extra text outside JSON

                Resume:
                {parsed_text}

                Job Description:
                {job_description}
                """

            response = model.generate_content(
                prompt,
                generation_config={
                    "response_mime_type": "application/json"
                }
            )
            raw = response.text.strip()

            parsed = ResumeGeneratorService._extract_json(raw)

            if parsed and isinstance(parsed, dict):
                parsed = {
                    "summary": parsed.get("summary", ""),
                    "skills": parsed.get("skills", []),
                    "experience": parsed.get("experience", []),
                    "projects": parsed.get("projects", []),
                    "education": parsed.get("education", []),
                }
            
                # TYPE SAFETY (CRITICAL)
                for key in ["skills", "experience", "projects", "education"]:
                    if isinstance(parsed[key], str):
                        parsed[key] = [parsed[key]]
            
                return parsed

            return {
                "summary": "",
                "skills": [],
                "experience": [],
                "projects": [],
                "education": []
            }

        except Exception as e:
            print("RESUME GENERATION ERROR:", str(e))

            return {
                "summary": "",
                "skills": [],
                "experience": [],
                "projects": [],
                "education": []
            }