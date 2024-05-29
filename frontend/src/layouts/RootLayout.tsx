import useAuth from "@/hooks/useAuth";
import { Suspense } from "react";
import { Navigate, Outlet } from "react-router-dom";
const RootLayout = () => {
  const { isAuthenticated } = useAuth();
  return (
    <>
      {isAuthenticated ? (
        <Suspense fallback={<>Loading Data...</>}>
          <Outlet />
        </Suspense>
      ) : (
        <Navigate to={"/auth/login"} />
      )}
    </>
  );
};

export default RootLayout;
