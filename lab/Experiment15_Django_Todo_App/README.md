# Experiment 15: Django Task Tracker

## Aim

Build a Django to-do app with templates, static files and admin.

## Files

- `manage.py`
- `requirements.txt`
- `todo/__init__.py`
- `todo/admin.py`
- `todo/apps.py`
- `todo/migrations/0001_initial.py`
- `todo/migrations/__init__.py`
- `todo/models.py`
- `todo/static/todo/css/style.css`
- `todo/static/todo/images/logo.png`
- `todo/static/todo/js/app.js`
- `todo/templates/todo/add_task.html`
- `todo/templates/todo/base.html`
- `todo/templates/todo/footer.html`
- `todo/templates/todo/header.html`
- `todo/templates/todo/task_list.html`
- `todo/tests.py`
- `todo/urls.py`
- `todo/views.py`
- `todo_project/__init__.py`
- `todo_project/asgi.py`
- `todo_project/settings.py`
- `todo_project/urls.py`
- `todo_project/wsgi.py`

## How to run

```text
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
# tests
python manage.py test
```

## Output

```text
 identified no issues (0 silenced).
Creating test database for alias 'default' ('file:memorydb_default?mode=memory&cache=shared')...

test_add (todo.tests.TaskTests.test_add) ... ok
test_blank_title_is_rejected (todo.tests.TaskTests.test_blank_title_is_rejected) ... ok
test_csrf_is_required (todo.tests.TaskTests.test_csrf_is_required) ... ok
test_empty_message (todo.tests.TaskTests.test_empty_message) ... ok
test_get_cannot_delete (todo.tests.TaskTests.test_get_cannot_delete) ... ok
test_toggle_and_delete (todo.tests.TaskTests.test_toggle_and_delete) ... ok

----------------------------------------------------------------------
Ran 6 tests in 0.034s

OK
Destroying test database for alias 'default' ('file:memorydb_default?mode=memory&cache=shared')...
```
