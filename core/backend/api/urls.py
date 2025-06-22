# backeckend/urls.py
from django.urls import path
from backend.views import LoginView
from backend.views import register_user

urlpatterns = [
    path('login/', LoginView.as_view(), name='login'),
    path('register/', register_user),
]
