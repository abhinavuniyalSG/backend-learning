import z from "zod";

export const moviesSchema = z.object({
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
    .max(
      new Date().getFullYear(),
      `Release year cannot be later than ${new Date().getFullYear()}`,
    ),
});
