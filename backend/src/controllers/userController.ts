import { Request, Response } from "express";
import userSchema from "../models/userModel";

export const getStatusUser = async (req: Request, res: Response) => {
  try {
    const userId = req?.token?.id;
    const users = await userSchema
      .findById({
        _id: userId,
      })
      .populate("products");
    res.status(200).json({ status: "success", data: users });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

export const getProductWithSpesificUser = async (
  req: Request,
  res: Response
) => {
  try {
    const userId = req?.token?.id;
    const users = await userSchema
      .findById({
        _id: userId,
      })
      .select("products")
      .populate("products");
    if (users?.products.length === 0) {
      return res.status(404).json({ status: "success", data: [] });
    }
    res.status(200).json({ status: "success", data: users });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  const { name, jenis_kelamin } = req.body;
  try {
    const id = req?.token?.id;
    const user = await userSchema.findByIdAndUpdate(
      id,
      {
        name,
        gender: jenis_kelamin,
      },
      {
        new: true,
      }
    );

    res.status(200).json({ status: "success", data: user });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};
