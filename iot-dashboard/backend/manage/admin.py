from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin

from manage.models import User, Profile, Group, Family


class UserProfileInline(admin.StackedInline):
    model = Profile
    can_delete = False


@admin.register(User)
class UserAdmin(BaseUserAdmin):

    list_display = ('email',
                    'is_active',
                    'is_superuser',
                    'get_role',
                    'get_family'
                    )
    inlines = (UserProfileInline, )
    model = User

    fieldsets = (
        (None,
         {'fields': ('email', 'password')}),
        ('Personal info',
         {'fields': ('first_name',
                     'last_name',
                     'username',)}),
        ('Permissions',
         {'fields': ('is_active',
                     'is_superuser')}),
    )

    def get_role(self, instance):
        return instance.user_profile.get_role_display()

    get_role.short_description = 'Rol'

    def get_family(self, instance):
        return instance.user_profile.family

    get_family.short_description = 'Familia'


admin.site.register(Family)
