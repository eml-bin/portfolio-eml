class Result:

    def __init__(self, success, value, error) -> None:
        self.success = success
        self.value = value
        self.error = error

    @staticmethod
    def Fail(error_message):
        """Create a Result object for a failed operation."""
        return Result(False, value=None, error=error_message)

    @staticmethod
    def Ok(value=None):
        """Create a Result object for a successful operation."""
        return Result(True, value=value, error=None)

    @property
    def failure(self):
        """Flag that indicates if the operation failed."""
        return not self.success

    # @staticmethod
    # def Combine(results):
    #     """Return a Result object based on the outcome of a list of Results."""
    #     if all(result.success for result in results):
    #         return Result.Ok()
    #     errors = [result.error for result in results if result.failure]
    #     return Result.Fail("\n".join(errors))