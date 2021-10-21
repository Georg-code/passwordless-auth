import { MongoClient } from "mongodb";

export interface dbProps {
  mail: string;
  pin?: number;
  verified?: boolean;
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

  if (collection.find({ mail: { $exists: true } })) {
    console.log("Exists");
  }


  
  const addResult = collection.updateMany(
    { mail: { $exists: true } },
    {
      verified: props.verified,
      name: props.name,
      pin: {
        pin: props.pin,
        exp: Date.now() / 1000 + 5 * 60,
      },
      created: Date.now() / 1000,
    },
    { upsert: true }
  );

  console.log("Inserted documents =>") //addResult);

  client.close();
  return "done.";
};

export default database;
