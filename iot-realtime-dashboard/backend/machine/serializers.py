"""
Serializadores del app Machine

Eduardo Muñoz López (eduardo@gestalabs.com)
10/02/2020
"""

from rest_framework import serializers
from rest_framework.exceptions import APIException

from machine.models import Schedule, Machine, Variable, Value, Counter, Range
from kepware.models import Tag
from manage.serializers import FamilySerializer


class ScheduleSerializer(serializers.ModelSerializer):
    """
    Serializador del modelo Paros Programados (Schedule)
    """
    line = serializers.ReadOnlyField()

    class Meta:
        model = Schedule
        fields = '__all__'


class MachineSerializer(serializers.ModelSerializer):
    """
    Serializador del modelo Máquina (Machine)
    """
    tagName = serializers.ReadOnlyField(source='tag_name')

    class Meta:
        model = Machine
        exclude = ('is_active',)
        depth = 1


class VariableSerializer(serializers.ModelSerializer):
    """
    Serializador del modelo Variable (Variable)
    """
    type = serializers.ReadOnlyField(source='get_type_display')
    tagName = serializers.ReadOnlyField(source='tag_name')
    unit = serializers.ReadOnlyField()
    isValve = serializers.ReadOnlyField(source='is_valve')
    valveDetail = serializers.ReadOnlyField(source='valve_detail')
    rangeDetail = serializers.ReadOnlyField(source='range_detail')

    class Meta:
        model = Variable
        fields = '__all__'
        depth = 1


class ValueSerializer(serializers.ModelSerializer):
    """
    Serializador del modelo Valor (Value)
    """
    tag_name = serializers.CharField(required=False)

    class Meta:
        model = Value
        exclude = ('variable', )
        read_only_fields = ['type', 'reference']

    def create(self, validated_data):
        try:
            tag = Tag.objects.get(name=validated_data['tag_name'])
            variable = Variable.objects.get(tag=tag)
            value = Value(variable=variable,
                          date=validated_data['date'],
                          value=validated_data['value'])
            value.save()
            return value
        except:
            raise APIException('No se ha podido registrar. Tag no encontrado')


class CounterSerializer(serializers.ModelSerializer):
    """
    Serializador del modelo Contador (Counter)
    """
    tag_name = serializers.CharField(required=False, write_only=True)
    action = serializers.ChoiceField(choices=Counter.ACTIONS,
                                     required=False,
                                     write_only=True)
    tagName = serializers.ReadOnlyField(source='tag_name')
    active = serializers.ReadOnlyField(source='is_active')

    class Meta:
        model = Counter
        exclude = ('variable', 'status', )

    def save(self):
        try:
            tag = Tag.objects.get(name=self.validated_data['tag_name'])
            variable = Variable.objects.get(tag=tag)
            if (self.validated_data['action'] == Counter.COUNT):
                try:
                    counter = Counter.objects.get(variable=variable,
                                                  status=Counter.ACTIVE)
                    Counter.objects.filter(id=counter.id).update(count=self.validated_data['count'])
                except Counter.DoesNotExist:
                    Counter.objects.create(variable=variable,
                                           status=Counter.ACTIVE,
                                           count=self.validated_data['count'])
                except Exception as error:
                    print(error)
                    raise APIException('No se ha podido actualizar. {}'.format(error))

            elif (self.validated_data['action'] == Counter.RESET):
                try:
                    counter = Counter.objects.get(variable=variable,
                                                  status=Counter.ACTIVE)
                    Counter.objects.filter(id=counter.id).update(status=Counter.LOG,
                                                                 date=self.validated_data['date'],
                                                                 notes=self.validated_data['notes'])
                    Counter.objects.create(variable=variable,
                                           status=Counter.ACTIVE,
                                           count=0,
                                           date=self.validated_data['date'])
                except Exception as error:
                    raise APIException('No se ha podido guardar. {}'.format(error))
            else:
                raise APIException('Acción no encontrada...')
        except Exception as error:
            raise APIException('Tag no existente...')


class RangeSerializer(serializers.ModelSerializer):
    """
    Serializador del modelo Rango (Range)
    """
    tagName = serializers.ReadOnlyField(source='tag_name')
    variableDetail = serializers.ReadOnlyField(source='variable_detail')
    variableRef = serializers.ReadOnlyField(source='variable_reference')

    class Meta:
        model = Range
        fields = '__all__'
