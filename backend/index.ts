import express, { Express, Request, Response } from "express";
import "dotenv/config";
import morgan from "morgan";
import route from "./src/routes";
import connectDB from "./src/database/dbConfig";
import cors from "cors";
import cookieParser from "cookie-parser";
import limiter from "./src/lib/ratelimit";
import { specs, swaggerUi } from "./src/swaggerConfig";
const app: Express = express();
const PORT = process.env.PORT || 8080;
connectDB();

app.use(cookieParser());
app.use(limiter);

app.use(morgan("combined"));
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "Origin",
      "X-Requested-With",
      "Access-Control-Allow-Headers",
      "Access-Control-Allow-Origin",
      "Access-Control-Allow-Methods",
      "Access-Control-Allow-Credentials",
      "Access-Control-Allow-Methods",
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);
app.use("/images", express.static("images"));
app.use(express.json());
app.use("/api", route);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});
app.listen(PORT, () => {
  console.log(`Server app listening on port ${PORT}!`);
});
