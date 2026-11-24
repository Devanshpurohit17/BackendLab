-- Library Management System
DROP TABLE IF EXISTS loans, book_authors, books, authors, members;

CREATE TABLE authors (
    author_id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name VARCHAR(100) NOT NULL
);

CREATE TABLE books (
    book_id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    isbn VARCHAR(13) NOT NULL UNIQUE
);

-- many-to-many: a book can have many authors
CREATE TABLE book_authors (
    book_id INTEGER REFERENCES books(book_id) ON DELETE CASCADE,
    author_id INTEGER REFERENCES authors(author_id),
    PRIMARY KEY (book_id, author_id)
);

CREATE TABLE members (
    member_id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE loans (
    loan_id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    book_id INTEGER NOT NULL REFERENCES books(book_id),
    member_id INTEGER NOT NULL REFERENCES members(member_id),
    loan_date DATE NOT NULL DEFAULT CURRENT_DATE,
    return_date DATE,
    CHECK (return_date IS NULL OR return_date >= loan_date)
);

INSERT INTO authors (name) VALUES ('Author A'), ('Author B');
INSERT INTO books (title, isbn) VALUES ('Database Basics', '9780000000001'), ('Web Servers', '9780000000002');
INSERT INTO book_authors VALUES (1, 1), (1, 2), (2, 2);
INSERT INTO members (name, email) VALUES ('Aarav', 'aarav@example.com');
INSERT INTO loans (book_id, member_id, loan_date) VALUES (1, 1, '2026-11-01'), (2, 1, '2026-11-10');

SELECT m.name AS member, b.title, STRING_AGG(a.name, ', ' ORDER BY a.name) AS authors
FROM loans l
JOIN members m ON m.member_id = l.member_id
JOIN books b ON b.book_id = l.book_id
JOIN book_authors ba ON ba.book_id = b.book_id
JOIN authors a ON a.author_id = ba.author_id
GROUP BY l.loan_id, m.name, b.title
ORDER BY l.loan_id;
