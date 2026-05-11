from flask import Blueprint, request
from app.controllers.resume_controller import (
    upload_resume,
    claim_resume,
    get_user_resumes,
    analyze_with_jd,
    generate_resume
)
from app.middleware.auth_middleware import auth_required

#  NEW IMPORT
from app.middleware.credit_guard import credit_required

resume_bp = Blueprint("resume", __name__)

# Upload (OPTIONAL AUTH ENABLED)
@resume_bp.route("/upload", methods=["POST"])
def upload():
    return upload_resume()

# Claim (FREE)
@resume_bp.route("/claim", methods=["POST"])
@auth_required
def claim():
    return claim_resume(request.user)

# Get user resumes
@resume_bp.route("/user", methods=["GET"])
@auth_required
def get_resumes():
    return get_user_resumes(request.user)

# JD ANALYSIS (PAID)
@resume_bp.route("/<resume_id>/analyze-jd", methods=["POST"])
@auth_required
@credit_required("jd_analysis")
def analyze_jd(resume_id):
    return analyze_with_jd(request.user, resume_id)

# GENERATE RESUME (PAID)
@resume_bp.route("/<resume_id>/generate", methods=["POST"])
@auth_required
@credit_required("generate_resume")
def generate(resume_id):
    return generate_resume(request.user, resume_id)