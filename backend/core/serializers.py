from rest_framework import serializers
from .models import Student, Grade

class GradeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Grade
        fields = '__all__'

class StudentSerializer(serializers.ModelSerializer):
    grades = GradeSerializer(many=True, read_only=True)
    class Meta:
        model = Student
        fields = ['id', 'first_name', 'last_name', 'student_id', 'grades']