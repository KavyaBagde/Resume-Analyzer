from flask import Blueprint, jsonify, request
from app.middleware.auth_middleware import auth_required
from app.models.user_model import User

user_bp = Blueprint("user", __name__)


@user_bp.route("/me", methods=["GET"])
@auth_required
def get_current_user():

    user = User.find_by_id(request.user["id"])

    if not user:
        return jsonify({"error": "User not found"}), 404

    credits = user.get("credits")

    # fallback (old data)
    if credits is None and user.get("subscription"):
        credits = user["subscription"].get("credits", 0)

    return jsonify({
        "id": str(user["_id"]),
        "name": user.get("name"),
        "email": user.get("email"),

        "credits": credits or 0,
        "plan": user.get("plan", "free"),

        "subscription": user.get("subscription"),
        "createdAt": user.get("createdAt")
    })