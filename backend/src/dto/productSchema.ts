import { z } from "zod";

export const addProductSchema = z.object({
  productName: z.string().min(5),
  productPrice: z.string(),
  productDescription: z.string().min(25),
  productCategory: z.string(),
  productCountInStock: z.string(),
});

export const updateProductSchema = z.object({
  productName: z.string().min(5),
  productPrice: z.string(),
  productDescription: z.string().min(25),
  productCategory: z.string(),
  productCountInStock: z.string(),
});
