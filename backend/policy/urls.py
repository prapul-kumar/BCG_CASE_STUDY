from django.urls import path,re_path
from .views import regions,policies

urlpatterns = [
    path("",policies,name="policies"),
    path("regions/",regions,name="regions")
]