"""
Vistas disponibles del app `Machine´

Eduardo Muñoz López (eduardo@gestalabs.com)
10/02/2020
"""
import pandas

from functools import partial
from rest_pandas import PandasView, PandasViewSet, PandasMixin
from rest_pandas.renderers import PandasBaseRenderer, PandasJSONRenderer, PandasCSVRenderer, PandasTextRenderer
from rest_framework.exceptions import APIException
from rest_framework.response import Response
from rest_framework import status
from django.utils.timezone import make_aware
from datetime import datetime, timedelta
from django.shortcuts import render
from rest_framework import viewsets, mixins

from machine.models import Machine, Variable, Value, Counter, Range, Schedule
from machine.utils import get_start_date, get_interval
from kepware.models import Tag
from django.db.models import Q

from machine.serializers import (ScheduleSerializer,
                                 MachineSerializer,
                                 VariableSerializer,
                                 ValueSerializer,
                                 CounterSerializer,
                                 RangeSerializer)
from manage.models import User, Profile
from manage.permissions import IsRoot, ReadOnly


class ScheduleViewSet(mixins.CreateModelMixin,
                      mixins.RetrieveModelMixin,
                      mixins.UpdateModelMixin,
                      mixins.ListModelMixin,
                      viewsets.GenericViewSet):
    """
    Vista para las consultas de Paros Programdos
    """
    queryset = Schedule.objects.all()
    serializer_class = ScheduleSerializer

class MachineViewSet(mixins.CreateModelMixin,
                     mixins.RetrieveModelMixin,
                     mixins.UpdateModelMixin,
                     mixins.ListModelMixin,
                     viewsets.GenericViewSet):
    """
    Vista para las consultas de Máquinas
    """
    queryset = Machine.objects.all()
    serializer_class = MachineSerializer
    permissions_classes = [IsRoot | ReadOnly]

    def get_queryset(self):
        profile = Profile.objects.get(user=self.request.user)
        if (profile.role == Profile.IS_PROVIDER):
            return Machine.objects.filter(family=profile.family)
        return self.queryset

class VariableViewSet(mixins.ListModelMixin,
                      mixins.CreateModelMixin,
                      mixins.UpdateModelMixin,
                      viewsets.GenericViewSet):
    """
    Vista para las consultas de Variables
    """
    serializer_class = VariableSerializer
    queryset = Variable.objects.all()

    def get_queryset(self):
        """
        Siempre que el método sea de tipo List,
        se filtra por el identificador de la máquina
        """
        machine_id = self.request.query_params.get('machine_id', None)
        type = self.request.query_params.get('type', None)
        if machine_id is not None and type is not None:
            return Variable.objects.filter(Q(machine=machine_id) & Q(type=type))
        return Variable.objects.all()

class HistoryViewSet(PandasMixin,
                    mixins.ListModelMixin,
                    viewsets.GenericViewSet):
    """
    Vista para las consultas del histórico (Temperatura y/o Corriente)
    """
    queryset = Value.objects.all()
    serializer_class = ValueSerializer
    renderer_classes = [PandasJSONRenderer, ]

    def transform_dataframe(self, dataframe):
        """
        Transformación de datos de ser necesario para calcular tendencia
        """
        interval = get_interval(
            self.request.query_params.get('interval', None)
        )

        if interval is not None:
            dataframe.index = pandas.to_datetime(dataframe['date'],
                                                 format='%Y-%m-%d %H:%M:%S')
            return dataframe.groupby(['type', 'reference']).resample(
                interval).mean().reset_index().dropna(subset=['value'])
        else:
            return dataframe

    def get_queryset(self):
        """
        Siempre que la consulta sea de tipo List,
        se filtra por:
            - El tag identificador de Kepware
            o
            - Un ID de Máquina y una fecha fin.
        """

        # Get Params
        tag_id = self.request.query_params.get('tag_id', None)
        machine_id = self.request.query_params.get('machine_id', None)
        date_end = self.request.query_params.get('date_end', None)
        interval = self.request.query_params.get('interval', None)
        
        if tag_id is not None:
            try:
                tag = Tag.objects.get(id=tag_id)
                variable = Variable.objects.get(tag=tag)
                return Value.objects.filter(variable=variable).order_by("-date")[:200]
            except Exception as error:
                print(error)
                raise APIException(
                    "No es posible realizar la consulta. Tag Inválido")

        # if machine_id is not None and date_end is not None and interval is not None:
        if date_end is not None and interval is not None:
            # machine = Machine.objects.get(id=machine_id)
            try:
                format_date_end = make_aware(datetime.strptime(date_end,
                                                               '%Y-%m-%d %H:%M:%S'))
                format_date_start = get_start_date(format_date_end, interval)
                
                # print('HISTORY format_date_end', format_date_end)
                # print('HISTORY format_date_start', format_date_start)
                # return Value.objects.filter(variable__machine=machine,
                #                             date__gte=format_date_start,
                #                             date__lte=format_date_end).order_by("-date")
                
                return Value.objects.filter(date__gte=format_date_start,
                                            date__lte=format_date_end).order_by("-date")
                
            except Exception as error:
                raise APIException(
                    "No es posible realizar la consulta. Formato de fecha inválido")

        raise APIException(
            "No es posible realizar la consulta. No se especifica la máquina, fecha y/o intervalo"
        )

class ValueViewSet(mixins.CreateModelMixin,
                    viewsets.GenericViewSet):
    """
    Vista para los valores de las variables (Temperatura y/o Corriente)
    """
    queryset = Value.objects.all()[:200]
    serializer_class = ValueSerializer

class ExportViewSet(PandasMixin,
                    mixins.ListModelMixin,
                    viewsets.GenericViewSet):
    """
    Vista para exportar el histórico a CSV
    """

    queryset = Value.objects.all()
    serializer_class = ValueSerializer
    renderer_classes = [PandasCSVRenderer,]

    def get_queryset(self):
        """
        Siempre que la consulta sea de tipo List,
        se filtra por:
            - El tag identificador de Kepware
            o
            - Un ID de Máquina y una fecha fin.
        """
        # Get Params
        machine_id = self.request.query_params.get('machine_id', None)
        date_end = self.request.query_params.get('date_end', None)
        interval = self.request.query_params.get('interval', None)

        if machine_id is not None and date_end is not None and interval is not None:
            try:
                machine = Machine.objects.get(id=machine_id)
                format_date_end = make_aware(datetime.strptime(date_end,
                                                               '%Y-%m-%d %H:%M:%S'))
                format_date_start = get_start_date(format_date_end, interval)
                print('HISTORY INIT_DATE: ', format_date_end)
                print('HISTORY END_DATE: ', format_date_start)
                return Value.objects.filter(variable__machine=machine,
                                            date__gte=format_date_start,
                                            date__lte=format_date_end).order_by("-date")
            except Exception as error:
                raise APIException(
                    "No es posible realizar la consulta. Formato de fecha inválido. E ({})".format(error))
        raise APIException(
            "No es posible realizar la consulta. Formato de fecha inválido")

class CounterViewSet(mixins.ListModelMixin,
                     mixins.CreateModelMixin,
                     viewsets.GenericViewSet):
    """
    Vista para las consultas de los Contadores de las Electroválvulas
    """
    queryset = Counter.objects.all()
    serializer_class = CounterSerializer

    def get_queryset(self):
        """
        Siempre que la consulta sea de tipo List,
        se filtra por el tag identificador de Kepware
        """
        tag_id = self.request.query_params.get('tag_id', None)
        if tag_id is not None:
            try:
                tag = Tag.objects.get(id=tag_id)
                variable = Variable.objects.get(tag=tag)
                return Counter.objects.filter(variable=variable,
                                              status=Counter.LOG)
            except Exception as error:
                print(error)
                raise APIException("Parámetros de búsqueda no válidos")
        return Counter.objects.all()

class RangeViewSet(mixins.ListModelMixin,
                   mixins.CreateModelMixin,
                   mixins.UpdateModelMixin,
                   viewsets.GenericViewSet):
    """
    Vista para consultas de los Rangos permitidos por Variable
    """
    queryset = Range.objects.all()
    serializer_class = RangeSerializer

    def get_queryset(self):
        """
        Filtraciones de la información:
            - Por tag_id
            - Por machine_id
        """
        tag_id = self.request.query_params.get('tag_id', None)
        machine_id = self.request.query_params.get('machine_id', None)
        if tag_id is not None:
            try:
                tag = Tag.objects.get(id=tag_id)
                variable = Variable.objects.get(tag=tag)
                return Range.objects.filter(variable=variable)
            except Exception as error:
                raise APIException("Parámetros de búsqueda no válidos")
        if machine_id is not None:
            try:
                machine = Machine.objects.get(id=machine_id)
                return Range.objects.filter(variable__machine=machine)
            except Exception as error:
                raise APIException("Parámetros de búsqueda no válidos")
        return Range.objects.all()
