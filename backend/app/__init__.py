from flask import Flask
from flask_cors import CORS
from app.routes.auth_routes import auth_bp
from app.routes.user_routes import user_bp
from app.routes.resume_routes import resume_bp
from config.config import Config
from app.routes.billing_routes import billing_bp


def create_app():
    app = Flask(__name__)

    # FULL CORS CONFIG
    CORS(
        app,
        resources={r"/api/*": {"origins": "http://localhost:5173"}},
        supports_credentials=True,
        allow_headers=["Content-Type", "Authorization"],
        methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"]
    )

    app.config.from_object(Config)

    app.register_blueprint(auth_bp, url_prefix="/api/auth")
    app.register_blueprint(user_bp, url_prefix="/api/user")
    app.register_blueprint(resume_bp, url_prefix="/api/resume")
    app.register_blueprint(billing_bp, url_prefix="/api/billing")

    return app