import "dotenv/config";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";

const app = express();

app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 6000;

mongoose
  .connect(process.env.CONNECTION_URL)
  .then(() =>
    app.listen(PORT, () => console.log(`Server running on port: ${PORT}`))
  )
  .catch((error) => console.log(error.message));

//app.listen(6000, () => console.log("SERVER STARTED"));
