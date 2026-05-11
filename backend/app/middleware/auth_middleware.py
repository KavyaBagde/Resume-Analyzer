from functools import wraps
from flask import request
import jwt
import os


def auth_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        try:
            auth_header = request.headers.get("Authorization")

            if not auth_header:
                return {
                    "success": False,
                    "message": "Authorization header missing"
                }, 401

            # Extract token
            token = auth_header.split(" ")[1]

            # Decode token
            decoded = jwt.decode(
                token,
                os.getenv("JWT_SECRET"),
                algorithms=["HS256"]
            )

            user_id = decoded.get("user_id") or decoded.get("userId")

            if not user_id:
                return {
                    "success": False,
                    "message": "Invalid token payload"
                }, 401

            # Standard user object 
            request.user = {
                "id": user_id
            }

            # Backward compatibility
            request.user_id = user_id

            return f(*args, **kwargs)

        except jwt.ExpiredSignatureError:
            return {
                "success": False,
                "message": "Token expired"
            }, 401

        except Exception as e:
            print("AUTH ERROR:", str(e))

            return {
                "success": False,
                "message": "Invalid token"
            }, 401

    return decorated