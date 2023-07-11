from app import db

class Machine(db.Model):
    """
    Industrial Machine (System Model)
    """

    __tablename__ = "machine"

    id = db.Column(db.Integer(), primary_key=True, autoincrement=True)
    name = db.Column(db.String(100))

    #Foreign Keys
    sensor_tag_id = db.Column(db.Integer, db.ForeignKey("sensor_tag.id"), unique=True, nullable=False)

    #Relationships
    variables = db.relationship("Variable", backref="parent_machine")

    @property
    def sensor_tag_name(self):
        return self.machine_tag.name