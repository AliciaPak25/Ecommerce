import "dotenv/config";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";

import { userRouter } from "./routes/user";
import { productRouter } from "./routes/product";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(
  cors({
    origin: ["https://stellar-style-api.vercel.app"],
    methods: ["POST", "GET", "PATCH", "DELETE"],
    credentials: true,
  })
);

app.use("/user", userRouter);
app.use("/product", productRouter);
app.get("/", (req: express.Request, res: express.Response) => {
  res.json("Hello");
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
