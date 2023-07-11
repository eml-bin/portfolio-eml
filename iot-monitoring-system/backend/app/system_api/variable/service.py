from http import HTTPStatus
from typing import List

from flask_restx import marshal

from app.utils.authorizer import token_required
from app.classes.ApiResponse import ApiResponse
from app.system_api.machine.model import Machine
from app.system_api.iot.tag.model import SensorTag
from .model import Variable
from .parsers import variable_model

class VariableService():

    @token_required
    def get_all(self, machine_tag: str):
        """
        Get all variables of Industrial Machine
        """
        variables = Variable.query.join(SensorTag, SensorTag.name == machine_tag).all()
        data = marshal(variables, variable_model)

        response = ApiResponse(
            http_status=HTTPStatus.OK,
            data=data
        )

        return response.to_json()