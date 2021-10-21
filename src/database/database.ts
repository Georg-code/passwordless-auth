import { MongoClient } from "mongodb";

export interface dbProps {
  mail: string;
  pin?: number;
  verified?: boolean;
}

const database = async (props: dbProps) => {
  const url = "mongodb://localhost:27017";
  const client = new MongoClient(url);
  const dbName = "users";
  await client.connect();
  console.log("Connected successfully to server");
  const db = client.db(dbName);
  const collection = db.collection("user-list");

  const insertResult = await collection.insertMany([
    {
      mail: props.mail,
      verified: props.verified,
      pin: {
        pin: props.pin,
        exp: Date.now() / 1000 + 5 * 60,
      },
      created: Date.now() / 1000,
    },
  ]);
  console.log("Inserted documents =>", insertResult);

  client.close();
  return "done.";
};

export default database;
