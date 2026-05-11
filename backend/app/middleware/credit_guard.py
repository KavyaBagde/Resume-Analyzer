from functools import wraps
from flask import request
from app.services.credit_service import CreditService


def credit_required(action):

    def decorator(f):
        @wraps(f)
        def wrapped(*args, **kwargs):

            user = getattr(request, "user", None)

            if not user:
                return {
                    "success": False,
                    "message": "Authentication required"
                }, 401

            user_id = user["id"]

            if not CreditService.has_enough_credits(user_id, action):
                return {
                    "success": False,
                    "message": "Not enough credits",
                    "required": CreditService.get_cost(action)
                }, 403

            return f(*args, **kwargs)

        return wrapped
    return decorator