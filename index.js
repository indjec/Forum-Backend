import express from "express";

import sequelize from "./config/db.js";

// import { connectDB } from "./config/db.js";
import forumRoutes from "./routes/forumRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import dotenv from "dotenv";

const app = express();
app.use(express.json());

try {
  await sequelize.sync();
  console.log("Connected to databse");
} catch (err) {
  console.error("Unable to connect to the database:", err);
}

dotenv.config();

// connectDB();

app.use("/api/forums", forumRoutes);
app.use("/api/users", userRoutes);

app.listen(3000, () => {
  console.log("Server is running at port 3000");
});
