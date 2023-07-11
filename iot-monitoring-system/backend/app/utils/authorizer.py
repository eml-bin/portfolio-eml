from functools import wraps # herramienta para crear decoradores (preservar metadatos)

from flask import request

from app.system_api.admin.auth.model import User
from werkzeug.exceptions import Unauthorized

def token_required(func):
    """Execute function if request contains valid access token."""

    @wraps(func)
    def wrapper(*args, **kwargs):
        _check_access_token()

        # verify current token
        token_payload = _check_access_token()

        # get request metadata
        for name, val in token_payload.items():
            setattr(wrapper, name, val)

        return func(*args, **kwargs)

    return wrapper

def _check_access_token():
    """
    Verify JWT request token
    """
    token = request.headers.get("Authorization")
    if not token:
        raise Unauthorized(description="Unauthorized, no token")
    
    # decode jwt
    result = User.decode_access_token(token)

    if result.failure:
        raise Unauthorized(description="Unauthorized, token fail")
    return result.value