from flask_restx import Model
from flask_restx.fields import String

from app.utils.aux_functions import list_model

machine_model = Model(
    "Machine",
    {
        "name": String,
        "tagName": String(attribute="sensor_tag_name")
    }
)

machine_list = list_model(machine_model, "MachineList")