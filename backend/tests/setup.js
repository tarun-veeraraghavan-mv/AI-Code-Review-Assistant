// test/setup.js
import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";

export let mongo;

export async function setupDB() {
  mongo = await MongoMemoryServer.create();
  const uri = mongo.getUri();
  await mongoose.connect(uri);
}

export async function teardownDB() {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await mongo.stop();
}
