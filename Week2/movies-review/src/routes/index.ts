import type { Application } from "express";
import moviesRoute from "./movies.routes.js";
class routes {
  public routes(app: Application): void {
    app.use("/api", moviesRoute);
  }
}
export default routes;
