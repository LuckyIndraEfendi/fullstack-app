import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { CustomJwtPayload } from "../../jwt";

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");
    if (!token) {
      throw new Error("No token provided");
    }
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET_KEY as string
    ) as CustomJwtPayload & { id: string };
    req.token = decoded;
    next();
  } catch (err) {
    res.status(401).json({
      status: "error",
      message: "Unauthorized",
      details: err,
    });
  }
};
