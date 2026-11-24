from pydantic import BaseModel, ConfigDict, EmailStr, Field


class StudentIn(BaseModel):
    name: str = Field(min_length=1)
    email: EmailStr
    branch: str = Field(min_length=1)
    department: str = Field(min_length=1)


class StudentOut(StudentIn):
    model_config = ConfigDict(from_attributes=True)
    id: int


class StudentPage(BaseModel):
    items: list[StudentOut]
    page: int
    limit: int
    total: int
    total_pages: int


class CourseIn(BaseModel):
    code: str = Field(min_length=1)
    title: str = Field(min_length=1)


class CourseOut(CourseIn):
    model_config = ConfigDict(from_attributes=True)
    id: int


class EnrollmentIn(BaseModel):
    course_id: int


class EnrollmentOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    id: int
    course: CourseOut
