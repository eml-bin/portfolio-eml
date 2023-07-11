from http import HTTPStatus
from typing import List

from flask_restx import marshal

from app.utils.authorizer import token_required
from app.classes.ApiResponse import ApiResponse
from .model import Machine
from .parsers import machine_model

class MachineService():

    @token_required
    def get_all(self):
        machines = Machine.query.all()
        data = marshal(machines, machine_model)

        response = ApiResponse(
            http_status=HTTPStatus.OK,
            data=data
        )

        return response.to_json()