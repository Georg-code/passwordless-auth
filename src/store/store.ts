import { MongoClient } from "mongodb";

const url = "mongodb://localhost:27017";
const client = new MongoClient(url);

// Database Name
const dbName = "users";

async function main() {
  // Use connect method to connect to the server
  await client.connect();
  console.log("Connected successfully to server");
  const db = client.db(dbName);
  const collection = db.collection("user-list");

  const insertResult = await collection.insertMany([
    { a: {id: "1", mail: "mail@mail.ch", name: "vor nach", pins: {123: "ablaufdatum"}} },
  ]);
  console.log("Inserted documents =>", insertResult);

  return "done.";
}

main().then(() => client.close());
