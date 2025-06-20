from rest_framework.routers import DefaultRouter
from django.urls import path,include

router=DefaultRouter()
router.registry.extend()
urlpatterns=[
    path('',include(router.urls))
]