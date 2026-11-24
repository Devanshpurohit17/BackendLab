// Fetch all students and filter by branch on the client side.
// Run: node fetch.js   (Express server from lecture 3 must be running)
const URL = process.argv[2] || "http://localhost:3000";

async function getStudentsByBranch(branch) {
  const response = await fetch(`${URL}/students`);
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  const students = await response.json();
  return students.filter((student) => student.branch === branch);
}

getStudentsByBranch("CSE")
  .then((students) => console.log(students))
  .catch((error) => console.error("Request failed:", error.message));
