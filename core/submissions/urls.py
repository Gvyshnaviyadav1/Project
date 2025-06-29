from django.urls import path
from . import views

urlpatterns = [
    path('submit/', views.submit_code, name='submit-code'),
    path('my/', views.UserSubmissionsList.as_view(), name='my-submissions')
]
