import logging
from rest_framework.permissions import BasePermission, SAFE_METHODS
from django.db.models import Q

logger = logging.getLogger(__name__)


class IsRoot(BasePermission):
    """
    Permiso que verifica a un `super´ usuario
    """

    def has_permission(self, request, view):
        return self.user.is_superuser


class ReadOnly(BasePermission):
    """
    Permiso que solo permite lectura
    """

    def has_permission(self, request, view):
        return request.method in SAFE_METHODS

#
# class Inspection(BasePermission):
#     """
#     Clase que contiene los métodos para la inspección de cualquier usuario al
#     realizar una petición, comprobando si tiene acceso.
#     """
#
#     def __init__(self, module_name):
#         """
#         Asignar el módulo a inspeccionar.
#         """
#         super().__init__()
#         try:
#             self.module = Module.objects.get(name=module_name,
#                                              is_active=True)
#         except Module.DoesNotExist:
#             self.module = None
#
#         self.user = None
#
#     def module_verification(self):
#         """
#         Relación entre una Organización y un módulo del API
#         """
#         try:
#             Path.objects.get(module=self.module,
#                              organization=self.user.profile.organization)
#             return True
#         except Exception as e:
#             # Módulo sin existencia o el usuario aún no tiene acceso
#             logger.error('E001 Sin acceso al módulo solicitado. Detail {}'.format(str(e)))
#             return False
#
#     def method_level(self, method):
#         """
#         Obtiene el nivel de método, dependiendo el tipo de consulta.
#         """
#         if (method == 'GET'):
#             return 1
#         elif (method == 'POST'):
#             return 2
#         else:
#             return 3
#
#     def get_staff_level_access(self):
#         """
#         Veirfica los permisos entre el módulo y el rol del staff.
#         """
#         permission = Permission.objects.filter(module=self.module,
#                                                rol__organization=self.user.profile.organization,
#                                                rol__in=self.user.profile.roles.all()).order_by('-access_level').first()
#
#         if permission:
#             if permission.access_level >= self.method:
#                 return True
#             else:
#                 return False
#         else:
#             return False
#
#     def inspection(self):
#         """
#         Comienza proceso de Inspección para acceder al API
#         """
#         return self.level_one()
#
#     def level_one(self):
#         """
#         Verificación Superuser.
#         """
#         return True if self.user.is_superuser else self.level_two()
#
#     def level_two(self):
#         """
#         Verificación acceso de la organización al módulo.
#         """
#
#         if self.module_verification():
#             return self.level_three()
#         else:
#             return False
#
#     def level_three(self):
#         """
#         Verificación Master o Staff de la Organización
#         """
#         return True if self.user.profile.is_master else self.level_four()
#
#     def level_four(self):
#         """
#         Revisión permisos de usuario staff
#         """
#         return self.get_staff_level_access()
#
#     def has_permission(self, request, view):
#         self.user = request.user
#         self.method = self.method_level(request.method)
#         return self.inspection()
#
