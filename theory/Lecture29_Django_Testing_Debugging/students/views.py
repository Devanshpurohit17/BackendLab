from django.http import JsonResponse

from .models import Student


def health_check(request):
    return JsonResponse({"status": "ok"})


def student_list(request):
    students = list(Student.objects.order_by("id").values("id", "name", "email"))
    return JsonResponse({"students": students})


def student_detail(request, student_id):
    student = Student.objects.filter(pk=student_id).first()
    if student is None:
        return JsonResponse({"error": "Student not found"}, status=404)
    return JsonResponse({"student_id": student.id, "name": student.name, "email": student.email})
