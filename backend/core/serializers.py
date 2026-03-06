from rest_framework import serializers
from .models import Student, Grade

class GradeSerializer(serializers.ModelSerializer):
    subject_display = serializers.CharField(source='get_subject_display', read_only=True)
    
    # 🪄 L'ASTUCE MAGIQUE : On prend "value" de la DB et on l'envoie sous le nom "score" pour React !
    score = serializers.DecimalField(source='value', max_digits=4, decimal_places=2, read_only=True)

    class Meta:
        model = Grade
        # On envoie "score" (pour la moyenne) et "type_eval" (pour les badges)
        fields = ['id', 'student', 'subject', 'subject_display', 'score', 'type_eval', 'date_recorded']

class StudentSerializer(serializers.ModelSerializer):
    grades = GradeSerializer(many=True, read_only=True)

    class Meta:
        model = Student
        fields = ['id', 'first_name', 'last_name', 'student_id', 'grades']