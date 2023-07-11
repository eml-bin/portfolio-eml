from http import HTTPStatus

from flask import current_app
from flask_restx import Namespace, Resource
from .service import MachineService
from .parsers import machine_model, machine_list

machine_ns = Namespace(name="Machine", description="Machine endpoints", validate=True)
# Models Record
machine_ns.models[machine_model.name] = machine_model
machine_ns.models[machine_list.name] = machine_list 

@machine_ns.route("", endpoint="machine_list")
class MachineList(Resource):
    """
    Handle Machine HTTP Endpoint: /machines
    """

    @machine_ns.doc(security="Bearer")
    @machine_ns.response(HTTPStatus.OK, "Industrial Machines List", machine_list) # expected Model output
    def get(self):
        """
        Get machine list with necessary authorization
        """
        machine_service = MachineService()
        result = machine_service.get_all()
        return result
