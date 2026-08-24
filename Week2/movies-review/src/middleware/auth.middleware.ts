import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { JWT_VARIABLES } from "../config/secrets.js";
import { MoviesRepository } from "../database/repository/movies.repository.js";
import { ReviewsRepository } from "../database/repository/reviews.repository.js";
import { HttpError } from "../utils/httpError.utils.js";

interface TokenPayload {
  id: string;
  mail: string;
  role: string;
}

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new HttpError(401, "Unauthorized");
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
      throw new HttpError(401, "Unauthorized");
    }

    const decoded = jwt.verify(
      token,
      JWT_VARIABLES.JWT_SECRET,
    ) as unknown as TokenPayload;

    if (!decoded?.id || !decoded?.mail || !decoded?.role) {
      throw new HttpError(401, "Invalid token payload");
    }

    req.user = decoded;
    next();
  } catch (error) {
    next(
      error instanceof HttpError ? error : new HttpError(401, "Invalid token"),
    );
  }
};
