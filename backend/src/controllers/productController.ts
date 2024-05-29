import { Request, Response } from "express";
import productSchema from "../models/productModel";
import userSchema from "../models/userModel";
import { unlinkSync } from "fs";

export const getAllProduct = async (req: Request, res: Response) => {
  try {
    const product = await productSchema.find();
    res
      .status(200)
      .json({ status: "success", message: "Get Product", data: product });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

export const addProduct = async (req: Request, res: Response) => {
  try {
    const {
      productName,
      productPrice,
      productDescription,
      productCategory,
      productCountInStock,
    } = req.body;
    const userId = req?.token?.id;
    const findUser = await userSchema.findById(userId);
    if (!findUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    const product = await productSchema.create({
      productName,
      productPrice: parseInt(productPrice),
      productDescription,
      productCategory,
      productCountInStock: parseInt(productCountInStock),
      productImage: req?.file?.path,
      user: userId,
    });
    findUser.products.push(product._id);
    await findUser.save();
    res.status(201).json({ status: "success", data: product });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

export const getProductById = async (req: Request, res: Response) => {
  try {
    const user = req?.token;
    const { id } = req?.params;
    const findProduct = await productSchema.findById(id);
    res.status(200).json({ status: "success", data: findProduct });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

export const editProduct = async (req: Request, res: Response) => {
  try {
    const {
      productName,
      productPrice,
      productDescription,
      productCategory,
      productCountInStock,
    } = req.body;
    const { id } = req?.params;
    const findProduct = await productSchema.findById(id);
    if (!findProduct) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }
    const product = await productSchema.findOneAndUpdate(
      {
        _id: id,
      },
      {
        productName,
        productPrice: parseInt(productPrice),
        productDescription,
        productCategory,
        productCountInStock: parseInt(productCountInStock),
        productImage: req?.file?.path,
      },
      { new: true }
    );
    res.status(200).json({ status: "success", data: product });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const product = await productSchema.findOneAndDelete({
      _id: req?.params?.id,
    });
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }
    unlinkSync(product.productImage);
    res.status(200).json({ status: "success", data: product });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};
