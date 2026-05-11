from app.models.user_model import User

# Centralized credit cost config
CREDIT_COSTS = {
    "upload_resume": 1,
    "base_analysis": 2,
    "jd_analysis": 2,
    "generate_resume": 3
}


class CreditService:

    @staticmethod
    def get_cost(action):
        return CREDIT_COSTS.get(action, 0)

    @staticmethod
    def has_enough_credits(user_id, action):
        required = CREDIT_COSTS.get(action, 0)
        current = User.get_credits(user_id)
        return current >= required

    @staticmethod
    def deduct(user_id, action):
        required = CREDIT_COSTS.get(action, 0)
        User.deduct_credits(user_id, required)