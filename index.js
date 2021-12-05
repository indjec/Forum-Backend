import express from "express";
import { connectDB } from "./config/db.js";
import forumRoutes from "./routes/forumRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());
connectDB();

app.use("/api/forums", forumRoutes);
app.use("/api/users", userRoutes);

// app.get("/", (req, res) => {
//   //   connection.query("SELECT * from forums", (err, rows) => {
//   //     if (err) throw err;
//   //     console.log("The data from users table are: \n", rows);
//   //     connection.end();
//   //     res.json(rows);
//   //   });
//   res.send("Hello");
// });

app.listen(3000, () => {
  console.log("Server is running at port 3000");
});
