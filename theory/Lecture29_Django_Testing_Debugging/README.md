# Lecture 29: Django testing and debugging

## Aim

Test views, a model and a mocked external service.

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
- `students/migrations/0001_initial.py`
- `students/migrations/__init__.py`
- `students/models.py`
- `students/tests.py`
- `students/utils.py`
- `students/views.py`

## How to run

```text
pip install -r requirements.txt
python manage.py test
```

## Output

```text
 identified no issues (0 silenced).
Creating test database for alias 'default' ('file:memorydb_default?mode=memory&cache=shared')...

test_detail (students.tests.StudentAPITest.test_detail) ... ok
test_detail_not_found (students.tests.StudentAPITest.test_detail_not_found) ... ok
test_health_endpoint (students.tests.StudentAPITest.test_health_endpoint) ... ok
test_list (students.tests.StudentAPITest.test_list) ... ok
test_email_is_unique (students.tests.StudentModelTest.test_email_is_unique) ... ok
test_string (students.tests.StudentModelTest.test_string) ... ok
test_success (students.tests.ExternalServiceTest.test_success) ... ok
test_timeout (students.tests.ExternalServiceTest.test_timeout) ... ok

----------------------------------------------------------------------
Ran 8 tests in 0.014s

OK
Destroying test database for alias 'default' ('file:memorydb_default?mode=memory&cache=shared')...
```
