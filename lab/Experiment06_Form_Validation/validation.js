const form = document.getElementById("form");
const value = (id) => document.getElementById(id).value;

// each rule returns an error message, or "" when the value is valid
const rules = {
  name: () => (/^[A-Za-z ]{3,}$/.test(value("name").trim()) ? "" : "Use at least 3 letters"),
  email: () => (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value("email")) ? "" : "Enter a valid email"),
  phone: () => (/^[6-9]\d{9}$/.test(value("phone")) ? "" : "Enter a 10 digit mobile number"),
  password: () =>
    /^(?=.*[A-Z])(?=.*\d).{8,}$/.test(value("password")) ? "" : "Use 8+ characters with a capital letter and a digit",
  confirm: () =>
    value("confirm") && value("confirm") === value("password") ? "" : "Passwords do not match",
};

function check(id) {
  const error = rules[id]();
  document.getElementById(id + "-error").textContent = error;
  document.getElementById(id).setAttribute("aria-invalid", error !== "");
  return error === "";
}

Object.keys(rules).forEach((id) => document.getElementById(id).addEventListener("blur", () => check(id)));

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const results = Object.keys(rules).map(check); // check every field, not only the first wrong one
  document.getElementById("result").textContent = results.every(Boolean)
    ? "Registration successful"
    : "Please correct the errors";
});
