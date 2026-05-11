from config.db import get_db
from bson import ObjectId
from datetime import datetime

db = get_db()
users = db.users

DEFAULT_CREDITS = 5  # starting credits for new users


class User:

    @staticmethod
    def create(user_data):
        user_data["createdAt"] = datetime.utcnow()
        user_data["updatedAt"] = datetime.utcnow()

        user_data["credits"] = DEFAULT_CREDITS
        user_data["plan"] = "free"  # free | pro

        result = users.insert_one(user_data)
        return str(result.inserted_id)

    @staticmethod
    def find_by_email(email):
        return users.find_one({"email": email})

    @staticmethod
    def find_by_id(user_id):
        return users.find_one({"_id": ObjectId(user_id)})

    @staticmethod
    def update_refresh_token(user_id, token):
        users.update_one(
            {"_id": ObjectId(user_id)},
            {"$set": {"refreshToken": token}}
        )

    #  CREDIT SYSTEM METHODS

    @staticmethod
    def get_credits(user_id):
        user = users.find_one({"_id": ObjectId(user_id)})
        if not user:
            return 0
        return user.get("credits", 0)

    @staticmethod
    def deduct_credits(user_id, amount):
        users.update_one(
            {"_id": ObjectId(user_id)},
            {
                "$inc": {"credits": -amount},
                "$set": {"updatedAt": datetime.utcnow()}
            }
        )

    @staticmethod
    def add_credits(user_id, amount):
        users.update_one(
            {"_id": ObjectId(user_id)},
            {
                "$inc": {"credits": amount},
                "$set": {"updatedAt": datetime.utcnow()}
            }
        )