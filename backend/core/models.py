
# Create your models here.
from django.db import models

class Student(models.Model):
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    student_id = models.CharField(max_length=20, unique=True)

    def __str__(self):
        return f"{self.first_name} {self.last_name}"

class Grade(models.Model):
    SUBJECT_CHOICES = [
        ('MATH', 'Mathématiques'),
        ('PHYS', 'Physique'),
        ('INFO', 'Informatique'),
    ]
    TYPE_CHOICES = [
        ('DEVOIR', 'Devoir'),
        ('COMPO', 'Composition'),
    ]
    student = models.ForeignKey(Student, on_delete=models.CASCADE, related_name='grades')
    subject = models.CharField(max_length=10, choices=SUBJECT_CHOICES)
    type_eval = models.CharField(max_length=10, choices=TYPE_CHOICES, default='DEVOIR') # NOUVEAU !
    value = models.DecimalField(max_digits=4, decimal_places=2)
    date_recorded = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.get_type_eval_display()} {self.get_subject_display()} : {self.value} ({self.student})"







        