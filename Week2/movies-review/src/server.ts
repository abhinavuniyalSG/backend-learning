import { PORT } from "./config/secrets.js";
import app from "./app.js";
import { logger } from "./core/logger.js";

app.listen(PORT, () => {
  logger.info(`Server is live on port: ${PORT}`);
});
