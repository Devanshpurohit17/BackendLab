from django.http import HttpResponse, JsonResponse


def index(request):
    return JsonResponse({
        "message": "Welcome to the Student Management API",
        "version": "1.0",
        "status": "running",
    })


def welcome(request):
    return HttpResponse("Welcome to the Student Management API (Django)")


def health_check(request):
    return JsonResponse({"status": "ok"})
