import { z } from "zod";

export const userRegistrationSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(8),
  jenis_kelamin: z.string(),
});

export const userLoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export const userUpdateSchema = z.object({
  name: z.string(),
  jenis_kelamin: z.string(),
});
