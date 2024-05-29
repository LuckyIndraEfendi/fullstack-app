import { lazy } from "react";

const SignIn = lazy(() => import("./SignIn"));
const SignUp = lazy(() => import("./SignUp"));

export { SignIn, SignUp };
