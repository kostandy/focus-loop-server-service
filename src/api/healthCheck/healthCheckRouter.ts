import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import express, { type Request, type Response, type Router, type RequestHandler } from "express";
import { z } from "zod";

import { createApiResponse } from "@/api-docs/openAPIResponseBuilders.js";
import { ServiceResponse } from "@/common/models/serviceResponse.js";
import { handleServiceResponse } from "@/common/utils/httpHandlers.js";

export const healthCheckRegistry = new OpenAPIRegistry();
export const healthCheckRouter: Router = express.Router();

healthCheckRegistry.registerPath({
  method: "get",
  path: "/health-check",
  tags: ["Health Check"],
  responses: createApiResponse(z.null(), "Success"),
});

const requestHandler: RequestHandler = (_req: Request, res: Response): void => {
  const serviceResponse = ServiceResponse.success("Service is healthy", null);
  handleServiceResponse(serviceResponse, res);
};

healthCheckRouter.get("/", requestHandler);
