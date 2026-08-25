import type { Application } from "express";
import moviesRoute from "./movies.routes.js";
import reviewsRoute from "./reviews.routes.js";
import authenticationRoutes from "./authentication.routes.js";
import { RateLimiterMiddleware } from "../middleware/rateLimiter.middleware.js";
class Routes {
  private limiter = RateLimiterMiddleware.authLimiter;
  public routes(app: Application): void {
    app.use("/api", moviesRoute);
    app.use("/api/auth", this.limiter, authenticationRoutes);
    app.use("/api/movies", reviewsRoute);
  }
}
export default Routes;
