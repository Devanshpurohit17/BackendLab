// ask before deleting
document.querySelectorAll("form.delete").forEach((form) => {
  form.addEventListener("submit", (event) => {
    if (!confirm("Delete this task?")) event.preventDefault();
  });
});

// character count on the add page
const title = document.getElementById("title");
if (title) {
  title.focus();
  title.addEventListener("input", () => {
    document.getElementById("count").textContent = `${title.value.length} / 200`;
  });
}
