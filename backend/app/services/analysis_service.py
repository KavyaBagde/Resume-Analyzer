import re
from app.services.ai_service import AIService


class AnalysisService:

    @staticmethod
    def analyze(parsed_text: str, job_description: str = None):
        if not parsed_text:
            raise ValueError("Parsed text is empty")

        resume_text = parsed_text.lower()
        jd_text = job_description.lower() if job_description else ""

        # ---------------- KEYWORDS ---------------- #
        resume_keywords = AnalysisService._extract_keywords(resume_text)
        jd_keywords = AnalysisService._extract_keywords(jd_text) if jd_text else []

        matched, missing = AnalysisService._match_keywords(resume_keywords, jd_keywords)

        keyword_score = AnalysisService._calculate_keyword_score(matched, jd_keywords)

        # ---------------- SECTION ANALYSIS ---------------- #
        sections = AnalysisService._detect_sections(parsed_text)

        skills_score = 20 if sections["skills"] else 5
        experience_score = 20 if sections["experience"] else 5

        # ---------------- QUALITY CHECK ---------------- #
        quality_score, quality_flags = AnalysisService._quality_checks(parsed_text)

        # ---------------- FINAL SCORE ---------------- #
        final_score = int(
            (keyword_score * 0.4)
            + (skills_score * 0.2)
            + (experience_score * 0.2)
            + (quality_score * 0.2)
        )

        # ---------------- SUGGESTIONS ---------------- #
        suggestions = AnalysisService._generate_suggestions(
            final_score, missing, quality_flags, sections
        )

        rule_based = {
            "score": final_score,
            "keywordScore": keyword_score,
            "matchedKeywords": matched[:50],
            "missingKeywords": missing[:50],
            "sections": sections,
            "qualityFlags": quality_flags,
            "suggestions": suggestions
        }

        # ---------------- AI ---------------- #
        ai_based = AIService.analyze_with_ai(parsed_text, job_description)

        return {
            "ruleBased": rule_based,
            "aiBased": ai_based
        }

    # ---------------- KEYWORD EXTRACTION ---------------- #
    @staticmethod
    def _extract_keywords(text: str):
        words = re.findall(r'\b[a-zA-Z]{3,}\b', text)

        stop_words = {
            "the", "and", "for", "with", "you", "your",
            "are", "this", "that", "have", "from", "will",
            "can", "all", "any", "not"
        }

        keywords = [w for w in words if w not in stop_words]

        return list(set(keywords))

    # ---------------- MATCHING ---------------- #
    @staticmethod
    def _match_keywords(resume_keywords, jd_keywords):
        if not jd_keywords:
            return [], []

        matched = list(set(resume_keywords) & set(jd_keywords))
        missing = list(set(jd_keywords) - set(resume_keywords))

        return matched, missing

    # ---------------- KEYWORD SCORE ---------------- #
    @staticmethod
    def _calculate_keyword_score(matched, jd_keywords):
        if not jd_keywords:
            return 50

        return min(int((len(matched) / len(jd_keywords)) * 100), 100)

    # ---------------- SECTION DETECTION ---------------- #
    @staticmethod
    def _detect_sections(text: str):
        lower = text.lower()

        return {
            "skills": "skills" in lower,
            "experience": "experience" in lower or "work" in lower,
            "education": "education" in lower,
        }

    # ---------------- QUALITY CHECK ---------------- #
    @staticmethod
    def _quality_checks(text: str):
        flags = []

        length = len(text.split())

        if length < 200:
            flags.append("Resume is too short")

        if length > 1200:
            flags.append("Resume is too long")

        if not re.search(r'\b\d+%|\b\d+\b', text):
            flags.append("No measurable achievements found")

        if not re.search(r'\b(developed|led|managed|built|created)\b', text.lower()):
            flags.append("Weak action verbs usage")

        score = 100

        if flags:
            score -= len(flags) * 10

        return max(score, 40), flags

    # ---------------- SUGGESTIONS ---------------- #
    @staticmethod
    def _generate_suggestions(score, missing_keywords, quality_flags, sections):
        suggestions = []

        # SCORE BASED
        if score < 40:
            suggestions.append("Resume is poorly aligned with job requirements.")
        elif score < 70:
            suggestions.append("Resume can be improved for better job matching.")
        else:
            suggestions.append("Resume is well optimized.")

        # KEYWORDS
        if missing_keywords:
            suggestions.append(
                "Include important keywords: " + ", ".join(missing_keywords[:5])
            )

        # SECTIONS
        if not sections["skills"]:
            suggestions.append("Add a dedicated Skills section.")

        if not sections["experience"]:
            suggestions.append("Add detailed Work Experience section.")

        # QUALITY FLAGS
        suggestions.extend(quality_flags)

        # GENERIC IMPROVEMENTS
        suggestions.append("Use strong action verbs (led, built, optimized).")
        suggestions.append("Add measurable impact (e.g., increased performance by 30%).")

        return suggestions