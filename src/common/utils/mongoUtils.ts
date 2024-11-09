import mongoose, { type Mongoose } from "mongoose";
import { env } from "./envConfig";

export const connectMongoDB = async (): Promise<Mongoose> => {
  try {
    console.debug("MONGO_URI", env.MONGO_URI);
    const defaultConnection = await mongoose.connect(env.MONGO_URI);
    console.log("MongoDB connected");

    return defaultConnection;
  } catch (error: unknown) {
    console.error("MongoDB connection failed:", (error as Error).message);
    process.exit(1);
  }
};
