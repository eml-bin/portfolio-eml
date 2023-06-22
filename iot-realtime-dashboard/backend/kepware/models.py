"""
Modelos disponibles del app Kepware

Eduardo Muñoz López (eduardo@gestalabs.com)
10/02/2020
"""

from django.db import models

class Tag(models.Model):
    """
    Modelo que relaciona los tags de Kepware con los objetos del API
    """
    name = models.CharField(max_length=500, unique=True)

    def __str__(self):
        return '{} ({})'.format(self.name, self.id)
