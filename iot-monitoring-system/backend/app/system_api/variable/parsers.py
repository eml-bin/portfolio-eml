from flask_restx import Model
from flask_restx.fields import String

from app.utils.aux_functions import list_model
from flask_restx.reqparse import RequestParser

variable_list_parser = RequestParser(bundle_errors=True)

variable_list_parser.add_argument(
    name="machineTag", type=str, location="args", required=True, nullable=False
)

variable_model = Model(
    "Variable",
    {
        "name": String,
        "type": String,
        "tagName": String(attribute="sensor_tag_name"),
        "unit": String(attribute="measurement_unit")
    }
)

variable_list = list_model(variable_model, "VariableList")