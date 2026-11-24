const byId = (id) => document.getElementById(id);
let students = [];

async function request(url) {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  return response;
}

function render(list) {
  byId("rows").replaceChildren(...list.map((s) => {
    const row = document.createElement("tr");
    [s.id, s.name, s.course, s.email, s.semester].forEach((value) => {
      row.insertCell().textContent = value; // textContent prevents HTML injection
    });
    return row;
  }));
}

function setStudents(list, source) {
  students = list;
  const courses = [...new Set(list.map((s) => s.course))];
  byId("course").replaceChildren(new Option("All courses", ""), ...courses.map((c) => new Option(c, c)));
  byId("search").value = "";
  byId("status").textContent = `${list.length} students loaded from ${source}`;
  render(list);
}

// run a loader and show any error on the page
const load = (loader) => async () => {
  byId("status").className = "";
  try {
    await loader();
  } catch (error) {
    byId("status").className = "error";
    byId("status").textContent = "Could not load data: " + error.message;
  }
};

byId("json").onclick = load(async () => {
  const data = await (await request("students.json")).json();
  setStudents(data.students, "JSON");
});

byId("xml").onclick = load(async () => {
  const text = await (await request("students.xml")).text();
  const xml = new DOMParser().parseFromString(text, "application/xml");
  if (xml.querySelector("parsererror")) throw new Error("Invalid XML");
  const list = [...xml.querySelectorAll("student")].map((node) => {
    const get = (tag) => node.querySelector(tag).textContent;
    return {
      id: Number(node.getAttribute("id")),
      name: get("name"),
      course: get("course"),
      email: get("email"),
      semester: Number(get("semester")),
    };
  });
  setStudents(list, "XML");
});

byId("html").onclick = load(async () => {
  byId("notice").innerHTML = await (await request("notice.html")).text(); // our own trusted file
  byId("notice").hidden = false;
});

// Task 5: works only when server.js is running
byId("api").onclick = load(async () => {
  const data = await (await request("api/students")).json();
  setStudents(data.students, "Express API");
});

// Task 2: search without another request
byId("search").oninput = () => {
  const term = byId("search").value.toLowerCase();
  render(students.filter((s) => s.name.toLowerCase().includes(term)));
};

// Task 3: filter by course in two ways
byId("filter").onclick = () => {
  const course = byId("course").value;
  render(students.filter((s) => !course || s.course === course));
};

$("#filterJquery").on("click", function () {
  const course = $("#course").val();
  render(students);
  $("#rows tr").each(function () {
    $(this).toggle(!course || $(this).find("td").eq(2).text() === course);
  });
});
