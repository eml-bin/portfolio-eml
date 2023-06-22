"""
Modelos de Base de Datos del app Machine

# 10/02/2020
@ Eduardo Muñoz López (eduardo@gestalabs.com)
"""

import json
from django.db import models
from manage.models import Family
from kepware.models import Tag
from datetime import datetime


class Schedule(models.Model):
    """
    Modelo de un Paro Programado.

    start. Inicio del Paro Programado
    end. Fin del Paro Programado
    line. Línea de Producción donde sucederá el Paro Programado
    notify_to. Lista de usuarios a notificar
    reason. Razón del Paro Programado
    """
    start = models.DateTimeField()
    end = models.DateTimeField()
    line = models.CharField(max_length=10, default='L7')
    notify_to = models.TextField()
    reason = models.TextField()


class Machine(models.Model):
    """
    Modelo Máquina, esta relacionada con los tags de Kepware.

    plant. Planta a la que pertenece
    area. Area en donde se encuentra la máquina
    line. Línea en la que se encuentra la máquina
    name. Nombre de la máquina
    is_active. Estatus de la máquina
    family. Familia a la que pertenece. (Ej. Weber, Multivac, etc.)
    tag. Tag de Kepware
    """
    plant = models.CharField(max_length=50, blank=True, null=True)
    area = models.CharField(max_length=50, blank=True, null=True)
    line = models.CharField(max_length=20, blank=True, null=True)
    name = models.CharField(max_length=50, blank=True, null=True)
    is_active = models.BooleanField(default=True)
    family = models.ForeignKey(Family,
                               on_delete=models.SET_NULL,
                               related_name='machine_family',
                               blank=True,
                               null=True)
    tag = models.OneToOneField(Tag,
                               on_delete=models.PROTECT)

    def __str__(self):
        return '{}.{}.{}.{}.{}'.format(self.plant,
                                       self.area,
                                       self.line,
                                       self.name,
                                       self.family)

    def tag_name(self):
        return self.tag.name


class Variable(models.Model):
    """
    Modelo Variable, esta relacionada con los tags de Kepware.

    machine. Máquina a la que pertenece la variable
    process. Proceso de la variable
    device. Dispositivo de la variable
    reference. Referencia de la variable
    type. Tipo de Variable (Electroválvula, Corriente, Temperatura)
    tag. Tag relacionada con Kepware
    """
    IS_TEMPERATURE = 1
    IS_CURRENT = 2
    IS_VALVE = 3

    TYPES = (
        (IS_TEMPERATURE, 'Temperatura'),
        (IS_CURRENT, 'Corriente'),
        (IS_VALVE, 'Electroválvula'),
    )

    machine = models.ForeignKey(Machine, on_delete=models.CASCADE,
                                related_name='machine_variable')
    process = models.CharField(max_length=50)
    device = models.CharField(max_length=50)
    reference = models.CharField(max_length=50)
    type = models.PositiveSmallIntegerField(choices=TYPES,
                                            default=IS_TEMPERATURE)
    tag = models.OneToOneField(Tag,
                               on_delete=models.PROTECT)

    def __str__(self):
        return '{}.{}.{} ({})'.format(self.get_type_display(),
                                      self.process,
                                      self.reference,
                                      self.id)

    def tag_name(self):
        """
        Propiedad que retorna el nombre de tag de Kepware
        """
        return self.tag.name

    def unit(self):
        """
        Propiedad que retorna la unidad de medida
        """
        if self.type == self.IS_TEMPERATURE:
            return '°C'
        elif self.type == self.IS_CURRENT:
            return 'A'
        elif self.type == self.IS_VALVE:
            return 'Ciclos'

    def is_valve(self):
        """
        Propiedad que retorna si es una electroválvula
        """
        return self.type == self.IS_VALVE

    def valve_detail(self):
        """
        Propiedad sobre el detalle de una electroválvula
        """
        if (self.is_valve()):
            counter_log = Counter.objects.filter(variable=self,
                                                 status=Counter.LOG
                                                 ).order_by('-date').first()

            if counter_log is not None:
                return json.loads(json.dumps({
                    'date': counter_log.date.strftime("%Y-%m-%d %H:%M:%S")
                }))

    def range_detail(self):
        """
        Propiedad sobre el detalle de una electroválvula
        """
        range_detail = Range.objects.filter(variable=self).first()

        if range_detail is not None:
            return json.loads(json.dumps({
                'max': range_detail.max,
                'min': range_detail.min,
                'tolerance': range_detail.tolerance,
                'notify_to': range_detail.notify_to,
                'is_active': range_detail.is_active
            }))
        # else: 
        #     return json.dumps(None)
        # if not (self.is_valve()):

        # if range_detail is not None:
                


class Value(models.Model):
    """
    Modelo de los Valores Históricos de una Variable.

    variable. Variable relacionada con el valor
    value. Valor Númerico
    date. Fecha de Registro

    *type. Tipo de Variable (Corriente o Temperatura)
    *reference. Nombre de Referencia de la Variable

    * Información Extra
    """
    variable = models.ForeignKey(Variable, on_delete=models.CASCADE,
                                 related_name='value_variable')
    value = models.FloatField()
    date = models.DateTimeField()
    type = models.CharField(max_length=25, blank=True, null=True)
    reference = models.CharField(max_length=100, blank=True, null=True)

    def save(self, *args, **kwargs):
        """
        Añade la información extra.
        """
        self.type = self.variable.get_type_display()
        self.reference = '{}.{}.{}'.format(self.variable.get_type_display(),
                                           self.variable.process,
                                           self.variable.reference)
        super(Value, self).save(*args, **kwargs)


class Counter(models.Model):
    """
    Modelo de reseteos y contadores actuales de las electroválvulas.

    variable. Variable (Electroválvula) relacionada con el contador
    count. Número de conteo
    status. Estatus, determina si es un reseteo o es el contador actual
    notes. Comentarios que se incluyen en un reseteo
    date. Fecha de Registro
    """

    LOG = RESET = 0
    ACTIVE = COUNT = 1

    STATUS = (
        (LOG, 'Log'),
        (ACTIVE, 'Activo'),
    )

    ACTIONS = (
        (RESET, 'Resetear Válvula'),
        (COUNT, 'Actualizar Contador'),
    )

    variable = models.ForeignKey(Variable, on_delete=models.CASCADE,
                                 related_name='counter_variable')
    count = models.PositiveIntegerField()
    status = models.PositiveSmallIntegerField(choices=STATUS,
                                              default=LOG)
    notes = models.TextField(blank=True, null=True)
    date = models.DateTimeField(default=datetime.now)

    def is_active(self):
        """
        Propiedad que determina si el contador de una electroválvula
        es el activo.
        """
        return self.status == self.ACTIVE

    def tag_name(self):
        """
        Propiedad que determina el nombre de tag relacionado a la alarma
        """
        return self.variable.tag.name


class Range(models.Model):
    """
    Modelo Rangos permitidos de las variables.

    variable. Variable relacionada con el Rango
    max. Valor máximo permitido
    min. Valor mínimo permitido
    tolerance. Tolerancia de tiempo en segundos permitida
    notify_to. Correos Electrónicos a quien notificar
    """
    variable = models.ForeignKey(Variable, on_delete=models.CASCADE,
                                 related_name='range_variable')
    max = models.FloatField(null=True, blank=True)
    min = models.FloatField(null=True, blank=True)
    tolerance = models.IntegerField(null=True, blank=True)
    notify_to = models.TextField()
    is_active = models.BooleanField(default=True)

    @property
    def tag_name(self):
        """
        Propiedad que determina el nombre de tag relacionado a la alarma
        """
        return self.variable.tag.name

    def variable_detail(self):
        """
        Propiedad que determina el detalle de una variable.
        """
        return json.loads(json.dumps({
            'unit': self.variable.unit(),
            'type': self.variable.get_type_display(),
            'name': '{}.{}'.format(self.variable.process, self.variable.reference)
        }))
    
    def variable_reference(self):
        # variable = Variable.objects.get(id=self.variable.id)

        return '{}.{}.{}'.format(self.variable.get_type_display(),
                                 self.variable.process,
                                 self.variable.reference)
