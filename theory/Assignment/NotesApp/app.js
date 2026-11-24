// Assignment 1: notes saved in localStorage
const byId = (id) => document.getElementById(id);
const form = byId("form");
const text = byId("text");
const search = byId("search");
const list = byId("list");
let editingId = null;

function loadNotes() {
  try {
    const saved = JSON.parse(localStorage.getItem("notes"));
    return Array.isArray(saved) ? saved : [];
  } catch {
    return []; // damaged data should not break the page
  }
}

let notes = loadNotes();

function saveNotes() {
  localStorage.setItem("notes", JSON.stringify(notes));
  render();
}

function makeButton(label, onClick) {
  const button = document.createElement("button");
  button.textContent = label;
  button.addEventListener("click", onClick);
  return button;
}

function render() {
  const term = search.value.toLowerCase();
  list.replaceChildren();
  notes.filter((n) => n.text.toLowerCase().includes(term)).forEach((note) => {
    const li = document.createElement("li");
    li.classList.toggle("done", note.completed);
    const p = document.createElement("p");
    p.textContent = note.text;
    const time = document.createElement("small");
    time.textContent = note.updatedAt
      ? "Updated " + new Date(note.updatedAt).toLocaleString()
      : "Created " + new Date(note.createdAt).toLocaleString();
    const actions = document.createElement("div");
    actions.append(
      makeButton(note.completed ? "Undo" : "Done", () => {
        note.completed = !note.completed;
        saveNotes();
      }),
      makeButton("Edit", () => startEdit(note)),
      makeButton("Delete", () => {
        notes = notes.filter((n) => n.id !== note.id);
        if (editingId === note.id) stopEdit();
        saveNotes();
      })
    );
    li.append(p, time, actions);
    list.append(li);
  });
}

function startEdit(note) {
  editingId = note.id;
  text.value = note.text;
  byId("save").textContent = "Save changes";
  byId("cancel").hidden = false;
  text.focus();
}

function stopEdit() {
  editingId = null;
  form.reset();
  byId("save").textContent = "Add note";
  byId("cancel").hidden = true;
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const value = text.value.trim();
  if (!value) return;
  const now = new Date().toISOString();
  if (editingId) {
    const note = notes.find((n) => n.id === editingId);
    note.text = value;
    note.updatedAt = now;
  } else {
    notes.unshift({ id: Date.now(), text: value, completed: false, createdAt: now, updatedAt: null });
  }
  stopEdit();
  saveNotes();
});

byId("cancel").addEventListener("click", stopEdit);
search.addEventListener("input", render);

byId("export").addEventListener("click", () => {
  const link = document.createElement("a");
  link.href = URL.createObjectURL(new Blob([JSON.stringify(notes, null, 2)], { type: "application/json" }));
  link.download = "notes.json";
  link.click();
  URL.revokeObjectURL(link.href);
});

document.body.classList.toggle("dark", localStorage.getItem("theme") === "dark");
byId("theme").addEventListener("click", () => {
  const dark = document.body.classList.toggle("dark");
  localStorage.setItem("theme", dark ? "dark" : "light");
});

render();
