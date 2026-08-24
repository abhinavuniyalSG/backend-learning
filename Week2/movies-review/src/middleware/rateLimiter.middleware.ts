import rateLimit from "express-rate-limit";

export class RateLimiterMiddleware {
  private static config = {
    windowMs: 1 * 60 * 1000,
    max: 6,
    standardHeaders: "draft-7" as const,
    legacyHeaders: false,
    message:
      "Too many requests from this IP, please try again after 15 minutes",
  };
  public static limiter = rateLimit(RateLimiterMiddleware.config);
}
