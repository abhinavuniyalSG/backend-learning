import type { Application } from "express";
import moviesRoute from "./movies.routes.js";
import reviewsRoute from "./reviews.routes.js";
import authenticationRoutes from "./authentication.routes.js";
class Routes {
  public routes(app: Application): void {
    app.use("/api", moviesRoute);
    app.use("/api/auth", authenticationRoutes);
    app.use("/api/movies", reviewsRoute);
  }
}
export default Routes;
