import dotenv from "dotenv";
dotenv.config();
import Category from "./models/category.model.js";
import connectDB from "./config/db.js";

await connectDB();

const category = await Category.create({
  name: "Test",
});

console.log(category);
process.exit();
