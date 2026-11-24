class Task {
  constructor(title) {
    this.id = crypto.randomUUID();
    this.title = title;
    this.completed = false;
  }
}

let tasks = [];
const list = document.getElementById("taskList");
const input = document.getElementById("taskInput");
const log = document.getElementById("log");
const write = (message) => {
  log.textContent = message + "\n" + log.textContent;
};

function render() {
  list.replaceChildren();
  tasks.forEach(({ id, title, completed }) => {
    const li = document.createElement("li");
    li.dataset.id = id;
    const span = document.createElement("span");
    span.textContent = title; // textContent keeps user input safe
    span.classList.toggle("done", completed);
    const button = document.createElement("button");
    button.textContent = "Delete";
    li.append(span, button);
    list.append(li);
  });
}

// submit event
document.getElementById("form").addEventListener("submit", (event) => {
  event.preventDefault();
  const title = input.value.trim();
  if (!title) return;
  tasks = [...tasks, new Task(title)];
  input.value = "";
  render();
});

// event delegation: one listener for every list item
list.addEventListener("click", (event) => {
  const id = event.target.closest("li")?.dataset.id;
  if (!id) return;
  if (event.target.tagName === "BUTTON") {
    tasks = tasks.filter((t) => t.id !== id);
  } else if (event.target.tagName === "SPAN") {
    tasks = tasks.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t));
  }
  render();
});

// bubbling
document.getElementById("outer").addEventListener("click", () => write("outer clicked"));
document.getElementById("inner").addEventListener("click", (event) => {
  write("inner clicked");
  if (document.getElementById("stop").checked) event.stopPropagation();
});

// keyboard event
document.getElementById("keys").addEventListener("keydown", (event) => write(`key: ${event.key}`));
