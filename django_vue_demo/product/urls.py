from django.urls import path, include
from rest_framework import routers

from . import views

router = routers.DefaultRouter()
router.register('productitem', views.CredentialViewSet)

app_name = 'product'

urlpatterns = [
    path('', include(router.urls)),
]
