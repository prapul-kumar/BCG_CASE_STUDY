from django.urls import path
from .views import policies

urlpatterns = [
    path('policies/',policies,name='policies'),
]