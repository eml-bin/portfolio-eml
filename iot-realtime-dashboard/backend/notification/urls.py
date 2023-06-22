"""
URLs Routers de Notification

Eduardo Muñoz López (eduardo@gestalabs.com)
10/02/2020
"""

from rest_framework import routers
from notification.views import (AlarmViewSet, ShutdownViewSet)

router = routers.DefaultRouter()
router.register('alarms', AlarmViewSet)
router.register('shutdowns', ShutdownViewSet)
