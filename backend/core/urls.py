from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import StudentViewSet, GradeViewSet

router = DefaultRouter()
router.register(r'students', StudentViewSet, basename='student')
router.register(r'grades', GradeViewSet, basename='grade')

urlpatterns = [
    path('', include(router.urls)),
]