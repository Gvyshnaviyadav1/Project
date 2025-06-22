# backeckend/urls.py
from django.urls import path
from backend.views import LoginView
from backend.views import register_user
from backend.views import ProblemListView, ProblemDetailView

urlpatterns = [
    path('login/', LoginView.as_view(), name='login'),
    path('register/', register_user),
    path('problems/', ProblemListView.as_view(), name='problem-list'),
    path('problems/<int:pk>/', ProblemDetailView.as_view(), name='problem-detail'),
]
