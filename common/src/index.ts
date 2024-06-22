import { z } from "zod";

export const authInput = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  name: z.string().optional(),
});

// export const signInInput = z.object({
//   email: z.string().email(),
//   password: z.string().min(6),
// });

export const createBlogInput = z.object({
  title: z.string().min(3),
  content: z.string(),
});

export const updateBlogInput = z.object({
  title: z.string(),
  content: z.string(),
  id: z.number(),
});

// ^ type inference
export type AuthInput = z.infer<typeof authInput>;
// export type SignInInput = z.infer<typeof signInInput>;
export type CreateBlogInput = z.infer<typeof createBlogInput>;
export type UpdateBlogInput = z.infer<typeof updateBlogInput>;
