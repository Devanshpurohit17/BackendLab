from sqlalchemy import create_engine, func, select
from sqlalchemy.exc import IntegrityError
from sqlalchemy.orm import Session

from models import Base, Department, Enrollment, Student

engine = create_engine("sqlite:///:memory:")
Base.metadata.create_all(engine)

with Session(engine) as session:
    # Create
    department = Department(name="Computer Science")
    student = Student(name="Aarav", email="aarav@example.com", branch="CSE", department=department)
    student.enrollments = [Enrollment(course="Backend"), Enrollment(course="DBMS")]
    session.add(student)
    session.commit()
    print("Created:", student.name, "in", student.department.name)

    # Read
    cse = session.scalars(select(Student).where(Student.branch == "CSE")).all()
    print("CSE students:", [s.name for s in cse])

    # Update
    student.branch = "IT"
    session.commit()
    print("New branch:", student.branch)

    # Validation: the same email is rejected
    session.add(Student(name="Copy", email="aarav@example.com", branch="CSE", department=department))
    try:
        session.commit()
    except IntegrityError:
        session.rollback()
        print("Duplicate email rejected")

    # Delete and verify cascade
    count = lambda: session.scalar(select(func.count()).select_from(Enrollment))
    print("Enrollments before delete:", count())
    session.delete(student)
    session.commit()
    print("Enrollments after delete:", count())
