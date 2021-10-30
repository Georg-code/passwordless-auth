import { MongoClient } from "mongodb";

export interface dbProps {
  mail: string;
  pin?: number;
  role: string;
  name?: string;
}

const database = async (props: dbProps) => {
  const url = "mongodb://localhost:27017";
  const client = new MongoClient(url);
  const dbName = "users";
  await client.connect();
  console.log("Connected successfully to server");
  const db = client.db(dbName);
  const collection = db.collection("user-list");
  const mail = props.mail.toLowerCase();

  if (collection.find({ mail })) {
    await collection.updateMany(
      { mail },
      {
        $set: {
          pin: {
            pin: props.pin,
            exp: Date.now() / 1000 + 5 * 60,
          },
        },
      },
      { upsert: true }
    );
    console.log("Update");
  } else {
    await collection.insertMany([
      {
        mail,
        role: props.role,
        pin: {
          pin: props.pin,
          exp: Date.now() / 1000 + 5 * 60,
        },
        created: Date.now() / 1000,
      },
    ]);
    console.log("Insert");
  }

  console.log("Inserted documents =>"); //addResult);

  client.close();
  return "done.";
};

export default database;
