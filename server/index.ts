import "dotenv/config";
import express from "express";
import { Request, Response } from "express";
import cors from "cors";
import mongoose from "mongoose";

import { userRouter } from "./routes/user";
import { productRouter } from "./routes/product";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(
  cors({
    origin: ["https://stellar-style.vercel.app"],
    methods: ["POST", "GET"],
    credentials: true,
  })
);

app.use("/user", userRouter);
app.use("/product", productRouter);
app.get("/", (req: Request, res: Response) => {
  res.json("Server is running");
});

mongoose
  .connect(
    "mongodb+srv://aliciapak:Ecommerce-Password-FTC-2023@ecommerce.8yfnjj6.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() =>
    app.listen(PORT, () => console.log(`Server running on port: ${PORT}`))
  )
  .catch((error) => console.log(error.message));

// Use JOI validation
