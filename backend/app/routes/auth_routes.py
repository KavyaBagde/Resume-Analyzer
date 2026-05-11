from flask import Blueprint
from app.controllers.auth_controller import signup, login,refresh,logout
from app.middleware.auth_middleware import auth_required

auth_bp = Blueprint("auth", __name__)

auth_bp.route("/signup", methods=["POST"])(signup)
auth_bp.route("/login", methods=["POST"])(login)
auth_bp.route("/refresh", methods=["POST"])(refresh)
auth_bp.route("/logout", methods=["POST"])(auth_required(logout))