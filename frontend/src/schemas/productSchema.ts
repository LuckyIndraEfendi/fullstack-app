import { z } from "zod";
export const addProductShema = z.object({
  productName: z
    .string({
      message: "Title is Required",
    })
    .min(2, {
      message: "Title must be at least 2 characters.",
    }),
  productDescription: z
    .string({
      message: "Description is Required",
    })
    .min(25, {
      message: " Description must be at least 25 characters.",
    }),
  productPrice: z
    .custom<number>()
    .refine((value) => value ?? false, "Price is Required")
    .refine((value) => Number.isFinite(Number(value)), "Invalid number")
    .transform((value) => Number(value)),
  productCategory: z.string({
    message: "Category is Required",
  }),
  productCountInStock: z
    .custom<number>()
    .refine((value) => value ?? false, "Stock is Required")
    .refine((value) => Number.isFinite(Number(value)), "Invalid number")
    .transform((value) => Number(value)),
  productImage: z.instanceof(FileList).optional(),
});
