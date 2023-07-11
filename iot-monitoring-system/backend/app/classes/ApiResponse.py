from flask import jsonify
from http import HTTPStatus

class ApiResponse:

    def __init__(self, http_status: HTTPStatus, headers: dict = None, **kwargs):
        self.http_status = http_status
        self.headers = headers
        self.body = { **kwargs }

    def to_json(self):
        """
        Convert to json for correct API Response format
        """
        response = jsonify(self.body)

        if self.headers:
            response.headers.extend(self.headers)

        response.status_code = self.http_status.value

        return response
