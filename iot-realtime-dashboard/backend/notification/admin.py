from django.contrib import admin
from .models import Alarm, Shutdown

admin.site.register(Alarm)
admin.site.register(Shutdown)
