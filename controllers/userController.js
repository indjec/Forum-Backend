import bcrypt from "bcryptjs";
import { pool } from "../config/db.js";
import generateToken from "../utils/generateToken.js";

const registerUser = (req, res) => {
  const { name, email, password } = req.body;
  pool.query(
    "SELECT username FROM users WHERE username=?",
    [email],
    (err, row) => {
      if (err) throw err;
      if (row[0]) {
        res.json({ data: "User already exists" });
      } else {
        bcrypt.hash(password, 10, (err, hash) => {
          pool.query(
            "INSERT INTO users (name, username, password) VALUES (?, ?, ?)",
            [name, email, hash],
            (err, row) => {
              if (err) throw err;
              console.log("Successfully created user");
              res.json({ success: true, token: generateToken(email) });
            }
          );
        });
      }
    }
  );
};

const authUser = (req, res) => {
  const { email, password } = req.body;
  pool.query("SELECT * FROM users WHERE username=?", [email], (err, row) => {
    if (err) throw err;
    res.json({
      success: true,
      username: row[0].username,
      token: generateToken(row[0].username),
    });
  });
};

export { registerUser, authUser };
