import type { Request, RequestHandler, Response } from "express";

import { userService } from "@/api/user/userService.js";
import { handleServiceResponse } from "@/common/utils/httpHandlers.js";

class UserController {
  public getUsers: RequestHandler = async (_req: Request, res: Response): Promise<void> => {
    const serviceResponse = await userService.findAll();
    handleServiceResponse(serviceResponse, res);
    return;
  };

  public getUser: RequestHandler = async (req: Request, res: Response): Promise<void> => {
    const id = req.params.id as string;
    const wallet = req.params.wallet as string;
    const serviceResponse = id ? await userService.findById(id) : await userService.findByWallet(wallet);
    console.log("serviceResponse", serviceResponse);

    handleServiceResponse(serviceResponse, res);
    return;
  };
}

export const userController = new UserController();
