from django.shortcuts import get_object_or_404, redirect, render
from django.views.decorators.http import require_POST

from .models import Task


def task_list(request):
    tasks = Task.objects.order_by("-created_at")
    return render(request, "todo/task_list.html", {"tasks": tasks})


def add_task(request):
    error = None
    if request.method == "POST":
        title = request.POST.get("title", "").strip()
        if title and len(title) <= 200:
            Task.objects.create(title=title)
            return redirect("task_list")
        error = "Enter a title of up to 200 characters."
    return render(request, "todo/add_task.html", {"error": error})


@require_POST
def toggle_task(request, task_id):
    task = get_object_or_404(Task, pk=task_id)
    task.completed = not task.completed
    task.save(update_fields=["completed"])
    return redirect("task_list")


@require_POST
def delete_task(request, task_id):
    get_object_or_404(Task, pk=task_id).delete()
    return redirect("task_list")
