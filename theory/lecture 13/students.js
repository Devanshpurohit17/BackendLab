// The same student data in MongoDB
const { MongoClient } = require("mongodb");
const client = new MongoClient(process.env.MONGO_URL || "mongodb://127.0.0.1:27017");

async function main() {
  const students = client.db("backend_lecture13").collection("students");
  await students.deleteMany({}); // start clean on every run

  await students.insertMany([
    { name: "Aarav", branch: "CSE", email: "aarav@example.com", enrolled: new Date("2023-08-01") },
    { name: "Diya", branch: "ECE", email: "diya@example.com", enrolled: new Date("2024-08-05") },
    { name: "Rohan", branch: "CSE", email: "rohan@example.com", enrolled: new Date("2024-08-06") },
  ]);

  const names = async (filter) => (await students.find(filter).toArray()).map((s) => s.name);
  console.log("CSE students:", await names({ branch: "CSE" }));
  console.log("After January 2024:", await names({ enrolled: { $gte: new Date("2024-02-01") } }));

  await students.updateOne({ name: "Diya" }, { $set: { branch: "CSE" } });
  await students.deleteOne({ name: "Aarav" });
  console.log("After update and delete:", await names({ branch: "CSE" }));
}

main()
  .catch((error) => { console.error(error.message); process.exitCode = 1; })
  .finally(() => client.close());
