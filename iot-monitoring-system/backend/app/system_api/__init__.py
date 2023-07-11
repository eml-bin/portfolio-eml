import os
from flask import Blueprint
from flask_restx import Api

# models
from app.system_api import admin
from app.system_api import iot
from app.system_api import machine
from app.system_api import variable

system_bp = Blueprint("api", __name__, url_prefix="/api/v1")

# Provide add JWT to header through Swagger UI
authorizations = {"Bearer": {"type": "apiKey", "in": "header", "name": "Authorization"}}
config_name = os.getenv("FLASK_ENV")

system_api = Api(system_bp, 
    title="IoT-Monitoring-System API", 
    version="1.0",
    description="{} API".format(config_name.capitalize()),
    doc="/swagger", # set URL path of Swagger UI
    authorizations=authorizations
)

# controllers
from app.system_api.admin.auth.controller import auth_ns
from app.system_api.machine.controller import machine_ns
from app.system_api.variable.controller import variable_ns

system_api.add_namespace(auth_ns, path="/auth")
system_api.add_namespace(machine_ns, path="/machine")
system_api.add_namespace(variable_ns, path="/variable")