"""
Modelos de Base de Datos del app Notification

Eduardo Muñoz López (eduardo@gestalabs.com)
10/02/2020
"""

from django.db import models
import json
from machine.models import Machine, Variable
from manage.models import User

from datetime import datetime


class Alarm(models.Model):
    """
    Modelo que registra las Alarmas detectadas
    """
    ALARM = 1

    variable = models.ForeignKey(Variable, on_delete=models.CASCADE,
                                 related_name='notification_alarm')
    date = models.DateTimeField()
    value = models.FloatField()
    user = models.ForeignKey(User,
                             on_delete=models.SET_NULL,
                             null=True,
                             blank=True)
    notes = models.TextField(blank=True, null=True)
    is_active = models.BooleanField(default=True)

    class Meta:
        ordering = ('-date',)

    def type(self):
        """
        Propiedad que retorna el tipo de Notificación
        """
        return self.ALARM

    def message(self):
        """
        Propiedad que determina el detalle genérico de la Notificación
        """
        message = '{} ({}) fuera de rango'.format(self.variable.get_type_display(),
                                                  self.variable.reference)

        if (self.variable.is_valve()):
            message = 'Electroválvula ha superado el número de ciclos permitido'
        return message
    
    def machine_id(self):
        return self.variable.machine.id


    def variable_reference(self):
        return '{}.{}.{}'.format(self.variable.get_type_display(),
                                 self.variable.process,
                                 self.variable.reference)


class Shutdown(models.Model):
    """
    Modelo que registra los Paros NO Programados detectados
    """
    SHUTDOWN = 2

    machine = models.ForeignKey(Machine, on_delete=models.CASCADE,
                                related_name='notification_shutdown')
    date = models.DateTimeField()
    end = models.DateTimeField(null=True, blank=True)
    user = models.ForeignKey(User,
                             on_delete=models.SET_NULL,
                             null=True,
                             blank=True)
    notes = models.TextField(blank=True, null=True)
    is_active = models.BooleanField(default=True)

    class Meta:
        ordering = ('-date',)

    def machine_reference(self):
        return self.machine.name

    def type(self):
        """
        Propiedad que retorna el tipo de Notificación
        """
        return self.SHUTDOWN
