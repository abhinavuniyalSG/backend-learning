import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { httpLoggerMiddleware } from "./middleware/logger.middleware.js";
import { logger } from "./config/logger.js";
import { swaggerDocs } from "./config/swagger.js";
import jwt from "jsonwebtoken";

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

app.listen(PORT, async () => {
  const secret = "12345";
  let payload = { message: "Server is running!" };
  const token = jwt.sign(payload, secret, { expiresIn: "1h" });
  console.log(`JWT Token: ${token}`);
  const decodedByverify = jwt.verify(token, secret);
  console.log(
    `Decoded Token with verification: ${JSON.stringify(decodedByverify)}`,
  );
  const decodedByDecode = jwt.decode(token);
  console.log(
    `Decoded Token (without verification): ${JSON.stringify(decodedByDecode)}`,
  );
  console.log(`Server is running on http://localhost:${PORT}`);
  swaggerDocs(app, Number(PORT));
});
