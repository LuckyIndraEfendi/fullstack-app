import { lazy } from "react";

const Homepage = lazy(() => import("./Homepage"));
const AddProduct = lazy(() => import("./product/AddProduct"));
const EditProduct = lazy(() => import("./product/EditProduct"));

export { Homepage, AddProduct, EditProduct };
