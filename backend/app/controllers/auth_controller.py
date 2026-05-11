from flask import request, jsonify
from app.services.auth_service import (
    signup_service,
    login_service,
    refresh_token_service,
    logout_service
)


def signup():
    data = request.json
    response, status = signup_service(data)
    return jsonify(response), status


def login():
    data = request.json
    response, status = login_service(data)
    return jsonify(response), status


def refresh():
    data = request.json
    token = data.get("refreshToken")

    response, status = refresh_token_service(token)

    return jsonify(response), status  


def logout():
    user_id = request.user["id"]  
    # print(user_id)
    response, status = logout_service(user_id)

    return jsonify(response), status