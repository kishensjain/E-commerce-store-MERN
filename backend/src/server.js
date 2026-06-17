// packages
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser"

// routes/config
import connectDB from "./config/db.js";
import authRoutes from "./routes/auth.routes.js"

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5002;

connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/api/auth', authRoutes)

app.get("/", (_, res) => {
  res.send("API is running");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
