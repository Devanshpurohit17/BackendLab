from django.urls import path

from students import views

urlpatterns = [
    path("", views.index, name="index"),
    path("welcome/", views.welcome, name="welcome"),
    path("health/", views.health_check, name="health-check"),
]
