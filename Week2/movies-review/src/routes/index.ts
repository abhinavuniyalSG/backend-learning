import type { Application } from "express";
import moviesRoute from "./movies.routes.js";
import reviewsRoute from "./reviews.routes.js";
class routes {
  public routes(app: Application): void {
    app.use("/api", moviesRoute);
    app.use("/api/movies", reviewsRoute);
  }
}
export default routes;
