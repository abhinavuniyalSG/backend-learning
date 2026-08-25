import express from "express";
import { AuthenticationController } from "../controllers/authentication.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { requestValidator } from "../middleware/requestValidator.middleware.js";
import {
  loginSchema,
  registerSchema,
  refreshTokenSchema,
} from "../validator/authentication.validator.js";
class AuthenticationRoutes {
  public router = express.Router();
  public validator = requestValidator.validate;
  private initialize = () => {
    this.router.post(
      "/register",
      this.validator("body", registerSchema),
      AuthenticationController.registerController,
    );
    this.router.post(
      "/login",
      this.validator("body", loginSchema),
      AuthenticationController.loginController,
    );
    this.router.post(
      "/refresh",
      this.validator("body", refreshTokenSchema),
      AuthenticationController.refreshController,
    );
    this.router.post(
      "/logout",
      authMiddleware,
      AuthenticationController.logoutController,
    );
  };
  constructor() {
    this.initialize();
  }
}

export default new AuthenticationRoutes().router;
