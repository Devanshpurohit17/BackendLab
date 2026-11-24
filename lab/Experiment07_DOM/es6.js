import multiply, { PI, add } from "./math.js";

const lines = [];
const show = (label, value) => lines.push(`${label}: ${JSON.stringify(value)}`);

// let / const and block scope
const count = 1;
if (true) {
  const count = 2;
  show("inner const", count);
}
show("outer const", count);

// arrow function, default parameter, template literal
const greet = (name = "Guest") => `Hello, ${name}!`;
show("default parameter", greet());
show("template literal", greet("Devansh"));

// destructuring
const [first, , third] = ["red", "green", "blue"];
const { city, country = "India" } = { city: "Dehradun" };
show("array destructuring", [first, third]);
show("object destructuring", { city, country });

// spread and rest
const sum = (...numbers) => numbers.reduce((total, n) => total + n, 0);
show("spread", [...[1, 2], ...[3, 4]]);
show("rest", sum(1, 2, 3, 4));

// class and inheritance
class Animal {
  constructor(name) {
    this.name = name;
  }
  speak() {
    return `${this.name} makes a sound`;
  }
}
class Dog extends Animal {
  speak() {
    return `${this.name} barks`;
  }
}
show("class", new Dog("Rex").speak());

// enhanced object literal
const key = "dynamic";
show("object literal", { city, [key]: true });

// module
show("module", [PI, add(2, 3), multiply(4, 5)]);

// promise with async / await
const wait = (ms) => new Promise((resolve) => setTimeout(() => resolve("Data loaded"), ms));
show("async/await", await wait(100));

document.getElementById("es6").textContent = lines.join("\n");
