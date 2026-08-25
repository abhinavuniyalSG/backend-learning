import z from "zod";

export const registerSchema = z
  .object({
    name: z
      .string({
        error: (issue) =>
          issue.input === undefined
            ? "Name is required"
            : "Name must be a string",
      })
      .trim()
      .min(1, "Name is required")
      .max(100, "Name must not exceed 100 characters"),

    mail: z
      .string({
        error: (issue) =>
          issue.input === undefined
            ? "Email is required"
            : "Email must be a string",
      })
      .trim()
      .email("Invalid email address")
      .min(1, "Email is required")
      .max(255, "Email must not exceed 255 characters")
      .toLowerCase(),

    password: z
      .string({
        error: (issue) =>
          issue.input === undefined
            ? "Password is required"
            : "Password must be a string",
      })
      .min(8, "Password must be at least 8 characters long")
      .max(255, "Password must not exceed 255 characters"),
  })
  .strict();

export const loginSchema = z
  .object({
    mail: z
      .string({
        error: (issue) =>
          issue.input === undefined
            ? "Email is required"
            : "Email must be a string",
      })
      .trim()
      .email("Invalid email address")
      .min(1, "Email is required")
      .max(255, "Email must not exceed 255 characters")
      .toLowerCase(),

    password: z
      .string({
        error: (issue) =>
          issue.input === undefined
            ? "Password is required"
            : "Password must be a string",
      })
      .min(1, "Password is required")
      .max(255, "Password must not exceed 255 characters"),
  })
  .strict();

export const refreshTokenSchema = z
  .object({
    refreshToken: z
      .string({
        error: (issue) =>
          issue.input === undefined
            ? "Refresh token is required"
            : "Refresh token must be a string",
      })
      .min(1, "Refresh token is required"),
  })
  .strict();
