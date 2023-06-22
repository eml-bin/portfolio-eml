from rest_framework import routers
from manage.views import UserViewSet, FamilyViewSet

router = routers.DefaultRouter(trailing_slash=False)
router.register('families', FamilyViewSet)
router.register('profiles', UserViewSet)
