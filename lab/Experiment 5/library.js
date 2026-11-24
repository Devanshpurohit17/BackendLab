// PBL activity: library book manager
const library = [];

function addBook(title, author) {
  const book = { title, author };
  library.push(book);
  return book;
}

function findBook(title) {
  return library.find((book) => book.title.toLowerCase() === title.toLowerCase());
}

addBook("Clean Code", "Robert C. Martin");
addBook("Eloquent JavaScript", "Marijn Haverbeke");

console.log("Library:", library);
console.log("Find 'clean code':", findBook("clean code"));
console.log("Find 'Unknown':", findBook("Unknown"));
