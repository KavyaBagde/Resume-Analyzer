import jwt
import os

from flask import request
from bson import ObjectId
from datetime import datetime

from app.services.file_service import FileService
from app.services.parser_service import ParserService
from app.services.analysis_service import AnalysisService
from app.services.temp_store import TempStore
from app.services.resume_generator_service import ResumeGeneratorService
from app.models.resume_model import ResumeModel

from app.services.credit_service import CreditService


def get_optional_user():
    try:
        auth_header = request.headers.get("Authorization")

        if not auth_header:
            return None

        token = auth_header.split(" ")[1]

        decoded = jwt.decode(
            token,
            os.getenv("JWT_SECRET"),
            algorithms=["HS256"]
        )

        user_id = decoded.get("user_id") or decoded.get("userId")

        if not user_id:
            return None

        return {"id": user_id}

    except Exception:
        return None


# ================= UPLOAD =================
def upload_resume():
    try:
        file = request.files.get("file")
        job_desc = request.form.get("jobDescription")

        if not file:
            return {"success": False, "message": "File is required"}, 400

        file_data = FileService.save_temp_file(file)

        try:
            parsed_text = ParserService.parse(file_data["path"])
        except Exception as parse_error:
            print("PARSING ERROR:", str(parse_error))
            return {"success": False, "message": "Failed to parse resume file"}, 500

        if not parsed_text:
            return {"success": False, "message": "No readable content found"}, 400

        try:
            analysis = AnalysisService.analyze(parsed_text, job_desc)
        except Exception as analysis_error:
            print("ANALYSIS ERROR:", str(analysis_error))
            return {"success": False, "message": "Analysis failed"}, 500

        user = get_optional_user()

        if user:
            if not CreditService.has_enough_credits(user["id"], "base_analysis"):
                return {
                    "success": False,
                    "message": "Not enough credits",
                    "required": CreditService.get_cost("base_analysis")
                }, 403

            CreditService.deduct(user["id"], "base_analysis")

        TempStore.save(file_data["id"], {
            "fileName": file_data["originalName"],
            "filePath": file_data["path"],
            "parsedText": parsed_text,
            "analysis": analysis
        })

        return {
            "success": True,
            "data": {
                "resumeId": file_data["id"],
                "fileName": file_data["originalName"],
                "parsedText": parsed_text[:1000],
                "analysis": analysis
            }
        }, 200

    except Exception as e:
        print("UPLOAD ERROR:", str(e))
        return {"success": False, "message": "Something went wrong"}, 500


# ================= CLAIM =================
def claim_resume(user):
    try:
        data = request.get_json()
        temp_id = data.get("resumeId")

        if not temp_id:
            return {"success": False, "message": "resumeId is required"}, 400

        temp_data = TempStore.get(temp_id)

        if not temp_data:
            return {"success": False, "message": "Temp resume expired"}, 404

        resume_id = ResumeModel.create({
            "userId": user["id"],
            "fileName": temp_data["fileName"],
            "filePath": temp_data["filePath"],
            "parsedText": temp_data["parsedText"],
            "analysis": temp_data["analysis"]
        })

        TempStore.delete(temp_id)

        saved_resume = ResumeModel.get_by_id(resume_id)

        return {
            "success": True,
            "data": saved_resume
        }, 200

    except Exception as e:
        print("CLAIM ERROR:", str(e))
        return {"success": False, "message": "Failed to claim"}, 500


# ================= GET USER RESUMES =================
def get_user_resumes(user):
    try:
        resumes = ResumeModel.get_by_user(user["id"])

        return {
            "success": True,
            "data": resumes
        }, 200

    except Exception as e:
        print("FETCH ERROR:", str(e))
        return {"success": False, "message": "Failed to fetch resumes"}, 500


# ================= JD ANALYSIS =================
def analyze_with_jd(user, resume_id):
    try:
        data = request.get_json()
        job_desc = data.get("jobDescription")

        if not job_desc:
            return {"success": False, "message": "Job description required"}, 400

        if not ObjectId.is_valid(resume_id):
            return {
                "success": False,
                "message": "Invalid resume ID (must claim resume first)"
            }, 400

        resume = ResumeModel.get_by_id(resume_id)

        if not resume:
            return {"success": False, "message": "Resume not found"}, 404

        if resume["userId"] != user["id"]:
            return {"success": False, "message": "Unauthorized"}, 403

        parsed_text = resume.get("parsedText")

        if not parsed_text:
            return {"success": False, "message": "Resume content missing"}, 400

        analysis = AnalysisService.analyze(parsed_text, job_desc)

        jd_entry = {
            "_id": f"jd_{ObjectId()}",
            "jobDescription": job_desc,
            "analysis": analysis,
            "createdAt": datetime.utcnow()
        }

        updated_resume = ResumeModel.add_jd_analysis(resume_id, jd_entry)

        CreditService.deduct(user["id"], "jd_analysis")

        return {
            "success": True,
            "data": jd_entry,
            "resume": updated_resume
        }, 200

    except Exception as e:
        print("JD ANALYSIS ERROR:", str(e))
        return {"success": False, "message": "JD analysis failed"}, 500


# ================= GENERATE RESUME =================
def generate_resume(user, resume_id):
    try:
        data = request.get_json()
        jd_id = data.get("jdId")

        if not jd_id:
            return {"success": False, "message": "jdId required"}, 400

        resume = ResumeModel.get_by_id(resume_id)

        if not resume:
            return {"success": False, "message": "Resume not found"}, 404

        if resume["userId"] != user["id"]:
            return {"success": False, "message": "Unauthorized"}, 403

        parsed_text = resume.get("parsedText")
        jd_list = resume.get("jdAnalyses", [])

        jd_data = next((jd for jd in jd_list if jd["_id"] == jd_id), None)

        if not jd_data:
            return {"success": False, "message": "JD not found"}, 404

        job_desc = jd_data["jobDescription"]

        generated = ResumeGeneratorService.generate_resume(
            parsed_text,
            job_desc
        )

        gen_entry = {
            "_id": f"gen_{ObjectId()}",
            "jdId": jd_id,
            "content": generated,
            "createdAt": datetime.utcnow()
        }

        updated_resume = ResumeModel.add_generated_resume(resume_id, gen_entry)

        CreditService.deduct(user["id"], "generate_resume")

        return {
            "success": True,
            "data": gen_entry,
            "resume": updated_resume
        }, 200

    except Exception as e:
        print("GENERATE ERROR:", str(e))
        return {"success": False, "message": "Generation failed"}, 500