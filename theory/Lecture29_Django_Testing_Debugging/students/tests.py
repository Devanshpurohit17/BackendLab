from unittest.mock import patch

import requests
from django.db import IntegrityError
from django.test import SimpleTestCase, TestCase
from django.urls import reverse

from .models import Student
from .utils import get_external_data


class StudentAPITest(TestCase):
    def setUp(self):
        self.student = Student.objects.create(name="Aarav", email="aarav@example.com")

    def test_health_endpoint(self):
        response = self.client.get(reverse("health-check"))
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()["status"], "ok")

    def test_list(self):
        students = self.client.get(reverse("student-list")).json()["students"]
        self.assertEqual(len(students), 1)
        self.assertEqual(students[0]["name"], "Aarav")

    def test_detail(self):
        url = reverse("student-detail", kwargs={"student_id": self.student.id})
        response = self.client.get(url)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()["student_id"], self.student.id)

    def test_detail_not_found(self):
        response = self.client.get(reverse("student-detail", kwargs={"student_id": 9999}))
        self.assertEqual(response.status_code, 404)
        self.assertEqual(response.json()["error"], "Student not found")


class StudentModelTest(TestCase):
    def test_string(self):
        self.assertEqual(str(Student(name="Diya")), "Diya")

    def test_email_is_unique(self):
        Student.objects.create(name="A", email="same@example.com")
        with self.assertRaises(IntegrityError):
            Student.objects.create(name="B", email="same@example.com")


class ExternalServiceTest(SimpleTestCase):
    @patch("students.utils.requests.get")
    def test_success(self, mock_get):
        mock_get.return_value.json.return_value = {"name": "Aarav"}
        result = get_external_data(1)
        self.assertEqual(result["data"]["name"], "Aarav")
        self.assertIsNone(result["error"])

    @patch("students.utils.requests.get")
    def test_timeout(self, mock_get):
        mock_get.side_effect = requests.Timeout
        result = get_external_data(1)
        self.assertIsNone(result["data"])
        self.assertEqual(result["error"], "External service timed out")
