from flask_restx import Model
from flask_restx.fields import Nested

def list_model(model: Model, name: str):
    return Model(
        name,
        {
            "data": Nested(model)
        }
    )