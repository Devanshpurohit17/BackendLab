const box = document.querySelector("#box");
const list = document.querySelector("#items");
let number = 1;

document.querySelector("#text").addEventListener("click", () => {
  box.textContent = "Text changed using textContent";
});
document.querySelector("#color").addEventListener("click", () => box.classList.toggle("highlight"));
document.querySelector("#attr").addEventListener("click", () => {
  box.setAttribute("title", "Added by setAttribute");
  box.textContent = "title = " + box.getAttribute("title");
});
document.querySelector("#add").addEventListener("click", () => {
  const item = document.createElement("li");
  item.textContent = "Item " + number++;
  list.append(item);
});
document.querySelector("#remove").addEventListener("click", () => list.lastElementChild?.remove());
document.querySelector("#traverse").addEventListener("click", () => {
  box.textContent = `List has ${list.children.length} items, parent is ${list.parentElement.tagName}`;
});
