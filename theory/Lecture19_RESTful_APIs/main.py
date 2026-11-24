from typing import Annotated

from fastapi import Depends, FastAPI, HTTPException, Query
from sqlalchemy import func, or_, select
from sqlalchemy.exc import IntegrityError
from sqlalchemy.orm import Session

from database import Base, engine, get_db
from models import Course, Enrollment, Student
from schemas import (
    CourseIn, CourseOut, EnrollmentIn, EnrollmentOut, StudentIn, StudentOut, StudentPage,
)

Base.metadata.create_all(engine)
app = FastAPI(title="Student Management API")
Db = Annotated[Session, Depends(get_db)]


def get_or_404(db: Session, model, item_id: int):
    item = db.get(model, item_id)
    if item is None:
        raise HTTPException(404, f"{model.__name__} not found")
    return item


def save(db: Session, item, conflict: str):
    """Commit the item, or return 409 when a unique rule is broken."""
    db.add(item)
    try:
        db.commit()
    except IntegrityError:
        db.rollback()
        raise HTTPException(409, conflict)
    db.refresh(item)
    return item


@app.get("/students", response_model=StudentPage)
def list_students(
    db: Db,
    branch: str | None = None,
    department: str | None = None,
    search: str | None = None,
    page: Annotated[int, Query(ge=1)] = 1,
    limit: Annotated[int, Query(ge=1, le=100)] = 10,
):
    query = select(Student)
    if branch:
        query = query.where(Student.branch == branch)
    if department:
        query = query.where(Student.department == department)
    if search:
        query = query.where(or_(Student.name.icontains(search, autoescape=True),
                                Student.email.icontains(search, autoescape=True)))
    total = db.scalar(select(func.count()).select_from(query.subquery()))
    items = db.scalars(query.order_by(Student.id).offset((page - 1) * limit).limit(limit)).all()
    return {"items": items, "page": page, "limit": limit, "total": total,
            "total_pages": (total + limit - 1) // limit}


@app.post("/students", response_model=StudentOut, status_code=201)
def create_student(data: StudentIn, db: Db):
    return save(db, Student(**data.model_dump()), "Email already exists")


@app.get("/students/{student_id}", response_model=StudentOut)
def get_student(student_id: int, db: Db):
    return get_or_404(db, Student, student_id)


@app.put("/students/{student_id}", response_model=StudentOut)
def update_student(student_id: int, data: StudentIn, db: Db):
    student = get_or_404(db, Student, student_id)
    for key, value in data.model_dump().items():
        setattr(student, key, value)
    return save(db, student, "Email already exists")


@app.delete("/students/{student_id}", status_code=204)
def delete_student(student_id: int, db: Db):
    db.delete(get_or_404(db, Student, student_id))
    db.commit()


@app.post("/courses", response_model=CourseOut, status_code=201)
def create_course(data: CourseIn, db: Db):
    return save(db, Course(**data.model_dump()), "Course code already exists")


@app.get("/courses", response_model=list[CourseOut])
def list_courses(db: Db):
    return db.scalars(select(Course).order_by(Course.id)).all()


@app.get("/students/{student_id}/enrollments", response_model=list[EnrollmentOut])
def list_enrollments(student_id: int, db: Db):
    return get_or_404(db, Student, student_id).enrollments


@app.post("/students/{student_id}/enrollments", response_model=EnrollmentOut, status_code=201)
def enroll(student_id: int, data: EnrollmentIn, db: Db):
    get_or_404(db, Student, student_id)
    get_or_404(db, Course, data.course_id)
    return save(db, Enrollment(student_id=student_id, course_id=data.course_id), "Already enrolled")
