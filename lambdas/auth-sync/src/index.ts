import { SNSEvent, SNSHandler } from "aws-lambda";
import { MongoClient, Db } from "mongodb";

const MONGO_URI = process.env.MONGO_URI!;
const DATABASE_NAME = process.env.DATABASE_NAME!;
const COLLECTION_NAME = process.env.COLLECTION_NAME!;

let cachedDb: Db | null = null;

async function connectToDatabase(uri: string): Promise<Db> {
  if (cachedDb) {
    return cachedDb;
  }

  const client = await MongoClient.connect(uri);

  cachedDb = client.db(DATABASE_NAME);
  return cachedDb;
}

export const handler: SNSHandler = async (event: SNSEvent) => {
  const db = await connectToDatabase(MONGO_URI);
  const collection = db.collection(COLLECTION_NAME);

  for (const record of event.Records) {
    const message = JSON.parse(record.Sns.Message);
    const { type, data: user } = message;

    try {
      if (type === "user_created") {
        const existingUser = await collection.findOne({
          $or: [{ id: user.id }, { email: user.email }],
        });

        if (existingUser) {
          throw new Error("User with the same ID or email already exists");
        }

        await collection.insertOne(user);
        console.log("User created successfully");
      } else if (type === "user_updated") {
        await collection.updateOne(
          { id: user.id },
          { $set: user },
          { upsert: true }
        );
        console.log("User updated successfully");
      } else {
        throw new Error("Unsupported event type");
      }
    } catch (error) {
      console.error("Error processing event", error);
      throw error;
    }
  }
};
