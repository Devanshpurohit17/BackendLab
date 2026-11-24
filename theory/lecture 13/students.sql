-- Run: psql -d student_management -f students.sql
-- (create the database first: CREATE DATABASE student_management;)
DROP TABLE IF EXISTS students;

CREATE TABLE students (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    branch VARCHAR(20) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    enrollment_date DATE NOT NULL
);

INSERT INTO students (name, branch, email, enrollment_date) VALUES
('Aarav', 'CSE', 'aarav@example.com', '2023-08-01'),
('Diya',  'ECE', 'diya@example.com',  '2024-08-05'),
('Rohan', 'CSE', 'rohan@example.com', '2024-08-06'),
('Meera', 'IT',  'meera@example.com', '2023-07-30'),
('Kabir', 'ME',  'kabir@example.com', '2025-08-01');

-- students in CSE
SELECT name, email FROM students WHERE branch = 'CSE' ORDER BY id;

-- enrolled after January 2024
SELECT name, enrollment_date FROM students WHERE enrollment_date > '2024-01-31' ORDER BY id;

-- update a branch
UPDATE students SET branch = 'CSE' WHERE name = 'Diya';

-- delete a record
DELETE FROM students WHERE name = 'Kabir';

SELECT id, name, branch FROM students ORDER BY id;
