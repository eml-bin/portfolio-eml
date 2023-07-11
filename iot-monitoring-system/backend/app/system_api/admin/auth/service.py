from http import HTTPStatus

from flask import current_app, jsonify
from flask_restx import abort

from app import db
from app.system_api.admin.auth.model import User
from app.system_api.admin.blacklist.model import Blacklist
from app.utils.authorizer import token_required
from app.classes.ApiResponse import ApiResponse

class AuthService:

    def login(self, email, password):
        """
        Login service by user credentials (email/password)
        """
        user = User.find_by_email(email)
        if not user or not user.check_password(password): # Unauthorized user
            abort(HTTPStatus.UNAUTHORIZED, "Bad Credentials (email/password)", status=HTTPStatus.UNAUTHORIZED.name)
        auth_token = user.encode_access_token()

        headers = {'Cache-Control': 'no-store'}

        response = ApiResponse(
            http_status=HTTPStatus.OK,
            headers=headers,
            message="Successfully system user authorization",
            access_token=auth_token,
            expires_in=self._get_token_expire_time()
        )

        return response.to_json()
    
    @token_required
    def logout(self):
        """
        Logout service by user, blacklist the active token 
        """
        access_token = self.logout.token
        blacklisted_tkn = Blacklist(tkn=access_token)
        db.session.add(blacklisted_tkn)
        db.session.commit()

        response = ApiResponse(
            http_status=HTTPStatus.OK,
            message="Successfully logout"
        )

        return response.to_json() 
     
    def _get_token_expire_time(self):
        """
        Private method for get jwt expiration 
        """
        token_age_h = current_app.config.get("TOKEN_EXPIRE_HOURS")
        token_age_m = current_app.config.get("TOKEN_EXPIRE_MINUTES")
        expires_in_seconds = token_age_h * 3600 + token_age_m * 60
        return expires_in_seconds
