from http import HTTPStatus

from flask import current_app
from flask_restx import Namespace, Resource
from .service import VariableService
from .parsers import variable_list_parser, variable_model, variable_list

variable_ns = Namespace(name="Variable", description="Variable endpoints", validate=True)
# Models Record
variable_ns.models[variable_model.name] = variable_model
variable_ns.models[variable_list.name] = variable_list 

@variable_ns.route("/", endpoint="variable_list")
class VariableList(Resource):
    """
    Handle Variable HTTP Endpoint: /variable
    """

    @variable_ns.doc(security="Bearer")
    @variable_ns.expect(variable_list_parser) # Expected data structure (payload)
    @variable_ns.response(HTTPStatus.OK, "Variables List of Industrial Machine", variable_list)
    def get(self):
        """
        Get machine list with necessary authorization
        """
        request_data = variable_list_parser.parse_args()
        machine_tag = request_data.get("machineTag")
        variable_service = VariableService()
        result = variable_service.get_all(machine_tag)
        return result
