from django.contrib import admin
from .models import Schedule, Machine, Variable, Value, Counter, Range

# Register your models here.
admin.site.register(Schedule)
admin.site.register(Machine)
admin.site.register(Variable)
admin.site.register(Value)
admin.site.register(Counter)
admin.site.register(Range)
