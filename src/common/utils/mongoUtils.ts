import mongoose, { type Mongoose } from "mongoose";

import { env } from "@/common/utils/envConfig.js";
import { logger } from "@/server.js";

export const connectMongoDB = async (): Promise<Mongoose> => {
  try {
    logger.debug("MONGO_URI", env.MONGO_URI);
    const defaultConnection = await mongoose.connect(env.MONGO_URI);
    logger.info("MongoDB connected");

    return defaultConnection;
  } catch (error: unknown) {
    logger.error("MongoDB connection failed:", (error as Error).message);
    process.exit(1);
  }
};

export const shutDownMongoDB = async (): Promise<void> => {
  await mongoose.connection.close();
  logger.info("MongoDB connection closed");
};
