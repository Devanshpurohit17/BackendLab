# Lecture 26: Django framework

## Aim

Create a Django project that returns JSON.

## Files

- `manage.py`
- `requirements.txt`
- `student_system/__init__.py`
- `student_system/asgi.py`
- `student_system/settings.py`
- `student_system/urls.py`
- `student_system/wsgi.py`
- `students/__init__.py`
- `students/admin.py`
- `students/apps.py`
- `students/migrations/__init__.py`
- `students/models.py`
- `students/views.py`

## How to run

```text
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

## Output

```text
GET / -> 200 {"message": "Welcome to the Student Management API", "version": "1.0", "status": "running"}
GET /welcome/ -> 200 (HTML, 46 chars)
GET /health/ -> 200 {"status": "ok"}
```
