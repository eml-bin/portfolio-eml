from app import db
from app.utils.datetime import utc_now
                                
class SensorTag(db.Model):
    """IoT Sensor Tag (IoT Model)"""

    __tablename__ = "sensor_tag"

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(200), unique=True, nullable=False)
    registered_on = db.Column(db.DateTime, default=utc_now)

    #Relationships
    machine = db.relationship("Machine", backref="machine_tag", uselist=False)
    variable = db.relationship("Variable", backref="variable_tag", uselist=False)