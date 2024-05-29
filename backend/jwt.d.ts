import { JwtPayload } from "jsonwebtoken";

export interface CustomJwtPayload extends JwtPayload {
  id: string;
}

declare global {
  namespace Express {
    interface Request {
      token?: CustomJwtPayload;
      cookies?: CustomJwtPayload;
    }
  }
}
