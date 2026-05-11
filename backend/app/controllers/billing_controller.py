from flask import request, jsonify
from app.models.user_model import User
from app.utils.jwt_util import decode_token

PLAN_CONFIG = {
    "pro": {
        "credits": 100,
        "price": 199
    }
}

def add_credits():
    try:
        token = request.headers.get("Authorization")

        if not token:
            return jsonify({"error": "Unauthorized"}), 401
        
        if token.startswith("Bearer "):
            token = token.split(" ")[1]

        user_data = decode_token(token)

        user_id = user_data.get("user_id")

        data = request.get_json() or {}
        plan_id = data.get("plan_id")

        if plan_id not in PLAN_CONFIG:
            return jsonify({"error": "Invalid plan"}), 400

        plan = PLAN_CONFIG[plan_id]

        credits_to_add = plan["credits"]

        user = User.find_by_id(user_id)

        if not user:
            return jsonify({"error": "User not found"}), 404

        new_credits = user.get("credits", 0) + credits_to_add

        User.add_credits(user_id, credits_to_add)

        return jsonify({
            "message": "Credits added successfully",
            "credits": new_credits
        }), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500