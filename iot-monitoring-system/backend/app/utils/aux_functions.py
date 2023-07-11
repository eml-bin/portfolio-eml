from flask_restx import Model
from flask_restx.fields import Nested

def list_model(model: Model, name: str):
    """
    Returns a default ListModel
    """
    return Model(
        name,
        {
            "data": Nested(model)
        }
    )