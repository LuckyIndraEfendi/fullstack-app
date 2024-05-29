import AuthLayout from "@/layouts/AuthLayout";
import RootLayout from "@/layouts/RootLayout";
import NotFound from "@/pages/NotFound";
import { SignIn, SignUp } from "@/pages/auth";
import { AddProduct, EditProduct, Homepage } from "@/pages/dashboard";
import { Profile } from "@/pages/protected";
import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <Homepage />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/product/add",
        element: <AddProduct />,
      },
      {
        path: "/edit/product/:id",
        element: <EditProduct />,
      },
    ],
  },
  {
    element: <AuthLayout />,
    errorElement: <NotFound />,
    children: [
      {
        path: "/auth/login",
        element: <SignIn />,
      },
      {
        path: "/auth/register",
        element: <SignUp />,
      },
    ],
  },
]);
