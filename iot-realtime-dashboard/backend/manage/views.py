"""
Vistas disponibles del app User

Eduardo Muñoz López (eduardo@gestalabs.com)
10/02/2020
"""
from rest_framework import viewsets, mixins
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.exceptions import APIException

from manage.serializers import (ProfileSerializer,
                                NewUserSerializer,
                                FamilySerializer,
                                UpdateUserSerializer,
                                UpdateUserPasswordSerializer,
                                TokenObtainPairSerializer)
from manage.models import User, Profile, Family
from django.db.models import Q


class UserViewSet(mixins.CreateModelMixin,
                  mixins.ListModelMixin,
                  mixins.UpdateModelMixin,
                  viewsets.GenericViewSet):
    """
    Vista que administra las peticiones de los Usuarios
    """
    PROFILE_UPDATE = 1
    PASSWORD_UPDATE = 2

    queryset = User.objects.filter(is_superuser=False, is_active=True)
    serializer_class = NewUserSerializer

    def list(self, request, *args, **kwargs):
        queryset = Profile.objects.filter(user__is_superuser=False, user__is_active=True).filter(Q(role=Profile.IS_ADMIN) | Q(role=Profile.IS_OPERATOR))
        serializer = ProfileSerializer(queryset, many=True)
        return Response(serializer.data)

    def create(self, request, *args, **kwargs):
        """
        POST. Crea un nuevo usuario
        """
        serializer = NewUserSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

    def update(self, request, *args, **kwargs):
        """
        PATCH. Actualiza un usuario y su perfil o su contraseña.
        """
        instance = self.get_object()
        if (request.data['action'] == self.PROFILE_UPDATE):
            serializer = UpdateUserSerializer(instance, data=request.data, partial=True)
        elif (request.data['action'] == self.PASSWORD_UPDATE):
            serializer = UpdateUserPasswordSerializer(instance, data=request.data, partial=True)
        else:
            raise APIException("No es posible actualizar al usuario")
            
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        headers = self.get_success_headers(serializer.data)

        return Response(serializer.data, status=status.HTTP_200_OK, headers=headers)


class FamilyViewSet(mixins.ListModelMixin,
                    mixins.CreateModelMixin,
                    viewsets.GenericViewSet):
    """
    Vista que administra las peticiones de las Familias
    """
    queryset = Family.objects.all()
    serializer_class = FamilySerializer


class TokenObtainPairView(TokenObtainPairView):
    """
    Vista que administra el token JWT
    """
    serializer_class = TokenObtainPairSerializer
