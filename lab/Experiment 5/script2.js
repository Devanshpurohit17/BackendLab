// Task 2: string, array and object methods
const text = "Backend Development";
console.log("Upper case:", text.toUpperCase());
console.log("Lower case:", text.toLowerCase());
console.log("Split:", text.split(" "));

const items = ["Node", "Express"];
items.push("MongoDB"); // add
console.log("First:", items[0]); // read
items[0] = "Node.js"; // update
console.log("Items:", items);
console.log("Lengths:", items.map((item) => item.length));

const user = { name: "Devansh", role: "Dev" };
user.semester = 5; // add
user.role = "Senior Dev"; // update
console.log("User:", user);
console.log("Keys:", Object.keys(user));
