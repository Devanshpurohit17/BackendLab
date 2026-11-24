// Task 1: arrays, objects and functions
const fruits = ["Apple", "Banana", "Mango"];
console.log("Fruits:", fruits);
fruits.push("Orange");
console.log("After push:", fruits);

const student = { name: "Devansh Purohit", sapId: 590017030, course: "Backend Development" };
console.log("Student:", student);
console.log("Name:", student.name);

function greet(name) {
  return `Hello, ${name}! Welcome to Backend Development Lab.`;
}
console.log(greet(student.name));
