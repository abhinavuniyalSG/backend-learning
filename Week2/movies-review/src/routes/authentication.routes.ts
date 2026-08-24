import express from "express";
import { AuthenticationController } from "../controllers/authentication.controller.js";
import { requestValidator } from "../middleware/requestValidator.middleware.js";
import {
  loginSchema,
  registerSchema,
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
  };
  constructor() {
    this.initialize();
  }
}

export default new AuthenticationRoutes().router;
