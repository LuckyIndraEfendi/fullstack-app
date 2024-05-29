import { z } from "zod";

const envSchema = z.object({
  MONGODB_URI: z.string(),
  JWT_SECRET_KEY: z.string(),
});

const env = envSchema.parse(process.env);
declare global {
  namespace NodeJS {
    interface ProcessEnv extends z.infer<typeof envSchema> {}
  }
}
export default env;
