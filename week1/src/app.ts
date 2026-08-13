import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { httpLoggerMiddleware } from "./middleware/logger.middleware.js";
import { logger } from "./config/logger.js";
import { swaggerDocs } from "./config/swagger.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors());
app.use(express.json());
app.use(httpLoggerMiddleware);

/**
 * @swagger
 * /:
 *   get:
 *     summary: Get the home page
 *     responses:
 *       200:
 *         description: A simple greeting
 */
app.get("/", (req, res) => {
  logger.info("Hello World route accessed");
  res.json({ message: "Hello World!" });
});

/**
 * @swagger
 * /status:
 *   get:
 *     summary: Get the status of the server
 *     responses:
 *       200:
 *         description: Server is running
 */
app.get("/status", (req, res) => {
  logger.info("Status route accessed");
  res.json({ message: "Server is running!" });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  swaggerDocs(app, Number(PORT));
});
