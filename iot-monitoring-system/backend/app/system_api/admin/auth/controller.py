from http import HTTPStatus
from flask_restx import Namespace, Resource

from .parsers import auth_parser

from .service import AuthService

auth_ns = Namespace(name="Auth", description="Authentication endpoints", validate=True)

@auth_ns.route("/login", endpoint="auth_login")
class LoginResource(Resource):
    """Handle Login Endpoint"""
    
    @auth_ns.expect(auth_parser) # Expected data structure (payload)
    @auth_ns.response(HTTPStatus.OK, "Successfully Login")
    @auth_ns.response(HTTPStatus.BAD_REQUEST, HTTPStatus.BAD_REQUEST.name)
    @auth_ns.response(HTTPStatus.INTERNAL_SERVER_ERROR, HTTPStatus.INTERNAL_SERVER_ERROR.name)
    def post(self):
        """
        Authenticate existing user and return access token
        """
        request_data = auth_parser.parse_args()
        email = request_data.get("email")
        password = request_data.get("password")
        auth_service = AuthService()
        result = auth_service.login(email, password)

        return result
    
@auth_ns.route("/logout", endpoint="auth_logout")
class LogoutResource(Resource):
    """Handle Logout Endpoint"""

    @auth_ns.doc(security="Bearer")
    @auth_ns.response(HTTPStatus.OK, "Successfully logout")
    @auth_ns.response(HTTPStatus.UNAUTHORIZED, "Unauthorized, no token")
    @auth_ns.response(HTTPStatus.BAD_REQUEST, HTTPStatus.BAD_REQUEST.name)
    @auth_ns.response(HTTPStatus.INTERNAL_SERVER_ERROR, HTTPStatus.INTERNAL_SERVER_ERROR.name)
    def post(self):
        """
        User logout and add token to blacklist
        """
        auth_service = AuthService()
        result = auth_service.logout()
        return result




