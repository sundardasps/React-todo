import cors from "cors"; 
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import userRoutes from "./routes/userRoutes.js";
import erroHandler from "./middleWares/errorHandler.js";
const app = express();
app.use(express.json())

dotenv.config();
mongoose.connect(process.env.MONGO_SERVER);
const options = {
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  origin: "http://localhost:5173",
};
app.use(cors(options));

app.use("/",userRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server started at ${process.env.PORT}`);
});


app.use(erroHandler)