export interface JwtPayload {
  status: string;
  data: {
    email: string;
    username: string;
    id: string;
  };
  token: string;
  message: string;
}

export interface createProductTypes {
  details: {
    message: "jwt malformed";
    name: "JsonWebTokenError";
  };
  message: "Unauthorized";
  status: "error" | "success";
}
