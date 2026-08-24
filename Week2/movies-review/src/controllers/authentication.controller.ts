import type { Request, Response, NextFunction } from "express";
import { AuthenticationService } from "../services/authentication.service.js";

export class AuthenticationController {
  public static registerController = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const result = await AuthenticationService.register(req.body);
      return res.status(201).json(result);
    } catch (error) {
      next(error);
    }
  };

  public static loginController = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const result = await AuthenticationService.login(req.body);
      return res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  };
}
