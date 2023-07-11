from flask_restx import Model
from flask_restx.fields import String
from flask_restx.reqparse import RequestParser
from flask_restx.inputs import email

auth_parser = RequestParser(bundle_errors=True)

auth_parser.add_argument(
    name="email", type=email(), location="form", required=True, nullable=False
)
auth_parser.add_argument(
    name="password", type=str, location="form", required=True, nullable=False
)