from django.shortcuts import render

# Create your views here.
from rest_framework import viewsets
from .models import Student, Grade
from .serializers import StudentSerializer, GradeSerializer

class StudentViewSet(viewsets.ModelViewSet):
    queryset = Student.objects.all()
    serializer_class = StudentSerializer

class GradeViewSet(viewsets.ModelViewSet):
    queryset = Grade.objects.all()
    serializer_class = GradeSerializer