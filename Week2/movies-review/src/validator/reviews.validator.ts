import z from "zod";

export const reviewCreationSchema = z
  .object({
    rating: z
      .number({ error: "Rating must be a number" })
      .int("Rating must be an integer")
      .min(1, "Rating must be at least 1")
      .max(5, "Rating must not exceed 5"),
    comment: z
      .string({ error: "Comment must be a string" })
      .trim()
      .min(1, "Comment is required")
      .max(1000, "Comment must not exceed 1000 characters"),
  })
  .strict();

export const movieIdSchema = z
  .object({
    movieId: z.uuidv4({
      error: (issue) =>
        issue.input === undefined ? "Id is required" : "Not a Valid id",
    }),
  })
  .strict();

export const reviewQuerySchema = z
  .object({
    rating: z.coerce
      .number({ error: "Rating must be a number" })
      .int("Rating must be an integer")
      .min(1, "Rating must be at least 1")
      .max(5, "Rating must not exceed 5")
      .optional(),
    rating_filter: z
      .enum(["=", ">", "<", ">=", "<="], {
        error: "Invalid rating filter",
      })
      .optional(),
  })
  .strict();

export const reviewIdmovieIdSchema = z
  .object({
    movieId: z.uuidv4({
      error: (issue) =>
        issue.input === undefined ? "Movie Id is required" : "Not a Valid id",
    }),
    reviewId: z.uuidv4({
      error: (issue) =>
        issue.input === undefined ? "Review Id is required" : "Not a Valid id",
    }),
  })
  .strict();

export const reviewUpdateSchema = z
  .object({
    rating: z
      .number({ error: "Rating must be a number" })
      .int("Rating must be an integer")
      .min(1, "Rating must be at least 1")
      .max(5, "Rating must not exceed 5")
      .optional(),
    comment: z
      .string({ error: "Comment must be a string" })
      .trim()
      .min(1, "Comment is required")
      .max(1000, "Comment must not exceed 1000 characters")
      .optional(),
  })
  .strict()
  .refine((data) => Object.keys(data).length > 0, {
    message: "At least one review field is required for update",
  });
