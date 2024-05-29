import { NextFunction, Request, Response } from "express";
import { CustomJwtPayload } from "../../jwt";
import jwt from "jsonwebtoken";
const verifyCookieToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req?.cookies?.token;
    if (!token) {
      throw new Error("No token provided from server");
    }
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET_KEY as string
    ) as CustomJwtPayload & { id: string };
    req.token = decoded;
    next();
  } catch (err: any) {
    res.status(401).json({ message: err.message });
  }
};

export default verifyCookieToken;
