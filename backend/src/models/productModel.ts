import { model, Schema } from "mongoose";

const productSchema = new Schema(
  {
    productName: {
      type: String,
      required: true,
    },
    productPrice: {
      type: Number,
      required: true,
    },
    productDescription: {
      type: String,
      required: true,
    },
    productImage: {
      type: String,
      required: true,
    },
    productCategory: {
      type: String,
      required: true,
    },
    productCountInStock: {
      type: Number,
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const product = model("Product", productSchema);
export default product;
