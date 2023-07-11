from flask import Flask, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from flask_restx import Api
from flask_migrate import Migrate
from flask_cors import CORS

db = SQLAlchemy()
migrate = Migrate()
cors = CORS()
bcrypt = Bcrypt()

def create_app(env=None):
    from app.config import config_by_name

    # init Flask app
    app = Flask(__name__)

    # Get Flask config by env 
    app.config.from_object(config_by_name[env or "demo"])
    
    from app.system_api import system_bp

    app.register_blueprint(system_bp)

    cors.init_app(app)
    db.init_app(app)
    migrate.init_app(app, db)
    bcrypt.init_app(app)
    
    return app
