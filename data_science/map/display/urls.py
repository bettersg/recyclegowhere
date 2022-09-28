from django.urls import path, include
from . import views
urlpatterns = [
    path("/", views.display_map, name="myMap")
    ]