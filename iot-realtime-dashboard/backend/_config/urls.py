"""_config URL Configuration (IoT Dashboard API)

Configura los archivos urls.py de cada app para definir las rutas del API.
"""
from django.contrib import admin
from django.conf.urls import url, include
from django.views import generic
from rest_framework.schemas import get_schema_view
from rest_framework_simplejwt.views import (
    TokenRefreshView,
    TokenVerifyView
)

from manage.views import TokenObtainPairView

from rest_framework import views, serializers, status
from rest_framework.response import Response

from rest_framework.views import APIView

from rest_framework.permissions import BasePermission

from manage.urls import router as UserRouter
from machine.urls import router as MachineRouter
from notification.urls import router as NotificationRouter

urlpatterns = [
    url('admin/', admin.site.urls),

    # Redirection to API
    # url(r'^', generic.RedirectView.as_view(url='/api/', permanent=True)),

    # Schema View
    url(r'openapi', get_schema_view(
        title="Your Project",
        description="API for all things …"
    ), name='openapi-schema'),

    # Session Authentication (DEV)
    # url(r'^api/auth', include('rest_framework.urls', namespace='rest_framework')),

    # JWT Authentication
    url(r'^api/login', TokenObtainPairView.as_view(), name='token_obtain'),
    # url(r'^api/refresh/$', TokenRefreshView.as_view(), name='token_refresh'),

    # Pandas Report
    # url(r'^api/report/$', HistoryReportView.as_view(), name='report'),

    # User App urls
    url(r'^api/', include(UserRouter.urls)),

    # Machine App urls
    url(r'^api/', include(MachineRouter.urls)),

    # Notification App urls
    url(r'^api/', include(NotificationRouter.urls))
]
