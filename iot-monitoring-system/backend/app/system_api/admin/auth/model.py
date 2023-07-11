import jwt
from uuid import uuid4
from datetime import datetime, timezone, timedelta

from flask import current_app

from app import db, bcrypt
from app.utils.datetime import (utc_now)
from app.classes.Result import Result

class User(db.Model):
    """
    System User (System Model)
    """

    __tablename__ = "system_user"

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    email = db.Column(db.String(255), unique=True, nullable=False)
    pwd_hsh = db.Column(db.String(200), nullable=False)
    registered_on = db.Column(db.DateTime, default=utc_now)
    public_id = db.Column(db.String(50), unique=True, default=lambda: str(uuid4()))

    @property
    def password(self):
        """
        Password Getter, indicates that password only accepts write/set method
        """
        raise AttributeError("password: write-only field")

    @password.setter
    def password(self, password):
        """
        Password Setter, generate hash for pwd_hsh column
        """
        log_rounds = current_app.config.get("BCRYPT_LOG_ROUNDS")
        hash_bytes = bcrypt.generate_password_hash(password, log_rounds)
        self.pwd_hsh = hash_bytes.decode("utf-8")

    def check_password(self, password):
        """
        Check if password str is equal to hash (pwd_hsh)
        """
        return bcrypt.check_password_hash(self.pwd_hsh, password)
    
    def encode_access_token(self):
        """
        Encode JWT Information
        """
        now = datetime.now(timezone.utc)
        token_age_h = current_app.config.get("TOKEN_EXPIRE_HOURS")
        token_age_m = current_app.config.get("TOKEN_EXPIRE_MINUTES")
        expire = now + timedelta(hours=token_age_h, minutes=token_age_m)
        payload = dict(exp=expire, iat=now, sub=self.public_id)
        key = current_app.config.get("SECRET_KEY")
        return jwt.encode(payload, key, algorithm="HS256")

    @staticmethod
    def decode_access_token(access_token):
        """
        Decode JWT Information
        """

        # valid format
        if isinstance(access_token, bytes):
            access_token = access_token.decode("ascii")
        if access_token.startswith("Bearer "):
            split = access_token.split("Bearer")
            access_token = split[1].strip()

        # valid token
        try:
            key = current_app.config.get("SECRET_KEY")
            payload = jwt.decode(access_token, key, algorithms=["HS256"])
        except jwt.ExpiredSignatureError:
            error = "Access token expired. Please log in again."
            return Result.Fail(error)
        except jwt.InvalidTokenError:
            error = "Invalid token. Please log in again."
            return Result.Fail(error)
        
        user_dict = dict(
            public_id=payload["sub"],
            token=access_token,
            expires_at=payload["exp"],
        )

        return Result.Ok(user_dict)
    
    @classmethod
    def find_by_email(cls, email):
        """
        User class method. Returns first User-Object found by email 
        """
        return cls.query.filter_by(email=email).first()

    @classmethod
    def find_by_public_id(cls, public_id):
        """
        User class method. Returns first User-Object found by public_id
        """
        return cls.query.filter_by(public_id=public_id).first()