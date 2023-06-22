"""
Vistas disponibles del app `Notification´

Eduardo Muñoz López (eduardo@gestalabs.com)
10/02/2020
"""


from django.shortcuts import render
from rest_framework import viewsets, mixins

from notification.models import Alarm, Shutdown
from notification.serializers import AlarmSerializer, ShutdownSerializer
from django.db.models import Q

from manage.models import Profile

from _config.pagination import SmallResultsSetPagination


class AlarmViewSet(mixins.CreateModelMixin,
                   mixins.RetrieveModelMixin,
                   mixins.UpdateModelMixin,
                   mixins.ListModelMixin,
                   viewsets.GenericViewSet):
    """
    Vista para consultas de Alarmas de Variables
    """
    queryset = Alarm.objects.all()
    serializer_class = AlarmSerializer
    # pagination_class = SmallResultsSetPagination

    def get_queryset(self):
        profile = Profile.objects.get(user=self.request.user)
        machine_id = self.request.query_params.get('machine_id', None)
                    
        if (profile.role == Profile.IS_PROVIDER):
            return Alarm.objects.filter(variable__machine__family=profile.family)
        
        if machine_id is not None:  
            return Alarm.objects.filter(variable__machine=machine_id)
        return Alarm.objects.all()


class ShutdownViewSet(mixins.CreateModelMixin,
                      mixins.RetrieveModelMixin,
                      mixins.UpdateModelMixin,
                      mixins.ListModelMixin,
                      viewsets.GenericViewSet):
    """
    Vista para las consultas de Paros NO Programdos
    """
    queryset = Shutdown.objects.all()
    serializer_class = ShutdownSerializer

    def get_queryset(self):
        """
        Siempre que el método sea de tipo List,
        se filtra por el identificador de la máquina
        """
        machine_id = self.request.query_params.get('machine_id', None)
        if machine_id is not None:
            return Shutdown.objects.filter(machine=machine_id)
        return self.queryset
