import type { NextFunction, Request, Response } from "express";
import { z } from "zod";
import { logger } from "../core/logger.js";
type validateType = "body" | "parmas" | "query";

export class requestValidator {
  public static validate = (type: validateType, schema: z.ZodObject) => {
    return (req: Request, res: Response, next: NextFunction) => {
      const result = schema.safeParse(req.body);
      if (!result.success) {
        return res
          .status(400)
          .json(result.error.issues.map((issues) => issues.message));
      }
      logger.info("Input validated ");
      next();
    };
  };
}
