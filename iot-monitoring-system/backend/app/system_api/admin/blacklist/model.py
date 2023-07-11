from datetime import timezone

from app import db
from app.utils.datetime import utc_now


class Blacklist(db.Model):
    """
    System User (System Model)
    """
    
    __tablename__ = "system_blacklist"

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    tkn = db.Column(db.String(500), unique=True, nullable=False)
    blacklisted_since = db.Column(db.DateTime, default=utc_now)

    @classmethod
    def check_blacklist(cls, token):
        """
        Verify blocked token
        """
        exists = cls.query.filter_by(tkn=token).first()
        return True if exists else False