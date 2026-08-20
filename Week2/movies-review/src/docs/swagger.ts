import type { Application } from "express";
import { resolve } from "node:path";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const swaggerSpec = swaggerJSDoc({
  definition: {
    openapi: "3.0.3",
    info: {
      title: "Movies Review API",
      version: "1.0.0",
      description: "API for movie review.",
    },
    servers: [{ url: "/api", description: "Current server" }],
    tags: [{ name: "Movies", description: "Movie catalogue operations" }],
  },
  apis: [resolve(process.cwd(), "swaggerDocs/**/*.yaml")],
});

export const registerSwagger = (app: Application): void => {
  app.get("/api/docs.json", (_req, res) => res.json(swaggerSpec));
  app.use(
    "/api/docs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerSpec, { explorer: true }),
  );
};
