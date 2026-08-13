import type { Express, Request, Response } from "express";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";
import { logger } from "./logger.js";

const getSwaggerOptions = (port: number): swaggerJsdoc.Options => ({
  definition: {
    //tell swagger-jsdoc about our API
    openapi: "3.0.0",
    info: {
      title: "My API",
      version: "1.0.0",
      description: "API documentation for my test app",
    },
    servers: [
      //define the servers for our API
      {
        url: `http://localhost:${port}`,
        description: "Development Server",
      },
      // {
      //   url: "https://example.com",
      //   description: "Production Server",
      // },
    ],
    // tags: [
    //   //define tags for our API endpoints
    //   {
    //     name: "server",
    //     description: "Server management endpoints",
    //   },
    //   {
    //     name: "status",
    //     description: "Status check endpoints",
    //   },
    // ],
    components: {
      //define components for our API
      // schemas: {},
      // securitySchemes: {},
    },
  },
  apis: ["./src/*.ts"], // example of where to look for API documentation in your project
});

// const options = {
//   definition: {
//     openapi: "3.0.0",
//     info: {
//       title: "Hello World API",
//       version: "1.0.0",
//       description: "A sample application documenting our API with Swagger",
//       termsOfService: "http://example.com",
//       contact: {
//         name: "API Support",
//         email: "support@example.com",
//         url: "http://example.com",
//       },
//       license: {
//         name: "MIT",
//         url: "https://opensource.org",
//       },
//     },
//     servers: [
//       {
//         url: "http://localhost:3000/api/v1",
//         description: "Development Server",
//       },
//       {
//         url: "https://example.com",
//         description: "Production Server",
//       },
//     ],
//     components: {
//       securitySchemes: {
//         BearerAuth: {
//           type: "http",
//           scheme: "bearer",
//           bearerFormat: "JWT",
//           description: "Enter your JWT token in the format: Bearer <token>",
//         },
//       },
//       schemas: {
//         User: {
//           type: "object",
//           properties: {
//             id: { type: "string", format: "uuid" },
//             name: { type: "string" },
//             email: { type: "string", format: "email" },
//           },
//         },
//         Error: {
//           type: "object",
//           properties: {
//             code: { type: "integer" },
//             message: { type: "string" },
//           },
//         },
//       },
//     },
//     security: [
//       {
//         BearerAuth: [],
//       },
//     ],
//   },
//   apis: ["./src/routes/*.js", "./src/controllers/*.js"],
// };

const swaggerDocs = (app: Express, port: number) => {
  const swaggerSpec = swaggerJsdoc(getSwaggerOptions(port));

  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  app.get("/api-docs.json", (req: Request, res: Response) => {
    res.setHeader("Content-Type", "application/json");
    res.send(swaggerSpec);
  });

  logger.info(`Swagger docs available at http://localhost:${port}/api-docs`);
  logger.info(
    `Swagger JSON available at http://localhost:${port}/api-docs.json`,
  );
};

export { swaggerDocs };
