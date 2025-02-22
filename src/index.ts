import { env } from "@/common/utils/envConfig.js";
import { shutDownMongoDB } from "@/common/utils/mongoUtils.js";
import { app, logger } from "@/server.js";

const server = app.listen(env.PORT, () => {
  const { NODE_ENV, HOST, PORT } = env;
  logger.info(`Server (${NODE_ENV}) running on http://${HOST}:${PORT}`);
});

const onCloseSignal = () => {
  logger.info("sigint received, shutting down");

  shutDownMongoDB();

  server.close(() => {
    logger.info("server closed");
    process.exit();
  });

  setTimeout(() => process.exit(1), 10000).unref(); // Force shutdown after 10s
};

process.on("SIGINT", onCloseSignal);
process.on("SIGTERM", onCloseSignal);
