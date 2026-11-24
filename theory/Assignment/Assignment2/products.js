// Task 7: the same products and queries in MongoDB
const { MongoClient } = require("mongodb");
const client = new MongoClient(process.env.MONGO_URL || "mongodb://127.0.0.1:27017");

async function main() {
  const products = client.db("backend_assignment2").collection("products");
  await products.deleteMany({});
  await products.insertMany([
    { name: "Clean Code", category: "book", price: 499, attributes: { author: "Robert C. Martin", pages: 464 } },
    { name: "Eloquent JavaScript", category: "book", price: 650, attributes: { author: "Marijn Haverbeke", pages: 472 } },
    { name: "ProBook 14", category: "laptop", price: 72000, attributes: { ram_gb: 16, cpu: "Ryzen 7" } },
    { name: "LiteBook 13", category: "laptop", price: 41000, attributes: { ram_gb: 8, cpu: "Core i3" } },
    { name: "Wireless Mouse", category: "accessory", price: 899, attributes: { color: "black", wireless: true } },
  ]);
  await products.createIndex({ "attributes.ram_gb": 1 });

  const names = async (filter) => (await products.find(filter).toArray()).map((p) => p.name);
  console.log("Books over 470 pages:", await names({ category: "book", "attributes.pages": { $gt: 470 } }));
  console.log("Laptops 16GB+:", await names({ category: "laptop", "attributes.ram_gb": { $gte: 16 } }));
  console.log("Black accessories:", await names({ category: "accessory", "attributes.color": "black" }));
  console.log("Wireless:", await names({ "attributes.wireless": true }));
}

main()
  .catch((error) => { console.error(error.message); process.exitCode = 1; })
  .finally(() => client.close());
