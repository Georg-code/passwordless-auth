import { MongoClient } from "mongodb";

export interface dbProps {
  mail?: string;
  name?: string;
  pin?: {};
}

const database = async (props) => {
  const url = "mongodb://localhost:27017";
  const client = new MongoClient(url);
  const dbName = "users";
  await client.connect();
  console.log("Connected successfully to server");
  const db = client.db(dbName);
  const collection = db.collection("user-list");

  const insertResult = await collection.insertMany([
    {
      a: {
        mail: "mail@mail.ch",
        name: "vor nach",
        verified: "",
        pins: { 123: "ablaufdatum" },
        created: "",
      },
    },
  ]);
     console.log("Inserted documents =>", insertResult);
     
  client.close()
  return "done.";
};

export default database;
