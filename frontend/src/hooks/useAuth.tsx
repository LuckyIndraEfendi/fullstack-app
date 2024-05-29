import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

export type UserData = {
  id: string;
  email: string;
  username: string;
};

export type AuthData = {
  status: string;
  data: UserData;
  token: string;
};

const useAuth = () => {
  const [authData, setAuthData] = useState<AuthData | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedData = localStorage.getItem("token");
    if (storedData) {
      try {
        const parsedData: AuthData = JSON.parse(storedData);
        const decodedToken: { exp: number } = jwtDecode(parsedData.token);

        if (decodedToken.exp * 1000 < Date.now()) {
          return navigate("/auth/login");
        }

        setAuthData(parsedData);
        setIsAuthenticated(true);

        if (window.location.pathname === "/auth/login") {
          navigate("/");
        }
      } catch (error) {
        localStorage.removeItem("token");
        setAuthData(null);
        setIsAuthenticated(false);
        navigate("/auth/login");
      }
    } else {
      setAuthData(null);
      setIsAuthenticated(false);
      navigate("/auth/login");
    }
  }, [navigate]);

  return { authData, isAuthenticated };
};

export default useAuth;
