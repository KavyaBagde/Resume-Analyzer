import os
import json
import re
import google.generativeai as genai


class AIService:

    @staticmethod
    def _init_client():
        api_key = os.getenv("GEMINI_API_KEY")

        if not api_key:
            raise ValueError("GEMINI_API_KEY not found in environment variables")

        genai.configure(api_key=api_key)

        return genai.GenerativeModel("gemini-2.5-flash-lite")

    @staticmethod
    def _extract_json(text: str):
        """
        Extract JSON from model response (handles markdown/code blocks)
        """
        try:
            # Remove ```json ``` wrappers if present
            text = re.sub(r"```json|```", "", text).strip()

            # Extract JSON block using regex
            match = re.search(r"\{.*\}", text, re.DOTALL)

            if match:
                return json.loads(match.group())

        except Exception as e:
            print("JSON PARSE ERROR:", str(e))

        return None

    @staticmethod
    def analyze_with_ai(resume_text: str, job_description: str = None):
        """
        AI-based resume analysis using Gemini
        """

        try:
            model = AIService._init_client()

            prompt = f"""
You are an advanced ATS (Applicant Tracking System).

Return ONLY valid JSON. Do NOT wrap in markdown or code blocks.

Format:
{{
  "score": number,
  "strengths": [string],
  "weaknesses": [string],
  "suggestions": [string]
}}

Resume:
{resume_text}

Job Description:
{job_description if job_description else "Not provided"}
"""

            response = model.generate_content(prompt)

            raw_text = response.text.strip()

            parsed = AIService._extract_json(raw_text)

            if parsed:
                return parsed

            # fallback if parsing fails
            return {
                "score": None,
                "strengths": [],
                "weaknesses": [],
                "suggestions": ["AI response parsing failed", raw_text]
            }

        except Exception as e:
            print("AI SERVICE ERROR:", str(e))

            return {
                "score": None,
                "strengths": [],
                "weaknesses": [],
                "suggestions": ["AI analysis failed"]
            }