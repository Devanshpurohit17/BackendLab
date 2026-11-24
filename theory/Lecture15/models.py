from sqlalchemy import CheckConstraint, ForeignKey, String
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column, relationship


class Base(DeclarativeBase):
    pass


class Department(Base):
    __tablename__ = "departments"
    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String(50), unique=True)
    students: Mapped[list["Student"]] = relationship(back_populates="department")


class Student(Base):
    __tablename__ = "students"
    __table_args__ = (CheckConstraint("branch IN ('CSE', 'ECE', 'IT')", name="valid_branch"),)
    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String(100))
    email: Mapped[str] = mapped_column(String(100), unique=True)
    branch: Mapped[str] = mapped_column(String(10))
    department_id: Mapped[int] = mapped_column(ForeignKey("departments.id"))
    department: Mapped[Department] = relationship(back_populates="students")
    # deleting a student also deletes their enrollments
    enrollments: Mapped[list["Enrollment"]] = relationship(
        back_populates="student", cascade="all, delete-orphan"
    )


class Enrollment(Base):
    __tablename__ = "enrollments"
    id: Mapped[int] = mapped_column(primary_key=True)
    course: Mapped[str] = mapped_column(String(100))
    student_id: Mapped[int] = mapped_column(ForeignKey("students.id"))
    student: Mapped[Student] = relationship(back_populates="enrollments")
