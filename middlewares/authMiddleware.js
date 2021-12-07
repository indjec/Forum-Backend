import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findOne({
        where: { id: decoded.id },
        attributes: { exclude: ["password"] },
      });
      next();
    } catch (e) {
      // res.status(401);
      console.log("User not authorized");
      throw new Error("User not authorized");
    }
  }
  if (!token) {
    res.status(401);
    res.json({ message: "User not authorized" });
  }
};

export default protect;
