import mongoose from "mongoose";

let connectionPromise;

export function connectDB() {
  if (mongoose.connection.readyState === 1)
    return Promise.resolve(mongoose.connection);
  if (!connectionPromise) {
    const uri =
      process.env.MONGODB_URI || process.env.MONGODB || process.env.MONGODB_URL;
    if (!uri) throw new Error("MONGODB_URI is not configured");
    connectionPromise = mongoose.connect(uri).catch((error) => {
      connectionPromise = undefined;
      throw error;
    });
  }
  return connectionPromise;
}
