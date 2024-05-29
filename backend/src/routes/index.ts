import { signIn, signOut, signUp } from "../controllers/authController";
import { Router } from "express";
import {
  addProduct,
  deleteProduct,
  editProduct,
  getAllProduct,
  getProductById,
} from "../controllers/productController";
import { upload } from "../lib/storage";
import { uploadErrorHandler } from "../middleware/uploadLimiter";
import { validateData } from "../middleware/validationMiddleware";
import {
  userLoginSchema,
  userRegistrationSchema,
  userUpdateSchema,
} from "../dto/userSchema";
import { verifyToken } from "../middleware/verifyToken";
import { addProductSchema, updateProductSchema } from "../dto/productSchema";
import {
  getProductWithSpesificUser,
  getStatusUser,
  updateUser,
} from "../controllers/userController";
import verifyCookieToken from "../middleware/verifyCookie";
const router = Router();

// Auth Route
router.post("/auth/signin", validateData(userLoginSchema), signIn);
router.post("/auth/signup", validateData(userRegistrationSchema), signUp);
router.delete("/auth/signout", verifyToken, verifyCookieToken, signOut);

// User Route
router.get("/users/status", verifyToken, verifyCookieToken, getStatusUser);
router.get(
  "/users/products",
  verifyToken,
  verifyCookieToken,
  getProductWithSpesificUser
);
router.put(
  "/users/update",
  verifyToken,
  verifyCookieToken,
  validateData(userUpdateSchema),
  updateUser
);

// Product Route
router.get("/product", verifyToken, verifyCookieToken, getAllProduct);
router.get("/product/:id", verifyToken, verifyCookieToken, getProductById);
router.post(
  "/product",
  verifyToken,
  upload.single("productImage"),
  validateData(addProductSchema),
  addProduct,
  uploadErrorHandler
);
router.put(
  "/product/:id",
  verifyToken,
  upload.single("productImage"),
  validateData(updateProductSchema),
  editProduct,
  uploadErrorHandler
);
router.delete("/product/:id", verifyToken, deleteProduct);

export default router;
