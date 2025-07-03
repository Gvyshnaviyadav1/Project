from django.urls import path
from . import views

urlpatterns = [
    path('submit/', views.submit_code, name='submit-code'),
    path('my/', views.UserSubmissionsList.as_view(), name='my-submissions'),
    path('leaderboard/', views.leaderboard_view, name='leaderboard'),
    path('users/me/', views.current_user_view, name='current-user'),
    path('profile/', views.user_profile, name='user-profile'),
]
