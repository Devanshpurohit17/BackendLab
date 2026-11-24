from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, Field

app = FastAPI(title="Course API")


class CourseIn(BaseModel):
    title: str = Field(min_length=1)
    credits: int = Field(ge=1, le=6)
    department: str = Field(min_length=1)


class Course(CourseIn):
    id: int


courses = {
    1: Course(id=1, title="Backend Development", credits=4, department="CSE"),
    2: Course(id=2, title="Digital Electronics", credits=3, department="ECE"),
}


def find(course_id: int) -> Course:
    if course_id not in courses:
        raise HTTPException(status_code=404, detail="Course not found")
    return courses[course_id]


@app.get("/courses", response_model=list[Course])
def list_courses(department: str | None = None):
    return [c for c in courses.values() if department is None or c.department == department]


@app.get("/courses/{course_id}", response_model=Course)
def get_course(course_id: int):
    return find(course_id)


@app.post("/courses", response_model=Course, status_code=201)
def create_course(data: CourseIn):
    new_id = max(courses, default=0) + 1
    courses[new_id] = Course(id=new_id, **data.model_dump())
    return courses[new_id]


@app.put("/courses/{course_id}", response_model=Course)
def update_course(course_id: int, data: CourseIn):
    find(course_id)
    courses[course_id] = Course(id=course_id, **data.model_dump())
    return courses[course_id]


@app.delete("/courses/{course_id}", status_code=204)
def delete_course(course_id: int):
    find(course_id)
    del courses[course_id]
