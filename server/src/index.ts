import "dotenv/config";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";

import { userRouter } from "./routes/user";

const app = express();
const PORT = process.env.PORT || 6000;

app.use(express.json());
app.use(cors());

app.use("/user", userRouter);

mongoose
  .connect(process.env.CONNECTION_URL)
  .then(() =>
    app.listen(PORT, () => console.log(`Server running on port: ${PORT}`))
  )
  .catch((error) => console.log(error.message));

//app.listen(6000, () => console.log("SERVER STARTED"));
