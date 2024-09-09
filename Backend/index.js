import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";
import colors from "colors";
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";
import router from "./routes/routes.js";

const app = express();
dotenv.config();

//Database Connection
connectDB();

// Middleware
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(cookieParser());

//Getting Routes from main Route file
app.use("/api/v1", router);

console.log("testing nodemon");
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Your server is running at the port: ${port}`.bgGreen);
});
