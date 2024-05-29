import { z } from "zod";

export const addUserSchema = z.object({
  name: z
    .string({
      message: "Name is Required",
    })
    .min(5, {
      message: "Username must be at least 5 characters.",
    }),
  email: z
    .string({
      message: "Email is Required",
    })
    .email({
      message: "Email must be a valid email.",
    })
    .min(2, {
      message: "Email must be at least 2 characters.",
    }),
  password: z
    .string({
      message: "Password is Required",
    })
    .min(8, { message: "Password must be at least 8 characters." }),
  jenis_kelamin: z.string(),
});

export const userSignInSchema = z.object({
  email: z
    .string({
      message: "Email is Required",
    })
    .email({
      message: "Email must be a valid email.",
    })
    .min(2, {
      message: "Email must be at least 2 characters.",
    }),
  password: z
    .string({
      message: "Password is Required",
    })
    .min(8, { message: "Password must be at least 8 characters." }),
});

export const userUpdateSchema = z.object({
  name: z
    .string({
      message: "Name is Required",
    })
    .min(5, {
      message: "Username must be at least 5 characters.",
    }),
  jenis_kelamin: z.string(),
});
