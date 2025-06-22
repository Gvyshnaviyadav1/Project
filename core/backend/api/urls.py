# backeckend/urls.py
from django.urls import path
from backend.views import LoginView
from backend.views import register_user
from backend.views import ProblemListView, ProblemDetailView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path('login/', LoginView.as_view(), name='login'),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),      # for login
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),     # for refreshing
    path('register/', register_user),
    path('problems/', ProblemListView.as_view(), name='problem-list'),
    path('problems/<int:pk>/', ProblemDetailView.as_view(), name='problem-detail'),
]
