import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import router from "./src/route/TimeRoute.js";

const MONGO_URI = "mongodb://localhost:27017/helixo";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

const PORT = process.env.PORT || 8000;

mongoose
  .connect(MONGO_URI)
  .then(() => console.log("MongoDB connected to helixo"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.use("/api/timers", router);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
