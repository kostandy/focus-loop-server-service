import cors from "cors";
import express, { type Express } from "express";
import helmet from "helmet";
import { pino } from "pino";

import { openAPIRouter } from "@/api-docs/openAPIRouter.js";
// import { authRouter } from "@/api/auth/authRouter.js";
import { healthCheckRouter } from "@/api/healthCheck/healthCheckRouter.js";
import { userRouter } from "@/api/user/userRouter.js";
// import { taskRouter } from "@/api/task/taskRouter";
import errorHandler from "@/common/middleware/errorHandler.js";
import rateLimiter from "@/common/middleware/rateLimiter.js";
import requestLogger from "@/common/middleware/requestLogger.js";
import { env } from "@/common/utils/envConfig.js";

const logger = pino({ name: "server start" });
const app: Express = express();

// Set the application to trust the reverse proxy
app.set("trust proxy", true);

(async () => {
  const { connectMongoDB } = await import("@/common/utils/mongoUtils.js");
  await connectMongoDB();
})();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: env.CORS_ORIGIN, credentials: true }));
app.use(helmet());
app.use(rateLimiter);

// Request logging
app.use(requestLogger);

// Routes
app.use("/health-check", healthCheckRouter);
// app.use("/auth", authRouter);
app.use("/users", userRouter);
//app.use('/tasks', taskRouter);

// Swagger UI
app.use(openAPIRouter);

// Error handlers
app.use(errorHandler());

export { app, logger };
