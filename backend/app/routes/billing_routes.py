from flask import Blueprint
from app.controllers.billing_controller import add_credits

billing_bp = Blueprint("billing", __name__)

billing_bp.route("/add-credits", methods=["POST"])(add_credits)