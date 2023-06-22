"""
URLs Routers de Machine

Eduardo Muñoz López (eduardo@gestalabs.com)
10/02/2020
"""

from rest_framework import routers
from machine.views import (MachineViewSet,
                           VariableViewSet,
                           ValueViewSet,
                           HistoryViewSet,
                           CounterViewSet,
                           RangeViewSet,
                           ScheduleViewSet,
                           ExportViewSet)

router = routers.DefaultRouter()
router.register('machines', MachineViewSet)
router.register('variables', VariableViewSet)
router.register('history', HistoryViewSet)
router.register('values', ValueViewSet)
router.register('counters', CounterViewSet)
router.register('ranges', RangeViewSet)
router.register('schedule', ScheduleViewSet)
router.register('export', ExportViewSet)
   