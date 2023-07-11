from app import db
from app.classes.Result import Result
from app.utils.datetime import utc_now
from sqlalchemy import Enum
                                
class Variable(db.Model):
    """
    Variable Model (System Model)
    """

    __tablename__ = "machine_variable"

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(200), nullable=False)
    type = db.Column(Enum("temperature", "current", name="variable_types"))

    #Foreign Keys
    sensor_tag_id = db.Column(db.Integer, db.ForeignKey("sensor_tag.id"))
    machine_id = db.Column(db.Integer, db.ForeignKey("machine.id"))

    @property
    def measurement_unit(self):
        if self.type == "temperature":
            return "°C"
        
        if self.type == "current":
            return "A"
        
    @property
    def sensor_tag_name(self):
        return self.variable_tag.name
