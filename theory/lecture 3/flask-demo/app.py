from flask import Flask, jsonify, request

app = Flask(__name__)

students = [
    {"id": 1, "name": "Aarav", "branch": "CSE"},
    {"id": 2, "name": "Diya", "branch": "ECE"},
]


@app.get("/")
def home():
    return "Student Management API"


@app.get("/students")
def get_students():
    return jsonify(students)


@app.get("/students/<int:student_id>")
def get_student(student_id):
    for student in students:
        if student["id"] == student_id:
            return jsonify(student)
    return jsonify({"error": "Student not found"}), 404


# Lab exercise: add a student
@app.post("/students")
def add_student():
    data = request.get_json(silent=True)
    if not isinstance(data, dict) or not data.get("name") or not data.get("branch"):
        return jsonify({"error": "name and branch are required"}), 400
    student = {"id": len(students) + 1, "name": data["name"], "branch": data["branch"]}
    students.append(student)
    return jsonify(student), 201


if __name__ == "__main__":
    app.run(port=5000)
