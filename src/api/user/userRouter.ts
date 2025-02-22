import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import express, { type RequestHandler, type Router } from "express";
import { z } from "zod";

import { createApiResponse } from "@/api-docs/openAPIResponseBuilders.js";
import { GetUserSchema, UserSchema } from "@/api/user/userValidation.js";
import { validateRequest } from "@/common/utils/httpHandlers.js";
import { userController } from "./userController.js";

export const userRegistry = new OpenAPIRegistry();
export const userRouter: Router = express.Router();

userRegistry.register("User", UserSchema);

userRegistry.registerPath({
  method: "get",
  path: "/users",
  tags: ["User"],
  responses: createApiResponse(z.array(UserSchema), "Success"),
});

userRouter.get("/", userController.getUsers);

userRegistry.registerPath({
  method: "get",
  path: "/users/{id}",
  tags: ["User"],
  responses: createApiResponse(UserSchema, "Success"),
});

userRouter.get("/:id", validateRequest(GetUserSchema) as RequestHandler, userController.getUser);
