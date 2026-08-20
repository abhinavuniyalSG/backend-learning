import z from "zod";

const currentYear = new Date().getFullYear();

export const movieCreationSchema = z.object({
  title: z
    .string({
      error: (issue) =>
        issue.input === undefined
          ? "Title is required"
          : "Title must be a string",
    })
    .trim()
    .min(1, "Title is required")
    .max(100, "Title must not exceed 100 characters"),

  director: z
    .string({
      error: (issue) =>
        issue.input === undefined
          ? "Director is required"
          : "Director must be a string",
    })
    .trim()
    .min(1, "Director is required")
    .max(100, "Director must not exceed 100 characters"),

  genre: z.enum(
    ["Sci-Fi", "Action", "Crime", "Drama", "Thriller", "Animation"],
    { error: "Invalid genre" },
  ),

  release_year: z
    .number({ error: "Release year must be a number" })
    .int("Release year must be an integer")
    .min(1888, "Release year must be 1888 or later")
    .max(currentYear, `Release year cannot be later than ${currentYear}`),
}).strict();

export const idSchema = z.object({
  id: z.uuidv4({
    error: (issue) =>
      issue.input === undefined ? "Id is required" : "Not a Valid id",
  }),
}).strict();

export const movieUpdateSchema = movieCreationSchema
  .partial()
  .strict()
  .refine((data) => Object.keys(data).length > 0, {
    message: "At least one field is required for update",
  });

export const movieQuerySchema = z
  .object({
    id: idSchema.shape.id.optional(),
    title: z.string().trim().min(1, "Title cannot be empty").optional(),
    director: z.string().trim().min(1, "Director cannot be empty").optional(),
    genre: z
      .enum(["Sci-Fi", "Action", "Crime", "Drama", "Thriller", "Animation"], {
        error: "Invalid genre",
      })
      .optional(),
    release_year: z
      .coerce.number({ error: "Release year must be a number" })
      .int("Release year must be an integer")
      .min(1888, "Release year must be 1888 or later")
      .max(currentYear, `Release year cannot be later than ${currentYear}`)
      .optional(),
    year_filter: z.enum(["=", ">", "<", ">=", "<="], {
      error: "Invalid year filter",
    }).optional(),
  })
  .strict();
