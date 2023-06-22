"""
Serializadores del app Notification

Eduardo Muñoz López (eduardo@gestalabs.com)
10/02/2020
"""

from rest_framework import serializers
from rest_framework.exceptions import APIException

from notification.models import Alarm, Shutdown


class AlarmSerializer(serializers.ModelSerializer):
    """
    Serializador para las Notificaciones
    """
    variableRef = serializers.ReadOnlyField(source='variable_reference')
    machine = serializers.ReadOnlyField()
    type = serializers.ReadOnlyField()
    message = serializers.ReadOnlyField()
    machine_id = serializers.ReadOnlyField()

    class Meta:
        model = Alarm
        fields = '__all__'
        read_only_fields = ('user', )


class ShutdownSerializer(serializers.ModelSerializer):
    """
    Serializador para las Notificaciones
    """
    machineRef = serializers.ReadOnlyField(source='machine_reference')

    class Meta:
        model = Shutdown
        fields = '__all__'
        read_only_fields = ('user', 'type')
