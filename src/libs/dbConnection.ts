import mongoose from "mongoose";

const Mongo_Url: string | undefined = process.env.MONGO_URL;
if (!Mongo_Url) {
  console.log("mongo url is not found");
}

let cached = (global as any).mongoose;
if (!cached) {
  cached = (global as any).mongoose = {
    conn: null,
    promise: null,
  };
}

export const dbConnection = async () => {
  if (cached.conn) {
    console.log("Mongodb already connected");
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(Mongo_Url);
  }
  try {
    cached.conn = await cached.promise;
    console.log("Mongodb connected successfully");
    return cached.conn;
  } catch (error) {
    console.log(`Error while during the db connection ${error?.messasge}`);
  }
};
