import rateLimit from "express-rate-limit";

export class RateLimiterMiddleware {
  private static globalLimiterConfig = {
    windowMs: 1 * 60 * 1000,
    max: 60,
    standardHeaders: "draft-7" as const,
    legacyHeaders: false,
    message: "Too many requests from this IP, please try again after 1 minutes",
  };
  private static authLimiterConfig = {
    windowMs: 1 * 60 * 1000,
    max: 12,
    standardHeaders: false,
    legacyHeaders: false,
    message:
      "Too many auth requests from this IP, please try again after 1 minutes",
  };
  public static globalLimiter = rateLimit(
    RateLimiterMiddleware.globalLimiterConfig,
  );
  public static authLimiter = rateLimit(
    RateLimiterMiddleware.authLimiterConfig,
  );
}
