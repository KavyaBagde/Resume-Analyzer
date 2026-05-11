from app.models.user_model import User
from app.utils.hash import hash_password, check_password
from app.utils.jwt_util import create_access_token, create_refresh_token
from app.utils.jwt_util import decode_token


# ---------------- SIGNUP ---------------- #
def signup_service(data):
    name = data.get("name")
    email = data.get("email")
    password = data.get("password")

    if not email or not password:
        return {"error": "Missing fields"}, 400

    existing = User.find_by_email(email)
    if existing:
        return {"error": "User already exists"}, 409

    hashed = hash_password(password)

    user_id = User.create({
        "name": name,
        "email": email,
        "password": hashed,
        "role": "user",
        "subscription": {"plan": "free", "credits": 1}
    })

    access = create_access_token(user_id)
    refresh = create_refresh_token(user_id)

    User.update_refresh_token(user_id, refresh)

    return {
        "accessToken": access,
        "refreshToken": refresh,
        "user": {
            "id": user_id,
            "name": name,
            "email": email,
            "subscription": {"plan": "free", "credits": 1}
        }
    }, 201


# ---------------- LOGIN ---------------- #
def login_service(data):
    email = data.get("email")
    password = data.get("password")

    user = User.find_by_email(email)
    if not user:
        return {"error": "Invalid credentials"}, 401

    if not check_password(password, user["password"]):
        return {"error": "Invalid credentials"}, 401

    user_id = str(user["_id"])

    access = create_access_token(user_id)
    refresh = create_refresh_token(user_id)

    User.update_refresh_token(user_id, refresh)

    return {
        "accessToken": access,
        "refreshToken": refresh,
        "user": {
            "id": user_id,
            "name": user.get("name"),
            "email": user.get("email"),
            "subscription": user.get("subscription", {})
        }
    }, 200


# ---------------- REFRESH TOKEN ---------------- #
def refresh_token_service(refresh_token):
    try:
        if not refresh_token:
            return {
                "success": False,
                "message": "Refresh token missing"
            }, 400

        decoded = decode_token(refresh_token)
        user_id = decoded.get("user_id")

        if not user_id:
            return {
                "success": False,
                "message": "Invalid token payload"
            }, 403

        user = User.find_by_id(user_id)

        if not user:
            return {
                "success": False,
                "message": "User not found"
            }, 404

        if user.get("refreshToken") != refresh_token:
            return {
                "success": False,
                "message": "Invalid refresh token"
            }, 403

        new_access = create_access_token(user_id)
        new_refresh = create_refresh_token(user_id)

        User.update_refresh_token(user_id, new_refresh)

        return {
            "success": True,
            "data": {
                "accessToken": new_access,
                "refreshToken": new_refresh
            }
        }, 200

    except Exception as e:
        print("REFRESH ERROR:", str(e))

        return {
            "success": False,
            "message": "Invalid or expired refresh token"
        }, 403


# ---------------- LOGOUT ---------------- #
def logout_service(user_id):
    user = User.find_by_id(user_id)

    if not user:
        return {"error": "User not found"}, 404

    User.update_refresh_token(user_id, None)

    return {"message": "Logged out successfully"}, 200