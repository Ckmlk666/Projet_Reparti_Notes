from django.contrib import admin
from .models import Student, Grade # Attention: il vaut mieux utiliser .models au lieu de core.models si tu es dans le même dossier

@admin.register(Student)
class StudentAdmin(admin.ModelAdmin):
    list_display = ('student_id', 'first_name', 'last_name')
    search_fields = ('student_id', 'last_name')

@admin.register(Grade)
class GradeAdmin(admin.ModelAdmin):
    # 👇 Ajout de 'type_eval' ici pour le voir dans le tableau Django Admin 👇
    list_display = ('student', 'subject', 'type_eval', 'value', 'date_recorded')
    # 👇 Ajout de 'type_eval' ici pour pouvoir filtrer par Devoir ou Composition 👇
    list_filter = ('subject', 'type_eval')