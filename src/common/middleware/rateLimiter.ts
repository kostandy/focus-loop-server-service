import type { Request } from "express";
import { rateLimit } from "express-rate-limit";

import { env } from "@/common/utils/envConfig.js";

const rateLimiter = rateLimit({
  legacyHeaders: true,
  limit: env.COMMON_RATE_LIMIT_MAX_REQUESTS,
  message: "Too many requests, please try again later.",
  standardHeaders: true,
  windowMs: 15 * 60 * env.COMMON_RATE_LIMIT_WINDOW_MS,
  skip: (req: Request) => {
    const userAgent = req.headers["user-agent"] || "";
    return userAgent.includes("Health-Checker");
  },
  keyGenerator: (req: Request) => {
    return `${req.ip}-${req.headers["user-agent"]}` as string;
  },
});

export default rateLimiter;
