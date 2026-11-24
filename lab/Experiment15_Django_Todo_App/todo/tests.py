from django.test import Client, TestCase
from django.urls import reverse

from .models import Task


class TaskTests(TestCase):
    def test_empty_message(self):
        self.assertContains(self.client.get(reverse("task_list")), "No tasks yet")

    def test_add(self):
        self.client.post(reverse("add_task"), {"title": "Study Django"})
        self.assertEqual(Task.objects.get().title, "Study Django")

    def test_blank_title_is_rejected(self):
        self.client.post(reverse("add_task"), {"title": "   "})
        self.assertEqual(Task.objects.count(), 0)

    def test_toggle_and_delete(self):
        task = Task.objects.create(title="A")
        self.client.post(reverse("toggle_task", args=[task.id]))
        task.refresh_from_db()
        self.assertTrue(task.completed)
        self.client.post(reverse("delete_task", args=[task.id]))
        self.assertFalse(Task.objects.exists())

    def test_get_cannot_delete(self):
        task = Task.objects.create(title="A")
        self.assertEqual(self.client.get(reverse("delete_task", args=[task.id])).status_code, 405)

    def test_csrf_is_required(self):
        response = Client(enforce_csrf_checks=True).post(reverse("add_task"), {"title": "A"})
        self.assertEqual(response.status_code, 403)
