from rest_framework import viewsets
from .models import Student, Grade
from .serializers import StudentSerializer, GradeSerializer


class StudentViewSet(viewsets.ModelViewSet):
    serializer_class = StudentSerializer

    def get_queryset(self):
        queryset = Student.objects.all().order_by('-id')
        # Si React envoie un matricule, on filtre !
        matricule = self.request.query_params.get('student_id', None)
        if matricule is not None:
            queryset = queryset.filter(student_id=matricule)
        return queryset

class GradeViewSet(viewsets.ModelViewSet):
    queryset = Grade.objects.all().order_by('-date_recorded')
    serializer_class = GradeSerializer


   




   