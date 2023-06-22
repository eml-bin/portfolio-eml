"""
Modelos de Base de Datos del app User

Eduardo Muñoz López (eduardo@gestalabs.com)
10/02/2020
"""

import json
from django.db import models
from django.utils.translation import ugettext_lazy as _
from django.conf import settings
from django.contrib.auth.models import (Group,
                                        AbstractUser)


class User(AbstractUser):
    """
    User Model

    username. usuario (opcional)
    first_name. Nombre del Usuario (requerido)
    last_name. Apellido/s del Usuario (requerido)
    email. Email del Usuario para iniciar sesión (requerido)
    """
    username = models.CharField(_('Usuario'), max_length=15, blank=True, null=True, default="anon")
    first_name = models.CharField(_('Nombre'), max_length=40, blank=False, null=False)
    last_name = models.CharField(_('Apellido/s'), max_length=80, blank=False, null=False)
    email = models.EmailField(_('Email'),
                              unique=True)
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username', 'first_name', 'last_name']

    @property
    def name(self):
        """
        Retorna el Nombre y Apellido/s del Usuario
        """
        return '{} {}'.format(self.first_name, self.last_name)

    @property
    def role(self):
        """
        Retorna el detalle del rol del usuario
        """
        profile = Profile.objects.get(user=self)
        return json.loads(json.dumps(
            {
                'level': 4 if self.is_superuser else profile.role,
                'name': 'Superusuario' if self.is_superuser else profile.get_role_display(),
                'family': profile.family.name if (profile.family is not None) else None
            }
        ))

    def save(self, *args, **kwargs):
        """
        Crea o sobreescribe un perfil de usuario antes de guardar.
        """
        super(User, self).save(*args, **kwargs)
        # print(self.role)
        Profile.objects.update_or_create(user=self)


class Family(models.Model):
    """
    Modelo Familia a la que pertenecen los Usuarios Proveedores y Máquinas

    name. Nombre de la Familia, debe ser único.
    description. Descripción de la Familia (Opcional)
    """
    name = models.CharField(max_length=20, unique=True)
    description = models.CharField(max_length=50, blank=True, null=True)

    def __str__(self):
        return self.name


class Profile(models.Model):
    """
    Profile Model

    user. Usuario relacionado con el Perfil
    role. Rol de Usuario en la Plataforma
    family. Familia relacionada con el usuario,
            aplica principalmente para el rol `Proveedor´
    """
    IS_PROVIDER = 1
    IS_OPERATOR = 2
    IS_ADMIN = 3

    ROLES = (
        (IS_PROVIDER, 'Proveedor'),
        (IS_OPERATOR, 'Operador'),
        (IS_ADMIN, 'Administrador'),
    )

    user = models.OneToOneField(User,
                                on_delete=models.CASCADE,
                                related_name='user_profile')

    role = models.PositiveSmallIntegerField(choices=ROLES,
                                            default=IS_OPERATOR)
    family = models.ForeignKey(Family,
                               on_delete=models.CASCADE,
                               related_name='user_family',
                               null=True,
                               blank=True)
