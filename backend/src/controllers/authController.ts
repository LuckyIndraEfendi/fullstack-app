import { Request, Response } from "express";
import { AES, enc } from "crypto-js";
import jwt from "jsonwebtoken";
import userSchema from "../models/userModel";
export const signIn = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await userSchema.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User is not registered" });
    }
    const isPasswordValid = AES.decrypt(
      user.password,
      process.env.JWT_SECRET_KEY as string
    ).toString(enc.Utf8);
    if (isPasswordValid !== password) {
      return res.status(400).json({ message: "Invalid email or password" });
    }
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET_KEY as string,
      {
        expiresIn: "1d",
      }
    );
    res.cookie("token", token, { httpOnly: true });
    res.status(200).json({
      status: "success",
      data: {
        id: user.id,
        email: user.email,
        username: user.name,
      },
      token,
    });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

export const signUp = async (req: Request, res: Response) => {
  try {
    const { name, email, password, jenis_kelamin } = req.body;
    const hashedPassword = AES.encrypt(
      password,
      process.env.JWT_SECRET_KEY as string
    ).toString();
    const finduserIfExits = await userSchema.findOne({ email });
    if (finduserIfExits) {
      return res.status(400).json({ message: "User already exists" });
    }
    const user = await userSchema.create({
      name,
      email,
      password: hashedPassword,
      gender: jenis_kelamin,
    });
    res.status(201).json({
      status: "success",
      data: user,
    });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

export const signOut = async (req: Request, res: Response) => {
  try {
    res.clearCookie("token");
    res.status(200).json({ status: "success", message: "Signout success" });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};
